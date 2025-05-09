import { Request, Response, NextFunction } from "express";
import { postService } from "./post.service";
import { PostType } from "./post.model";
import { CreatePostInput, UpdatePostInput } from "./post.types";

export class PostController {
  async getAllPosts(
    req: Request,
    res: Response<PostType[]>,
    next: NextFunction
  ) {
    try {
      const posts = await postService.getAllPosts();

      res.json(posts);
    } catch (error) {
      next(error);
    }
  }

  async getPostById(
    req: Request<{ id: string }>,
    res: Response<PostType>,
    next: NextFunction
  ) {
    const { id } = req.params;
    try {
      const post = await postService.getPostById(id);

      res.json(post);
    } catch (error) {
      next(error);
    }
  }

  async createPost(
    req: Request<{}, {}, CreatePostInput>,
    res: Response<PostType>,
    next: NextFunction
  ) {
    try {
      const authorId = res.locals.authUser.userId;
      const newPost = await postService.createPost({
        ...req.body,
        authorId,
      });

      res.status(201).json(newPost);
    } catch (error) {
      next(error);
    }
  }

  async updatePost(
    req: Request<{ id: string }, {}, UpdatePostInput>,
    res: Response<PostType>,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;

      const postInput = req.body;
      const authorId = res.locals.authUser.userId;
      const updatedPost = await postService.updatePost(id, authorId, postInput);

      res.json(updatedPost);
    } catch (error) {
      next(error);
    }
  }

  async deletePost(
    req: Request<{ id: string }>,
    res: Response<{ message: string }>,
    next: NextFunction
  ) {
    const { id } = req.params;
    try {
      await postService.deletePost(id);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export const postController = new PostController();
