import prisma from "../prisma/client";
import { ServiceError } from "../utils/serviceError";


export const raceService = {
    async createRace(data: {
        name: string;
        circuit: string;
        city: string;
        country: string;
        date: Date;
        userId?: number;
        notes?: string;
        winningDriverId?: number;
        winningConstructorId?: number;
    }) {
        if (!data.name) throw new ServiceError("Race name is required.", 400);
        if (!data.circuit) throw new ServiceError("Circuit is required.", 400);
        if (!data.city) throw new ServiceError("City is required.", 400);
        if (!data.country) throw new ServiceError("Country is required.", 400);
        if (!data.date) throw new ServiceError("Date is required.", 400);

        const existing = await prisma.race.findFirst({ where: { name: data.name, date: data.date } });
        if (existing) throw new ServiceError("Race already exists!", 400);

        return await prisma.race.create({ data });
    },

    async getAllRaces() {
        const races = await prisma.race.findMany({
            include: { user: true, winningDriver: true, winningConstructor: true },
        });
        if (!races.length) throw new ServiceError("No races found.", 404);
        return races;
    },

    async getRaceById(id: number) {
        const race = await prisma.race.findUnique({
        where: { id },
        include: { user: true, winningDriver: true, winningConstructor: true },
        });
        if (!race) throw new ServiceError("Race not found.", 404);
        return race;
    },

    async updateRace(
        id: number,
        data: {
        name?: string;
        circuit?: string;
        city?: string;
        country?: string;
        date?: Date;
        userId?: number;
        notes?: string;
        winningDriverId?: number;
        winningConstructorId?: number;
        }
    ) {
        const existing = await prisma.race.findUnique({ where: { id } });
        if (!existing) throw new ServiceError("Race not found.", 404);

        return await prisma.race.update({ where: { id }, data });
    },

    async deleteRace(id: number) {
        const existing = await prisma.race.findUnique({ where: { id } });
        if (!existing) throw new ServiceError("Race not found.", 404);
        return await prisma.race.delete({ where: { id } });
    },
};
