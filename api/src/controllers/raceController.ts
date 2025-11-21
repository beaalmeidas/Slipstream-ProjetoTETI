import type { Request, Response } from "express";
import { raceService } from "../services/raceService";
import { ServiceError } from "../utils/serviceError";

export const raceController = {
    async createRace(req: Request, res: Response) {
        try {
            const newRace = await raceService.createRace(req.body);
            return res.status(201).json({ message: "Race created successfully!", data: newRace });
        } catch (error) {
            if (error instanceof ServiceError) return res.status(error.status).json({ message: error.message });
            return res.status(500).json({ message: "Internal server error" });
        }
    },

    async getAllRaces(_req: Request, res: Response) {
        try {
            const races = await raceService.getAllRaces();
            return res.status(200).json({ message: "Races retrieved successfully!", data: races });
        } catch (error) {
            if (error instanceof ServiceError) return res.status(error.status).json({ message: error.message });
            return res.status(500).json({ message: "Internal server error" });
        }
    },

    async getRaceById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const race = await raceService.getRaceById(id);
            return res.status(200).json({ message: "Race retrieved successfully!", data: race });
        } catch (error) {
            if (error instanceof ServiceError) return res.status(error.status).json({ message: error.message });
            return res.status(500).json({ message: "Internal server error" });
        }
    },

    async updateRace(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const updatedRace = await raceService.updateRace(id, req.body);
            return res.status(200).json({ message: "Race updated successfully!", data: updatedRace });
        } catch (error) {
            if (error instanceof ServiceError) return res.status(error.status).json({ message: error.message });
            return res.status(500).json({ message: "Internal server error" });
        }
    },

    async deleteRace(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const deletedRace = await raceService.deleteRace(id);
            return res.status(200).json({ message: "Race deleted successfully!", data: deletedRace });
        } catch (error) {
            if (error instanceof ServiceError) return res.status(error.status).json({ message: error.message });
            return res.status(500).json({ message: "Internal server error" });
        }
    },
};
