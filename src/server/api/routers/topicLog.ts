import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { answersIntoString } from "~/utils/topicLog/answers";
import callChatGPT from "../utils/openai/callFunction";

export const topicLogRouter = createTRPCRouter({
  createTopicLog: protectedProcedure
    .input(
      z.object({
        topicId: z.string(),
        answers: z.array(z.number().nullable()),
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
            answer !== null && answer !== undefined
              ? q.options[answer]
              : "Tidak dijawab";
          return `${q.order}. ${q.question} ${answerText}.`;
        });

        const chat =
          "Kamu adalah psikolog yang berbicara santai dengan menggunakan aku/kamu. " +
          "Analisis jawaban berikut, jelaskan karakterku condong apa ketimbang apa, dan simpulkan dalam satu paragraf untuk pertanyaan: '" +
          topic?.title +
          "'. Letakkan kesimpulan utama di kalimat pertama. Jawaban: " +
          mappedQuestionAndAnswer;

        const feedback = await callChatGPT({ chat });

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
