import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { TopicTheme } from "@prisma/client";
import slugify from "~/utils/slugify";
import { randomStringNumber } from "~/utils/random/string";
import { discordNewTopic } from "../utils/discord";

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
  getPublicTopics: publicProcedure
    .input(
      z.object({
        limit: z.number().optional().default(5),
        page: z.number().optional().default(0),
        search: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
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
  countPublicTopics: publicProcedure
    .input(
      z.object({
        search: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.topic.count({
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
        },
      });
      return topic;
    }),
  myTopics: protectedProcedure
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
              createdById: ctx.session.id,
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
  countMyTopic: protectedProcedure
    .input(
      z.object({
        search: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.topic.count({
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
              createdById: ctx.session.id,
            },
          ],
        },
      });
    }),

  createTopic: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string().nullable().optional(),
        theme: z.nativeEnum(TopicTheme).nullable(),
        preferPublication: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { title, description, theme, preferPublication } = input;

      let slug = slugify(title);
      let checkSlug = await ctx.prisma.topic.count({
        where: {
          slug,
        },
      });
      while (checkSlug > 0) {
        slug = slug + randomStringNumber(1);
        checkSlug = await ctx.prisma.topic.count({
          where: {
            slug,
          },
        });
      };

      const topic = await ctx.prisma.topic.create({
        data: {
          title,
          description,
          theme,
          preferPublication,
          slug,
          createdById: ctx.session.id,
        },
      });

      await discordNewTopic({
        topic,
        name: ctx.session.user.name,
        userId: ctx.session.id,
      });

      return topic;
    }),

  likeTopic: protectedProcedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { slug } = input;
      const userId = ctx.session.id;

      const topic = await ctx.prisma.topic.findFirst({
        where: {
          slug,
        },
      });
      if (!topic) throw new Error("Topic not found.");

      const temp = [...topic.likedByIds];
      const userIdIndex = temp.findIndex((id) => id === userId);
      if (userIdIndex > -1) {
        temp.splice(userIdIndex, 1);
      } else {
        temp.push(userId);
      }
      return await ctx.prisma.topic.update({
        where: {
          slug,
        },
        data: {
          likedByIds: temp,
        },
      });
    }),
});
