import prisma from "../prisma/client";
import { ServiceError } from "../utils/serviceError";


export const commentService = {
    async createComment(content: string, postId: number, authorId: number) {
        const postExists = await prisma.post.findUnique({ where: { id: postId } });
        if (!postExists) {
            throw new ServiceError("Post not found", 404);
        }

        const userExists = await prisma.user.findUnique({ where: { id: authorId } });
        if (!userExists) {
            throw new ServiceError("User not found", 404);
        }

        const comment = await prisma.comment.create({
            data: {
                content,
                postId,
                authorId
            },
            include: {
                author: {
                    select: {
                        id: true,
                        username: true
                    }
                },
                post: {
                    select: {
                        id: true,
                        title: true
                    }
                }
            }
        });

        return comment;
    },

    async deleteComment(id: number, authorId: number) {
        const comment = await prisma.comment.findUnique({
            where: { id }
        });

        if (!comment) {
            throw new ServiceError("Comment not found", 404);
        }

        if (comment.authorId !== authorId) {
            throw new ServiceError("Unauthorized", 403);
        }

        await prisma.comment.delete({
            where: { id }
        });

        return { message: "Comment deleted successfully" };
    }
};