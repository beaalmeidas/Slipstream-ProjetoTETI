import { Request, Response, NextFunction } from "express";
import { ZodType, ZodError } from "zod";


export const validateSchema = (schema: ZodType<any>) => (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof ZodError) {
        const errors = error.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
        }));

        return res.status(400).json({
            message: "Validation error",
            errors,
        });
        }

        return res.status(500).json({ message: "Internal server error" });
    }
};
