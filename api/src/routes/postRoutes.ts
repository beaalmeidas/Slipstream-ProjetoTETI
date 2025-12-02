import { Router } from "express";
import { postController } from "../controllers/postController";
import { validateSchema } from "../utils/validateSchema";
import { createPostSchema, updatePostSchema } from "../schemas/postSchema";


const router = Router();

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, content, authorId]
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               isNews:
 *                 type: boolean
 *               authorId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Post created successfully
 */
router.post("/", validateSchema(createPostSchema), postController.createPost);


/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: List of all posts
 */
router.get("/", postController.getAllPosts);


/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Get a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Post found
 *       404:
 *         description: Post not found
 */
router.get("/:id", postController.getPostById);


/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Update a post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [authorId]
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               isNews:
 *                 type: boolean
 *               authorId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Post updated
 *       404:
 *         description: Post not found
 */
router.put("/:id", validateSchema(updatePostSchema), postController.updatePost);


/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Delete a post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Post ID
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
 *         description: Post deleted
 *       404:
 *         description: Post not found
 */
router.delete("/:id", postController.deletePost);


export default router;