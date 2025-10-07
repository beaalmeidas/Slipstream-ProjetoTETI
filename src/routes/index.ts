import { Router } from "express";
import userRoutes from "./userRoutes";
import teamRoutes from "./teamRoutes";
import driverRoutes from "./driverRoutes";


const router = Router();

router.use("/user", userRoutes);
router.use("/team", teamRoutes);
router.use("/driver", driverRoutes);

export default router;
