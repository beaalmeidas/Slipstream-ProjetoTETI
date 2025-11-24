import { Router } from "express";
import { authController } from "../controllers/authController";
import { loginSchema } from "../schemas/loginSchema";
import { validateSchema } from "../utils/validateSchema";

const router = Router();


/**
 * POST /auth/login
 * Body: { email, password }
 */
router.post("/login", validateSchema(loginSchema), authController.login);


export default router;
