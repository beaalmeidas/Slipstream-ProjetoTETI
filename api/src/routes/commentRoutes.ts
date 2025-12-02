import { Router } from "express";
import { commentController } from "../controllers/commentController";
import { validateSchema } from "../utils/validateSchema";
import { createCommentSchema } from "../schemas/commentSchema";

const router = Router();

/**
 * @swagger
 * /api/comments:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 */
router.post("/", validateSchema(createCommentSchema), commentController.createComment);

/**
 * @swagger
 * /api/comments/{id}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
 */
router.delete("/:id", commentController.deleteComment);

export default router;