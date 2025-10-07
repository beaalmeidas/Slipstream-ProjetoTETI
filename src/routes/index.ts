import { Router } from "express";
import userRoutes from "./userRoutes";
import teamRoutes from "./teamRoutes";

const router = Router();

router.use("/user", userRoutes)
router.use("/team", teamRoutes);

export default router;
