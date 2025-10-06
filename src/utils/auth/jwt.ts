import jwt from "jsonwebtoken";


export function generateJWT(userId: number, role: string): string {
    const secret = process.env.JWT_PASS;

    if (!secret) {
        throw new Error("JWT_PASS is not defined in environment variables");
    }

    const token = jwt.sign(
        { id: userId, role },
        secret,
        { expiresIn: "1y" }
    );

    return token;
}