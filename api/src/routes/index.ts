import { Router } from "express";
import userRoutes from "./userRoutes";
import teamRoutes from "./teamRoutes";
import driverRoutes from "./driverRoutes";
import raceRoutes from "./raceRoutes";
import postRoutes from "./postRoutes";
import commentRoutes from "./commentRoutes";


const router = Router();

router.use("/user", userRoutes);
router.use("/team", teamRoutes);
router.use("/driver", driverRoutes);
router.use("/race", raceRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);

export default router;
