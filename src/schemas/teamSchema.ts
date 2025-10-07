import { z } from "zod";


export const createTeamSchema = z.object({
    name: z.string().min(1, { message: "Team name is required." }),
    wccPoints: z.number().int().nonnegative().optional(),
});

export const updateTeamSchema = createTeamSchema.partial();
