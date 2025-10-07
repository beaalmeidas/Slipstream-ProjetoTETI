import { Router } from "express";
import { teamController } from "../controllers/teamController";


const router = Router();


/**
 * @swagger
 * /team/create:
 *   post:
 *     summary: Create a new team
 *     tags: [Team]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Team created successfully
 *       400:
 *         description: Team already exists or invalid data
 */
router.post("/team/create", teamController.createTeam);

/**
 * @swagger
 * /team/all:
 *   get:
 *     summary: Get all teams
 *     tags: [Team]
 *     responses:
 *       200:
 *         description: List of teams
 */
router.get("/team/all", teamController.getAllTeams);

/**
 * @swagger
 * /team/{id}:
 *   get:
 *     summary: Get a team by ID
 *     tags: [Team]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Team ID
 *     responses:
 *       200:
 *         description: Team data
 *       404:
 *         description: Team not found
 */
router.get("/team/:id", teamController.getTeamById);

/**
 * @swagger
 * /team/{id}:
 *   put:
 *     summary: Update a team by ID
 *     tags: [Team]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Team ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Team updated successfully
 *       404:
 *         description: Team not found
 */
router.put("/team/:id", teamController.updateTeam);

/**
 * @swagger
 * /team/{id}:
 *   delete:
 *     summary: Delete a team by ID
 *     tags: [Team]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Team ID
 *     responses:
 *       200:
 *         description: Team deleted successfully
 *       404:
 *         description: Team not found
 */
router.delete("/team/:id", teamController.deleteTeam);

export default router;
