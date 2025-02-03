import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { hash } from "argon2";

export const userRouter = createTRPCRouter({
  createUser: publicProcedure
    .input(
      z.object({
        name: z.string().min(3).trim(),
        email: z.string().email(),
        password: z.string().min(8),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const username = input.name.trim().toLowerCase().split(" ").join("-");

      const user = await ctx.prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: await hash(input.password),
          username,
          role: "USER",
        },
      });

      if (!user) throw new Error("Cannot create user");

      return user;
    }),
});
