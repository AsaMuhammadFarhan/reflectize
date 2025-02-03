import { createTRPCRouter, publicProcedure } from "../trpc";

export const utilsRouter = createTRPCRouter({
  getServerTime: publicProcedure.query(() => {
    const now = new Date();
    return {
      status: 200,
      data: now,
    };
  }),
});
