import { Router, Request, Response } from "express";

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

export default router;
