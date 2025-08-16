import { z } from "zod";
export const createUserSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name too long"),
  email: z.email("Invalid email").trim().toLowerCase(),
  password: z
    .string()
    .trim()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password too long"),
});

export const updateUserSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Name is required")
      .max(100, "Name too long")
      .optional(),
    email: z.email("Invalid email").trim().toLowerCase().optional(),
    password: z
      .string()
      .trim()
      .min(6, "Password must be at least 6 characters")
      .max(100, "Password too long")
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field (name or email) is required",
  });


export const loginUserSchema = z.object({
  email: z.string().email("Invalid email").trim().toLowerCase(),
  password: z
    .string()
    .trim()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password too long"),
});

