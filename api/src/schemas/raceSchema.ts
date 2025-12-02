import { z } from "zod";


export const createRaceSchema = z.object({
    name: z.string().min(1, { message: "Race name is required." }),
    circuit: z.string().min(1, { message: "Circuit is required." }),
    city: z.string().min(1, { message: "City is required." }),
    country: z.string().min(1, { message: "Country is required." }),
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Date must be a valid ISO date string.",
    }),
    userId: z.number().int().optional(),
    notes: z.string().optional(),
    winningDriverId: z.number().int().optional(),
    winningConstructorId: z.number().int().optional(),
});

export const updateRaceSchema = createRaceSchema.partial();
