import api from './api';

export interface Post {
    id: number;
    title: string;
    content: string;
    authorId: number;
    tags: string[];
    isNews: boolean;
    createdAt: string;
    author: {
        id: number;
        username: string;
        email: string;
    };
    comments?: Comment[];
}

export interface Comment {
    id: number;
    content: string;
    postId: number;
    authorId: number;
    createdAt: string;
    author: {
        id: number;
        username: string;
    };
}

export const postService = {
    getAllPosts: async (): Promise<Post[]> => {
        const response = await api.get('/posts');
        return response.data.data;
    },

    getPostById: async (id: number): Promise<Post> => {
        const response = await api.get(`/posts/${id}`);
        return response.data.data;
    },

    createPost: async (postData: {
        title: string;
        content: string;
        authorId: number;
        tags?: string[];
        isNews?: boolean;
    }): Promise<Post> => {
        const response = await api.post('/posts', postData);
        return response.data.data;
    },

    updatePost: async (id: number, postData: {
        title?: string;
        content?: string;
        tags?: string[];
        isNews?: boolean;
        authorId: number;
    }): Promise<Post> => {
        const response = await api.put(`/posts/${id}`, postData);
        return response.data.data;
    },

    deletePost: async (id: number, authorId: number): Promise<void> => {
        await api.delete(`/posts/${id}`, { data: { authorId } });
    },
};