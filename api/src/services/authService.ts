import prisma from "../prisma/client";
import bcrypt from "bcryptjs";
import { ServiceError } from "../utils/serviceError";
import jwt from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET || "slipstream_jwt_1234";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "3h";

export const authService = {
    async login(email: string, password: string) {
        console.log("SERVICE: login called with:", { email });

        if (!email || !password) {
        throw new ServiceError("Email and password are required.", 400);
        }

        // Find user by email
        const user = await prisma.user.findUnique({
        where: { email }
        });

        if (!user) {
        throw new ServiceError("Invalid email or password.", 401);
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
        throw new ServiceError("Invalid email or password.", 401);
        }

        // Generate JWT token
        const token = jwt.sign(
            { 
                userId: user.id, 
                email: user.email,
                username: user.username
            },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        // Return user data (without password) and token
        const { password: _, ...userWithoutPassword } = user;

        return {
        user: userWithoutPassword,
        token
        };
    },

    async verifyToken(token: string) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET) as any;
            return decoded;
        } catch (error) {
            throw new ServiceError("Invalid token.", 401);
        }
    }
};