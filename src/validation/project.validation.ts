import mongoose from "mongoose";
import z from "zod";

export const createProject = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Project name is required")
    .max(100, "Project name too long"),
  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(500, "Description too long"),
  status: z.enum(["pending", "in-progress", "completed"]).default("pending"),
  members: z.array(z.string().uuid("Invalid user ID format")).optional(),
});

export const updateProject = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Project name is required")
      .max(100, "Project name too long")
      .optional(),
    description: z
      .string()
      .trim()
      .min(1, "Description is required")
      .max(500, "Description too long")
      .optional(),
    status: z.enum(["pending", "in-progress", "completed"]).optional(),
    members: z.array(z.string().uuid("Invalid user ID format")).optional(),
  })
  .refine(
    (data) =>
      data.name !== undefined ||
      data.description !== undefined ||
      data.status !== undefined ||
      data.members !== undefined,
    {
      message:
        "At least one field (name, description, status, or members) is required",
    }
  );

const objectIdSchema = z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId",
});
export const addMemberSchema = z.object({
  body: z.object({
    projectId: objectIdSchema,
    memberId: objectIdSchema,
  }),
});

export const removeMemberSchema = z.object({
  body: z.object({
    projectId: objectIdSchema,
    memberId: objectIdSchema,
  }),
});