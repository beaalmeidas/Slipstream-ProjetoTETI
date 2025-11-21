import type { Request, Response } from "express";
import { driverService } from "../services/driverService";
import { ServiceError } from "../utils/serviceError";


export const driverController = {
    async createDriver(req: Request, res: Response) {
        try {
            const newDriver = await driverService.createDriver(req.body);
            return res.status(201).json({ message: "Driver created successfully!", data: newDriver });
        } catch (error) {
            if (error instanceof ServiceError) return res.status(error.status).json({ message: error.message });
            return res.status(500).json({ message: "Internal server error" });
        }
    },

    async getAllDrivers(_req: Request, res: Response) {
        try {
            const drivers = await driverService.getAllDrivers();
            return res.status(200).json({ message: "Drivers retrieved successfully!", data: drivers });
        } catch (error) {
            if (error instanceof ServiceError) return res.status(error.status).json({ message: error.message });
            return res.status(500).json({ message: "Internal server error" });
        }
    },

    async getDriverById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const driver = await driverService.getDriverById(id);
            return res.status(200).json({ message: "Driver retrieved successfully!", data: driver });
        } catch (error) {
            if (error instanceof ServiceError) return res.status(error.status).json({ message: error.message });
            return res.status(500).json({ message: "Internal server error" });
        }
    },

    async updateDriver(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const updatedDriver = await driverService.updateDriver(id, req.body);
            return res.status(200).json({ message: "Driver updated successfully!", data: updatedDriver });
        } catch (error) {
            if (error instanceof ServiceError) return res.status(error.status).json({ message: error.message });
            return res.status(500).json({ message: "Internal server error" });
        }
    },

    async deleteDriver(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const deletedDriver = await driverService.deleteDriver(id);
            return res.status(200).json({ message: "Driver deleted successfully!", data: deletedDriver });
        } catch (error) {
            if (error instanceof ServiceError) return res.status(error.status).json({ message: error.message });
            return res.status(500).json({ message: "Internal server error" });
        }
    },
};
