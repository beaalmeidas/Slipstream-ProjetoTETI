import { Router } from "express";
import { raceController } from "../controllers/raceController";
import { validateSchema } from "../utils/validateSchema";
import { createRaceSchema, updateRaceSchema } from "../schemas/raceSchema";


const router = Router();

/**
 * @swagger
 * /race/create:
 *   post:
 *     summary: Create a new race
 *     tags: [Race]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - circuit
 *               - city
 *               - country
 *               - date
 *             properties:
 *               name:
 *                 type: string
 *               circuit:
 *                 type: string
 *               city:
 *                 type: string
 *               country:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               userId:
 *                 type: integer
 *               notes:
 *                 type: string
 *               winningDriverId:
 *                 type: integer
 *               winningConstructorId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Race created successfully
 *       400:
 *         description: Race already exists or invalid data
 */
router.post("/create", validateSchema(createRaceSchema), raceController.createRace);

/**
 * @swagger
 * /race/all:
 *   get:
 *     summary: Get all races
 *     tags: [Race]
 *     responses:
 *       200:
 *         description: List of races
 */
router.get("/all", raceController.getAllRaces);

/**
 * @swagger
 * /race/{id}:
 *   get:
 *     summary: Get a race by ID
 *     tags: [Race]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Race ID
 *     responses:
 *       200:
 *         description: Race data
 *       404:
 *         description: Race not found
 */
router.get("/:id", raceController.getRaceById);

/**
 * @swagger
 * /race/{id}:
 *   put:
 *     summary: Update a race by ID
 *     tags: [Race]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Race ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               circuit:
 *                 type: string
 *               city:
 *                 type: string
 *               country:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               userId:
 *                 type: integer
 *               notes:
 *                 type: string
 *               winningDriverId:
 *                 type: integer
 *               winningConstructorId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Race updated successfully
 *       404:
 *         description: Race not found
 */
router.put("/:id", validateSchema(updateRaceSchema), raceController.updateRace);

/**
 * @swagger
 * /race/{id}:
 *   delete:
 *     summary: Delete a race by ID
 *     tags: [Race]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Race ID
 *     responses:
 *       200:
 *         description: Race deleted successfully
 *       404:
 *         description: Race not found
 */
router.delete("/:id", raceController.deleteRace);

export default router;
