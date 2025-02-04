/* eslint-disable @typescript-eslint/consistent-type-imports */

import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
  DefaultUser,
} from "next-auth";
// import DiscordProvider from "next-auth/providers/discord";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
// import { env } from "~/env.mjs";
import { prisma } from "~/server/db";
import { loginSchema } from "./validation/auth";
import { verify } from "argon2";
import { DefaultJWT } from "next-auth/jwt";
import { Role } from "@prisma/client";

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role?: Role;
    // ...other properties
  }
}
declare module "next-auth" {
  interface User extends DefaultUser {
    role?: Role;
    // ...other properties
  }

  interface Session extends DefaultSession {
    id: string;
    user: {
      id: string;
      name: string;
      email: string;
      role: Role;
      slug?: string;
      // ...other properties
    } & DefaultSession["user"];
  }
}
export const authOptions: NextAuthOptions = {
  secret: "super-secret",
  jwt: {
    maxAge: 15 * 24 * 30 * 60, // 15 days
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
      }
      return Promise.resolve(token);
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id as string;
        session.user.role = token.role ?? "USER";
        session.user.name = token.name ?? "name failed";
        session.user.email = token.email ?? "email failed";
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      id: "login",
      name: "Credentials",
      credentials: {
        usernameOrEmail: {
          label: "Email",
          type: "text",
          placeholder: "jsmith@google.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        try {
          const creds = await loginSchema.parseAsync(credentials);
          const user = await prisma.user.findFirst({
            where: {
              OR: [
                { email: creds.usernameOrEmail },
                { username: creds.usernameOrEmail },
              ],
            },
          });
          if (!user) {
            throw new Error("No user found with the provided email");
          }

          if (!user.password) {
            throw new Error("User have not verified");
          }

          const isValidPassword = await verify(user.password, creds.password);

          if (!isValidPassword) {
            throw new Error("Invalid password");
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message || "Invalid credentials");
          }
          throw new Error("An unexpected error occurred");
        }
      },
    }),
  ],
};

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
