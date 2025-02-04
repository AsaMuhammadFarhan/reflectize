import * as z from "zod";

export const loginSchema = z.object({
  usernameOrEmail: z.string(),
  password: z.string(),
});

export const signUpSchema = loginSchema.extend({
  username: z.string().min(5),
  email: z.string().email(),
  password: z.string().min(8),
});

export type ILogin = z.infer<typeof loginSchema>;
export type ISignUp = z.infer<typeof signUpSchema>;
