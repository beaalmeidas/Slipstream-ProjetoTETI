import type { Request, Response } from "express";
import { userService } from "../services/userService";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { JWT_SECRET as ENV_JWT_SECRET } from "../config/env";

const JWT_SECRET = ENV_JWT_SECRET || "slipstream_jwt_1234";

if (!JWT_SECRET) {
    console.error("JWT_SECRET missing! Value:", process.env.JWT_SECRET);
    throw new Error("JWT_SECRET is not defined in environment variables.");
}


export const authController = {
    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        try {
            // Checking if provided email is registered
            const user = await userService.getUserByEmail(email);
            if (!user) {
                return res.status(404).json({ message: "User not found." });
            }
            
            // Verifying password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Invalid password." });
            }

            // Generating JWT token
            const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });

            return res.status(200).json({
                message: "Login successful",
                token,
                user: { id: user.id, username: user.username, email: user.email },
            });

        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal server error" });
        }
    },
};
