import type * as trpc from "@trpc/server";
import type * as trpcNext from "@trpc/server/adapters/next";
import { prisma } from "./db";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export async function createContext(ctx: trpcNext.CreateNextContextOptions) {
  const { req, res } = ctx;
  const session = await getServerSession(req, res, authOptions)

  return {
    req,
    res,
    session,
    prisma: prisma,
  };
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>;