import type { Request, Response } from "express";
import { teamService } from "../services/teamService";
import { ServiceError } from "../utils/serviceError";

export const teamController = {
    async createTeam(req: Request, res: Response) {
        try {
            const { name, wccPoints } = req.body;

            const newTeam = await teamService.createTeam({ name, wccPoints });

            return res.status(201).json({
                message: "Team created successfully!",
                data: newTeam
            });
        } catch (error) {
            if (error instanceof ServiceError) {
                return res.status(error.status).json({ message: error.message });
            }
            return res.status(500).json({ message: "Internal server error" });
        }
    },

    async getAllTeams(_req: Request, res: Response) {
        try {
            const teams = await teamService.getAllTeams();

            return res.status(200).json({
                message: "Teams retrieved successfully!",
                data: teams
            });
        } catch (error) {
            if (error instanceof ServiceError) {
                return res.status(error.status).json({ message: error.message });
            }
            return res.status(500).json({ message: "Internal server error" });
        }
    },

    async getTeamById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const team = await teamService.getTeamById(id);

            return res.status(200).json({
                message: "Team retrieved successfully!",
                data: team
            });
        } catch (error) {
            if (error instanceof ServiceError) {
                return res.status(error.status).json({ message: error.message });
            }
            return res.status(500).json({ message: "Internal server error" });
        }
    },

    async updateTeam(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const { name, wccPoints } = req.body;

            const updatedTeam = await teamService.updateTeam(id, { name, wccPoints });

            return res.status(200).json({
                message: "Team updated successfully!",
                data: updatedTeam
            });
        } catch (error) {
            if (error instanceof ServiceError) {
                return res.status(error.status).json({ message: error.message });
            }
            return res.status(500).json({ message: "Internal server error" });
        }
    },

    async deleteTeam(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const deletedTeam = await teamService.deleteTeam(id);

            return res.status(200).json({
                message: "Team deleted successfully!",
                data: deletedTeam
            });
        } catch (error) {
            if (error instanceof ServiceError) {
                return res.status(error.status).json({ message: error.message });
            }
            return res.status(500).json({ message: "Internal server error" });
        }
    }
};
