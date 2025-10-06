import { Router, Request, Response } from "express";
import { userController } from "../controllers/userController";


const router = Router();

/**
 * @swagger
 * /api/:
 *   get:
 *     summary: Main route
 *     description: Returns a welcome message
 *     responses:
 *       200:
 *         description: Success message
 */
router.get("/", (req: Request, res: Response) => {
    res.json({ message: "Hello, Express + TypeScript!" });
});

/**
 * @swagger
 * /api/hello:
 *   get:
 *     summary: Hello route
 *     description: Returns a test message
 *     responses:
 *       200:
 *         description: Test message
 */
router.get("/hello", (req: Request, res: Response) => {
    res.json({ message: "test" });
});

/**
 * @swagger
 * /api/ping:
 *   get:
 *     summary: Ping route
 *     description: Returns pong
 *     responses:
 *       200:
 *         description: Pong message
 */
router.get("/ping", (req: Request, res: Response) => {
    res.json({ message: "pong" });
});


/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: User already exists
 */
router.post("/user/create", userController.createUser);

/**
 * @swagger
 * /user/all:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: List of users
 */
router.get("/user/all", userController.getAllUsers);

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User data
 *       404:
 *         description: User not found
 */
router.get("/user/:id", userController.getUserById);

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */
router.put("/user/:id", userController.updateUser);

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete("/user/:id", userController.deleteUser);


export default router;