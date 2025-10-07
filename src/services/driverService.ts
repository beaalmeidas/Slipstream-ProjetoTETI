import prisma from "../prisma/client";
import { ServiceError } from "../utils/serviceError";

export const driverService = {

    async createDriver(data: { firstName: string; lastName: string; nationality: string; teamId?: number }) {
        if (!data.firstName) throw new ServiceError("Driver firstName is required.", 400);
        if (!data.lastName) throw new ServiceError("Driver lastName is required.", 400);
        if (!data.nationality) throw new ServiceError("Driver nationality is required.", 400);

        const existing = await prisma.driver.findFirst({
        where: {
            firstName: data.firstName,
            lastName: data.lastName,
        },
        });
        if (existing) throw new ServiceError("Driver already exists!", 400);

        return await prisma.driver.create({ data });
    },

    async getAllDrivers() {
        const drivers = await prisma.driver.findMany({ include: { team: true } });
        if (!drivers.length) throw new ServiceError("No drivers found.", 404);
        return drivers;
    },

    async getDriverById(id: number) {
        const driver = await prisma.driver.findUnique({ where: { id }, include: { team: true } });
        if (!driver) throw new ServiceError("Driver not found.", 404);
        return driver;
    },

    async updateDriver(id: number, data: { firstName?: string; lastName?: string; nationality?: string; teamId?: number }) {
        const existing = await prisma.driver.findUnique({ where: { id } });
        if (!existing) throw new ServiceError("Driver not found.", 404);

        if (data.firstName && data.lastName) {
        const nameExists = await prisma.driver.findFirst({
            where: {
            firstName: data.firstName,
            lastName: data.lastName,
            NOT: { id },
            },
        });
        if (nameExists) throw new ServiceError("Driver with this name already exists!", 400);
        }

        return await prisma.driver.update({ where: { id }, data });
    },

    async deleteDriver(id: number) {
        const existing = await prisma.driver.findUnique({ where: { id } });
        if (!existing) throw new ServiceError("Driver not found.", 404);
        return await prisma.driver.delete({ where: { id } });
    },
};
