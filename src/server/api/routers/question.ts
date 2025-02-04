import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const questionRouter = createTRPCRouter({
  questionsByTopicSlug: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const topic = await ctx.prisma.topic.findFirst({
        where: {
          slug: input.slug
        },
      });
      if (!topic) throw new Error("topic doesn't exist.");

      return await ctx.prisma.question.findMany({
        where: {
          topicId: topic.id
        },
        orderBy: {
          order: "asc"
        }
      })
    }),
});
