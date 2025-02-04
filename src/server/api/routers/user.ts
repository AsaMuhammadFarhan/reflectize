import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import randomString, { randomStringNumber } from "~/utils/random/string";
import { sendVerificationEmail } from "../utils/verification/email";
import { hash } from "argon2";
import { Gender, TopicTheme } from "@prisma/client";

export const userRouter = createTRPCRouter({
  createUser: publicProcedure
    .input(
      z.object({
        name: z.string().min(3).trim(),
        email: z.string().email(),
        date: z.date(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { date, email, name } = input;
      let username = email.split("@")[0] ?? randomString(5);

      const checkUser1 = await ctx.prisma.user.count({
        where: {
          email,
        },
      });

      if (checkUser1 > 0)
        throw new Error("Email has been used to another account!");

      let checkUser2 = await ctx.prisma.user.count({
        where: {
          username,
        },
      });

      while (checkUser2 > 0) {
        username = username + randomStringNumber(1);
        checkUser2 = await ctx.prisma.user.count({
          where: {
            username,
          },
        });
      }

      const user = await ctx.prisma.user.create({
        data: {
          name,
          email,
          username,
          role: "USER",
        },
      });

      if (!user) throw new Error("Cannot create user");
      date.setHours(date.getHours() + 1);
      const verificationToken = await ctx.prisma.verificationToken.upsert({
        where: {
          identifier: user.id,
        },
        update: {
          identifier: user.id,
          token: randomStringNumber(4),
          expires: date,
        },
        create: {
          identifier: user.id,
          token: randomStringNumber(4),
          expires: date,
        },
      });
      if (!verificationToken)
        throw new Error("Failed create verification token");

      await sendVerificationEmail({
        email,
        name,
        token: verificationToken.token,
        username,
      });

      return user;
    }),

  resendVerificationToken: publicProcedure
    .input(
      z.object({
        username: z.string().min(3).trim(),
        date: z.date(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { username, date } = input;
      const user = await ctx.prisma.user.findFirst({
        where: {
          username,
        },
      });

      if (!user) throw new Error("User doesn't exist.");
      if (user.emailVerified !== null) throw new Error("User has verified.");

      date.setHours(date.getHours() + 1);
      const verificationToken = await ctx.prisma.verificationToken.upsert({
        where: {
          identifier: user.id,
        },
        update: {
          identifier: user.id,
          token: randomStringNumber(4),
          expires: date,
        },
        create: {
          identifier: user.id,
          token: randomStringNumber(4),
          expires: date,
        },
      });
      if (!verificationToken)
        throw new Error("Failed create verification token");

      await sendVerificationEmail({
        email: user.email,
        name: user.name,
        token: verificationToken.token,
        username,
      });

      return user;
    }),

  verifyToken: publicProcedure
    .input(
      z
        .object({
          username: z.string(),
          token: z.string(),
          password: z.string().min(8, "Password must be at least 8 characters"),
          passwordConfirmation: z.string(),
          date: z.date(),
          objective: z.string(),
          preferenceTheme: z.nativeEnum(TopicTheme),
          gender: z.nativeEnum(Gender),
          ageRange: z.string(),
        })
        .refine((data) => data.password === data.passwordConfirmation, {
          message: "Password confirmation doesn't match",
          path: ["passwordConfirmation"],
        })
    )
    .mutation(async ({ input, ctx }) => {
      const {
        token,
        password,
        date,
        username,
        objective,
        preferenceTheme,
        gender,
        ageRange,
      } = input;

      // Cek apakah user ada
      const user = await ctx.prisma.user.findFirst({
        where: { username },
      });
      if (!user) throw new Error("Invalid username or token");

      // Ambil token verifikasi
      const verificationToken = await ctx.prisma.verificationToken.findFirst({
        where: { identifier: user.id },
      });
      if (!verificationToken) throw new Error("Invalid username or token");

      // Cek apakah token sudah kadaluarsa sebelum validasi lainnya
      if (verificationToken.expires < date) {
        await ctx.prisma.verificationToken.delete({
          where: { id: verificationToken.id },
        });
        throw new Error("Token has expired, please request a new one.");
      }

      // Cek apakah token benar
      if (verificationToken.token !== token)
        throw new Error("Invalid username or token");

      // Update user dan hapus token
      await ctx.prisma.$transaction([
        ctx.prisma.verificationToken.delete({
          where: { id: verificationToken.id },
        }),
        ctx.prisma.user.update({
          where: { id: user.id },
          data: {
            emailVerified: new Date(),
            password: await hash(password),
          },
        }),
        ctx.prisma.demographicData.upsert({
          where: {
            userId: user.id,
          },
          create: {
            userId: user.id,
            objective,
            preferenceTheme,
            gender,
            ageRange,
          },
          update: {
            userId: user.id,
            objective,
            preferenceTheme,
            gender,
            ageRange,
          },
        }),
      ]);

      return user;
    }),
});
