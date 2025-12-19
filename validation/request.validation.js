import { z } from "zod";

export const signupPostRequestBodySchema = z.object({
  firstname: z.string().min(3),
  lastname: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

export const loginPostRequestBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const shortenPostRequestBodySchema = z.object({
  url: z.string().url(),
  shortCode: z
    .string()
    .min(3)
    .max(30)
    .regex(/^[a-zA-Z0-9_-]+$/)
    .optional(),
});
