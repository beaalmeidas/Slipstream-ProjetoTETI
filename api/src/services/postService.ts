import prisma from "../prisma/client";
import { ServiceError } from "../utils/serviceError";


export const postService = {
    async createPost(title: string, content: string, authorId: number, tags: string[] = [], isNews: boolean = false) {
        const userExists = await prisma.user.findUnique({ where: { id: authorId } });
        if (!userExists) {
            throw new ServiceError("Author not found", 404);
        }

        const post = await prisma.post.create({
            data: {
                title,
                content,
                authorId,
                tags,
                isNews
            },
            include: {
                author: {
                    select: {
                        id: true,
                        username: true,
                        email: true
                    }
                }
            }
        });

        return post;
    },

    async getAllPosts() {
        const posts = await prisma.post.findMany({
            include: {
                author: {
                    select: {
                        id: true,
                        username: true,
                        email: true
                    }
                },
                comments: {
                    include: {
                        author: {
                        select: {
                            id: true,
                            username: true
                        }
                        }
                    },
                    orderBy: {
                        createdAt: 'desc'
                    },
                    take: 5
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return posts;
    },

    async getPostById(id: number) {
        const post = await prisma.post.findUnique({
            where: { id },
            include: {
                author: {
                    select: {
                        id: true,
                        username: true,
                        email: true
                    }
                },
                comments: {
                    include: {
                        author: {
                        select: {
                            id: true,
                            username: true
                        }
                        }
                    },
                    orderBy: {
                        createdAt: 'asc'
                    }
                }
            }
        });

        if (!post) {
        throw new ServiceError("Post not found", 404);
        }

        return post;
    },

    async updatePost(id: number, authorId: number, data: { title?: string, content?: string, tags?: string[], isNews?: boolean }) {
        const post = await prisma.post.findUnique({
            where: { id }
        });

        if (!post) {
            throw new ServiceError("Post not found", 404);
        }

        if (post.authorId !== authorId) {
            throw new ServiceError("Unauthorized", 403);
        }

        const updatedPost = await prisma.post.update({
            where: { id },
            data,
            include: {
                author: {
                    select: {
                        id: true,
                        username: true
                    }
                }
            }
        });

        return updatedPost;
    },

    async deletePost(id: number, authorId: number) {
        const post = await prisma.post.findUnique({
        where: { id }
        });

        if (!post) {
            throw new ServiceError("Post not found", 404);
        }

        if (post.authorId !== authorId) {
            throw new ServiceError("Unauthorized", 403);
        }

        await prisma.post.delete({
            where: { id }
        });

        return { message: "Post deleted successfully" };
    }
};