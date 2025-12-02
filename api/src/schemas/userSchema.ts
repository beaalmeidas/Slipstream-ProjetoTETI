import { z } from "zod";


export const createUserSchema = z.object({
    username: z
        .string()
        .min(3, { message: "Username must be at least 3 characters long." }),
    email: z.email({ message: "Please provide a valid email address." }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters long." }),
});

export const updateUserSchema = createUserSchema.partial();

export const loginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(1, "Password is required")
});
