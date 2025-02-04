import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const topicRouter = createTRPCRouter({
  publicTopics: publicProcedure
    .input(
      z.object({
        limit: z.number().optional().default(5),
        page: z.number().optional().default(0),
        search: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.topic.findMany({
        where: {
          AND: [
            {
              OR: [
                { title: { contains: input.search, mode: "insensitive" } },
                { slug: { contains: input.search, mode: "insensitive" } },
                {
                  description: { contains: input.search, mode: "insensitive" },
                },
              ],
            },
            {
              AND: [
                {
                  publishedAt: { not: null },
                },
                {
                  preferPublication: true,
                },
              ],
            },
          ],
        },
        take: input.limit,
        skip: input.page * input.limit,
        orderBy: {
          createdAt: "desc",
        },
      });
    }),

  publicTopicBySlug: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const topic = await ctx.prisma.topic.findFirst({
        where: {
          slug: input.slug,
          publishedAt: {
            not: null,
          },
        },
        include: {
          creator: true,
        }
      });
      return topic;
    }),
});
