import type { Request, Response } from "express";
import { commentService } from "../services/commentService";
import { ServiceError } from "../utils/serviceError";

export const commentController = {
    async createComment(req: Request, res: Response) {
        try {
        const { content, postId, authorId } = req.body;
        
        const newComment = await commentService.createComment(content, postId, authorId);

        return res.status(201).json({
            message: "Comment created successfully!",
            data: newComment
        });
        } catch (error) {
            if (error instanceof ServiceError) {
                return res.status(error.status).json({ message: error.message });
            }
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    },

    async deleteComment(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const authorId = Number(req.body.authorId);

            const result = await commentService.deleteComment(id, authorId);

            return res.status(200).json({
                message: result.message
            });
        } catch (error) {
            if (error instanceof ServiceError) {
                return res.status(error.status).json({ message: error.message });
            }
            return res.status(500).json({ message: "Internal server error" });
        }
    }
};