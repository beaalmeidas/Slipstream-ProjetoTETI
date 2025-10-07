import { Router } from "express";
import { driverController } from "../controllers/driverController";
import { validateSchema } from "../utils/validateSchema";
import { createDriverSchema, updateDriverSchema } from "../schemas/driverSchema";


const router = Router();

/**
 * @swagger
 * /driver/create:
 *   post:
 *     summary: Create a new driver
 *     tags: [Driver]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - nationality
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               nationality:
 *                 type: string
 *               teamId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Driver created successfully
 *       400:
 *         description: Driver already exists or invalid data
 */
router.post("/create", validateSchema(createDriverSchema), driverController.createDriver);

/**
 * @swagger
 * /driver/all:
 *   get:
 *     summary: Get all drivers
 *     tags: [Driver]
 *     responses:
 *       200:
 *         description: List of drivers
 */
router.get("/all", driverController.getAllDrivers);

/**
 * @swagger
 * /driver/{id}:
 *   get:
 *     summary: Get a driver by ID
 *     tags: [Driver]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Driver ID
 *     responses:
 *       200:
 *         description: Driver data
 *       404:
 *         description: Driver not found
 */
router.get("/:id", driverController.getDriverById);

/**
 * @swagger
 * /driver/{id}:
 *   put:
 *     summary: Update a driver by ID
 *     tags: [Driver]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Driver ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               nationality:
 *                 type: string
 *               teamId:
 *                 type: integer
 *                 description: "Optional. ID of the team."
 *               wdcPoints:
 *                 type: integer
 *                 description: "Optional. Driver's World Championship points."
 *     responses:
 *       200:
 *         description: Driver updated successfully
 *       404:
 *         description: Driver not found
 */
router.put("/:id", validateSchema(updateDriverSchema), driverController.updateDriver);

/**
 * @swagger
 * /driver/{id}:
 *   delete:
 *     summary: Delete a driver by ID
 *     tags: [Driver]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Driver ID
 *     responses:
 *       200:
 *         description: Driver deleted successfully
 *       404:
 *         description: Driver not found
 */
router.delete("/:id", driverController.deleteDriver);

export default router;
