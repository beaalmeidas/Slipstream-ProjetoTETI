import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.json({ message: "Hello, Express + TypeScript!" });
});

router.get("/hello", (req: Request, res: Response) => {
    res.json({ message: "teste sua rapariga" });
});

router.get("/ping", (req: Request, res: Response) => {
    res.json({ message: "pong" });
});

export default router;
