import { Router } from "express";
import { commentController } from "../controllers/commentController";
import { validateSchema } from "../utils/validateSchema";
import { createCommentSchema } from "../schemas/commentSchema";


const router = Router();


/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [content, postId, authorId]
 *             properties:
 *               content:
 *                 type: string
 *               postId:
 *                 type: integer
 *               authorId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Comment created successfully
 */
router.post("/", validateSchema(createCommentSchema), commentController.createComment);


/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Comment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [authorId]
 *             properties:
 *               authorId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       404:
 *         description: Comment not found
 */
router.delete("/:id", commentController.deleteComment);


export default router;