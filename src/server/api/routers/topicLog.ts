import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { answersIntoString } from "~/utils/topicLog/answers";
import OpenAI from "openai";

export const topicLogRouter = createTRPCRouter({
  createTopicLog: protectedProcedure
    .input(
      z.object({
        topicId: z.string(),
        answers: z.array(z.boolean().nullable()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { answers, topicId } = input;
      const userId = ctx.session.id;
      const answerCode = answersIntoString(answers);

      const currentAnalysis = await ctx.prisma.analysis.findFirst({
        where: {
          answerCode,
          topicId,
        },
      });
      if (currentAnalysis) {
        const topicLog = await ctx.prisma.topicLog.create({
          data: {
            topicId,
            userId,
            analysisId: currentAnalysis.id,
            logAnswers: answerCode,
          },
        });
        return topicLog;
      } else {
        const topic = await ctx.prisma.topic.findFirst({
          where: {
            id: topicId,
          },
        });
        if (!topic) throw new Error("Topic not found!");

        const questions = await ctx.prisma.question.findMany({
          where: {
            topicId,
          },
          orderBy: {
            order: "asc",
          },
        });

        const mappedQuestionAndAnswer = questions.map((q, index) => {
          const answer = answers[index];
          const answerText =
            answer === true
              ? "Ya"
              : answer === false
              ? "Tidak"
              : "Tidak dijawab";
          return `${q.order}. ${q.question} ${answerText}.`;
        });

        const userContent =
          "Kamu adalah psikolog yang berbicara santai dengan menggunakan aku/kamu. " +
          "Analisis jawaban berikut dan simpulkan dalam satu paragraf untuk pertanyaan: '" +
          topic?.title +
          "'. Letakkan kesimpulan utama di kalimat pertama, sertakan persentase ketegasan. Jawaban: " +
          mappedQuestionAndAnswer;

        try {
          const client = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
          });
          const chatCompletion = await client.chat.completions.create({
            messages: [{ role: "user", content: userContent }],
            model: "gpt-4o-mini",
          });

          const feedback = chatCompletion.choices?.[0]?.message.content;
          if (!feedback) throw new Error("Feedback cannot be empty!");
          const createAnalysis = await ctx.prisma.analysis.create({
            data: {
              answerCode,
              feedback,
              topicId,
            },
          });
          const topicLog = await ctx.prisma.topicLog.create({
            data: {
              topicId,
              userId,
              analysisId: createAnalysis.id,
              logAnswers: answerCode,
            },
          });
          return topicLog;
        } catch (error) {
          if (error instanceof OpenAI.APIError) {
            if (
              error.status === 402 &&
              error.error?.code === "insufficient_quota"
            ) {
              console.error("OpenAI API quota exceeded:", error);
              throw new Error(
                "OpenAI API quota exceeded. Please check your billing."
              );
            } else if (
              error.status === 401 &&
              error.error?.code === "invalid_api_key"
            ) {
              console.error("Invalid OpenAI API Key:", error);
              throw new Error("Invalid OpenAI API key provided.");
            } else {
              console.error("Unexpected Error calling OpenAI:", error);
              throw new Error("Failed to generate feedback from OpenAI.");
            }
          }
          console.error("Unexpected Error:", error);
          throw new Error("An unexpected error occurred.");
        }
      }
    }),

  topicLogByLogId: protectedProcedure
    .input(
      z.object({
        logId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { logId } = input;
      const topicLog = await ctx.prisma.topicLog.findFirst({
        where: {
          id: logId,
        },
        include: {
          topic: true,
          analysis: true,
        },
      });
      return topicLog;
    }),

  countUserTopicLogs: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.id;
    const count = await ctx.prisma.topicLog.count({
      where: {
        userId,
      },
    });
    return count;
  }),
  userTopicLogs: protectedProcedure
    .input(
      z.object({
        limit: z.number().optional().default(5),
        page: z.number().optional().default(0),
      })
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.id;
      const topicLogs = await ctx.prisma.topicLog.findMany({
        where: {
          userId,
        },
        take: input.limit,
        skip: input.page * input.limit,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          topic: true,
          analysis: true,
        },
      });
      return topicLogs;
    }),
});
