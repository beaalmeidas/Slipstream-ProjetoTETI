import { Router } from "express";
import { postController } from "../controllers/postController";
import { validateSchema } from "../utils/validateSchema";
import { createPostSchema, updatePostSchema } from "../schemas/postSchema";


const router = Router();

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 */
router.post("/", validateSchema(createPostSchema), postController.createPost);

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 */
router.get("/", postController.getAllPosts);

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Get a post by ID
 *     tags: [Posts]
 */
router.get("/:id", postController.getPostById);

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     summary: Update a post
 *     tags: [Posts]
 */
router.put("/:id", validateSchema(updatePostSchema), postController.updatePost);

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Delete a post
 *     tags: [Posts]
 */
router.delete("/:id", postController.deletePost);


export default router;