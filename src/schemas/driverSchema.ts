import { z } from "zod";


export const createDriverSchema = z.object({
    firstName: z.string().min(1, { message: "First name is required." }),
    lastName: z.string().min(1, { message: "Last name is required." }),
    nationality: z.string().min(1, { message: "Nationality is required." }),
    teamId: z.number().int().optional(),
});

export const updateDriverSchema = createDriverSchema.partial();
