import { createTRPCRouter } from "~/server/api/trpc";
import { utilsRouter } from "./routers/utils";
import { userRouter } from "./routers/user";
import { topicRouter } from "./routers/topic";
import { questionRouter } from "./routers/question";
import { topicLogRouter } from "./routers/topicLog";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */

export const appRouter = createTRPCRouter({
  user: userRouter,
  topic: topicRouter,
  topicLog: topicLogRouter,
  question: questionRouter,
  utils: utilsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
