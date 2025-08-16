import z from "zod";

export const createProject = z.object({
    name : z.string().trim().min(1, "Project name is required").max(100, "Project name too long"),
    description: z.string().trim().min(1, "Description is required").max(500, "Description too long"),
    status: z.enum(['pending', 'in-progress', 'completed']).default('pending'),
    members: z.array(z.string().uuid("Invalid user ID format")).optional(),
});

export const updateProject = z.object({
    name: z.string().trim().min(1, "Project name is required").max(100, "Project name too long").optional(),
    description: z.string().trim().min(1, "Description is required").max(500, "Description too long").optional(),
    status: z.enum(['pending', 'in-progress', 'completed']).optional(),
    members: z.array(z.string().uuid("Invalid user ID format")).optional(),
}).refine((data) => Object.keys(data).length > 0, {
    message: "At least one field (name, description, status, or members) is required",
})