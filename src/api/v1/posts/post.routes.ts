import { Router } from "express";
const router = Router();
import { postController } from "./post.controller";
import { validateZodSchema } from "@utils/validators/zod-schema.validator";
import { CreatePostSchema, UpdatePostSchema } from "./post.types";

router.get("/", postController.getAllPosts);

router.get("/:id", postController.getPostById);

router.get("/authors/:authorId", postController.getPostsByAuthorId);

router.post(
  "/",
  validateZodSchema(CreatePostSchema),
  postController.createPost
);

router.put(
  "/:id",
  validateZodSchema(UpdatePostSchema),
  postController.updatePost
);

router.delete("/:id", postController.deletePost);

export const postRoutes = router;
