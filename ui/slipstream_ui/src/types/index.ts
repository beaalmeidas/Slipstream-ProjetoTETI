export interface User {
    id: number;
    username: string;
    email: string;
    createdAt: string;
}

export interface Team {
    id: number;
    name: string;
    wccPoints: number;
}

export interface Driver {
    id: number;
    firstName: string;
    lastName: string;
    nationality: string;
    teamId?: number;
    wdcPoints: number;
}

export interface Race {
    id: number;
    name: string;
    circuit: string;
    city: string;
    country: string;
    date: string;
    notes?: string;
}

export type { Post, Comment } from '../services/postService';