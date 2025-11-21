import prisma from "../prisma/client";
import bcrypt from "bcryptjs";
import { ServiceError } from "../utils/serviceError";


export const userService = {

    async createUser(username: string, email: string, password: string) {
        console.log("SERVICE: createUser called with:", { username, email, password });

        if (!username || !email || !password) {
            throw new ServiceError("All fields are required.", 400);
        }

        let existing;
        try {
            existing = await prisma.user.findUnique({ where: { email } });
        } catch (err) {
            console.error("Prisma findUnique error:", err);
            throw new ServiceError("Database error when checking existing user.", 500);
        }

        if (existing) {
            throw new ServiceError("This user already exists!", 400);
        }

        let hashed_pass;
        try {
            hashed_pass = await bcrypt.hash(password, 10);
        } catch (err) {
            console.error("bcrypt.hash error:", err);
            throw new ServiceError("Error hashing password.", 500);
        }

        let newUser;
        try {
            newUser = await prisma.user.create({
                data: { username, email, password: hashed_pass },
            });
        } catch (err) {
            console.error("Prisma create error:", err);
            throw new ServiceError("Database error when creating user.", 500);
        }

        return newUser;
    },

    async getAllUsers() {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                username: true,
                email: true,
                createdAt: true,
            }
        });

        if (users.length === 0) {
            throw new ServiceError("No users found.", 404);
        }

        return users;
    },

    async getUserById(id: number) {
        const existing = await prisma.user.findUnique({ where: {id} });
        if (!existing) {
            throw new ServiceError("This user does not exist!", 404);
        }

        const user = await prisma.user.findUnique({
            where: { id: id }
        })

        return user;
    },

    async updateUser(id: number, data: { username?: string, email?: string, password?: string }) {
        const existing = await prisma.user.findUnique({ where: {id} });
        if (!existing) {
            throw new ServiceError("This user does not exist!", 404);
        }

        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }

        const updatedUser = await prisma.user.update({
            where: { id },
            data
        });

        return updatedUser;
    },

    async deleteUser(id: number) {
        const existing = await prisma.user.findUnique({ where: {id} });
        if (!existing) {
            throw new ServiceError("This user does not exist!", 404);
        }

        return await prisma.user.delete({
            where: { id }
        });
    },
}