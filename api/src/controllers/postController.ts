import type { Request, Response } from "express";
import { postService } from "../services/postService";
import { ServiceError } from "../utils/serviceError";


export const postController = {
    async createPost(req: Request, res: Response) {
        try {
            const { title, content, tags, isNews, authorId } = req.body;
            
            const newPost = await postService.createPost(
                title, 
                content, 
                authorId, 
                tags || [], 
                isNews || false
            );

            return res.status(201).json({
                message: "Post created successfully!",
                data: newPost
            });
        } catch (error) {
            if (error instanceof ServiceError) {
                return res.status(error.status).json({ message: error.message });
            }
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    },

    async getAllPosts(req: Request, res: Response) {
        try {
            const posts = await postService.getAllPosts();
            
            return res.status(200).json({
                message: "Posts retrieved successfully!",
                data: posts
            });
        } catch (error) {
            if (error instanceof ServiceError) {
                return res.status(error.status).json({ message: error.message });
            }
            return res.status(500).json({ message: "Internal server error" });
        }
    },

    async getPostById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const post = await postService.getPostById(id);

            return res.status(200).json({
                message: "Post retrieved successfully!",
                data: post
            });
        } catch (error) {
            if (error instanceof ServiceError) {
                return res.status(error.status).json({ message: error.message });
            }
            return res.status(500).json({ message: "Internal server error" });
        }
    },

    async updatePost(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const authorId = Number(req.body.authorId);
            const { title, content, tags, isNews } = req.body;

            const updatedPost = await postService.updatePost(id, authorId, {
                title,
                content,
                tags,
                isNews
            });

            return res.status(200).json({
                message: "Post updated successfully!",
                data: updatedPost
            });
        } catch (error) {
            if (error instanceof ServiceError) {
                return res.status(error.status).json({ message: error.message });
            }
            return res.status(500).json({ message: "Internal server error" });
        }
    },

    async deletePost(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const authorId = Number(req.body.authorId);

            const result = await postService.deletePost(id, authorId);

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