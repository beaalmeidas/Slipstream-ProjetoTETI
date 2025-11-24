import type { Request, Response } from "express";
import { userService } from "../services/userService";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined in environment variables.");

export const authController = {
    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        try {
            // 1️⃣ Buscar usuário pelo email
            const user = await userService.getUserByEmail(email); // você precisa criar essa função no userService
            if (!user) {
                return res.status(404).json({ message: "User not found." });
            }

            // 2️⃣ Verificar senha
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Invalid password." });
            }

            // 3️⃣ Gerar token
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
