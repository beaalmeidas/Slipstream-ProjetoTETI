import { z } from "zod";


export const createPostSchema = z.object({
    title: z.string().min(3).max(200),
    content: z.string().min(10).max(5000),
    tags: z.array(z.string()).optional().default([]),
    isNews: z.boolean().optional().default(false),
    authorId: z.number().int().positive()
});

export const updatePostSchema = createPostSchema.partial();