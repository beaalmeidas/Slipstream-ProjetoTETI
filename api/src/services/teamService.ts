import prisma from "../prisma/client";
import bcrypt from "bcryptjs";
import { ServiceError } from "../utils/serviceError";

export const teamService = {
    async createTeam(data: { name: string; wccPoints?: number }) {
        if (!data.name) throw new ServiceError("Team name is required.", 400);

        const existing = await prisma.team.findUnique({ where: { name: data.name } });
        if (existing) throw new ServiceError("Team already exists!", 400);

        return await prisma.team.create({ data });
    },

    async getAllTeams() {
        const teams = await prisma.team.findMany({ include: { drivers: true, racesWon: true, } });
        if (!teams.length) throw new ServiceError("No teams found.", 404);
        return teams;
    },

    async getTeamById(id: number) {
        const team = await prisma.team.findUnique({ where: { id }, include: { drivers: true, racesWon: true, } });

        if (!team) throw new ServiceError("Team not found.", 404);

        return team;
    },

    async updateTeam(id: number, data: { name?: string; wccPoints?: number }) {
        const existing = await prisma.team.findUnique({ where: { id } });
        if (!existing) throw new ServiceError("Team not found.", 404);
        return await prisma.team.update({ where: { id }, data });
    },

    async deleteTeam(id: number) {
        const existing = await prisma.team.findUnique({ where: { id } });
        if (!existing) throw new ServiceError("Team not found.", 404);
        return await prisma.team.delete({ where: { id } });
    },
};
