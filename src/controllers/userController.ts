import type { Request, Response } from "express";
import { userService } from "../services/userService";
import { ServiceError } from "../utils/serviceError";


export const userController = {
    async createUser(req: Request, res: Response) {
        try {
            const { username, email, password } = req.body;
            const newUser = await userService.createUser(username, email, password);

            return res.status(201).json({
                message: "User created succesfully!",
                data: newUser
            });
        } catch (error) {
            // if the error that happened is specified in the controller:
            if (error instanceof ServiceError) {
                return res.status(error.status).json({ message: error.message });
            }
            // if not (and if it's a code or runtime problem):
            return res.status(500).json({ message: "Internal server error" });
        }
    },

    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await userService.getAllUsers();

            return res.status(200).json({
                message: "Users retrieved succesfully!",
                data: users
            });
        } catch (error) {
            if (error instanceof ServiceError) {
                return res.status(error.status).json({ message: error.message });
            }
            return res.status(500).json({ message: "Internal server error" });
        }
    },

    async getUserById(req: Request, res: Response) {
        try {
            /*
            we have to extract the id from the request and turn into a number
            to be able to search with it
            */
            const id = Number(req.params.id);
            const user = await userService.getUserById(id);

            return res.status(200).json({
                message: "User retrieved succesfully!",
                data: user
            });
        } catch (error) {
            if (error instanceof ServiceError) {
                return res.status(error.status).json({ message: error.message });
            }
            return res.status(500).json({ message: "Internal server error" });
        }
    },

    async updateUser(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const { username, email, password } = req.body;

            const updatedUser = await userService.updateUser(id, { username, email, password });

            return res.status(200).json({
                message: "User updated successfully!",
                data: updatedUser
            });
        } catch (error) {
            if (error instanceof ServiceError) {
                return res.status(error.status).json({ message: error.message });
            }
            return res.status(500).json({ message: "Internal server error" });
        }
    },

    async deleteUser(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const deletedUser = await userService.deleteUser(id);

            return res.status(200).json({
                message: "User deleted succesfully!",
                data: deletedUser
            });
        } catch (error) {
            if (error instanceof ServiceError) {
                return res.status(error.status).json({ message: error.message });
            }
            return res.status(500).json({ message: "Internal server error" });
        }
    },
}
