import { Types } from "mongoose";
import { Request } from "express";
import { createError } from "@utils/custom-error";
import { PostModel, PostType } from "./post.model";
import { CreatePostInput, UpdatePostInput } from "./post.types";

export class PostService {
  constructor(private readonly postModel: typeof PostModel) {
    this.postModel = postModel;
  }

  async getAllPosts(reqQuery: Request["query"]): Promise<PostType[]> {
    const { page = 1, limit = 10, sort = "DESC" } = reqQuery;
    const sortDirection = sort === "DESC" ? -1 : 1;

    return this.postModel
      .find()
      .skip((Number(page) - 1) * Number(limit)) // skip previous pages' posts
      .limit(Number(limit)) // limit the number of posts per page
      .sort({ createdAt: sortDirection }); // sort by createdAt
  }

  async getPostById(id: string | Types.ObjectId): Promise<PostType> {
    const post = await this.postModel.findById(id);

    if (!post) throw createError.notFound("Post not found");

    return post;
  }

  async createPost(postInput: CreatePostInput): Promise<PostType> {
    const newPost = new this.postModel(postInput);

    return newPost.save();
  }

  async updatePost(
    id: string | Types.ObjectId,
    authorId: string | Types.ObjectId,
    postInput: UpdatePostInput
  ): Promise<PostType> {
    const updatedPost = await this.postModel.findOneAndUpdate(
      { _id: id, authorId },
      postInput,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedPost)
      throw createError.forbidden("Not authorized to update this post");

    return updatedPost;
  }

  async deletePost(id: string | Types.ObjectId): Promise<{ message: string }> {
    const deletedPost = await this.postModel.findByIdAndDelete(id);

    if (!deletedPost) throw createError.notFound("Post not found");

    return {
      message: "Post deleted successfully",
    };
  }

  async getPostsByAuthorId(
    authorId: string | Types.ObjectId,
    reqQuery: Request["query"]
  ): Promise<PostType[]> {
    const { page = 1, limit = 10, sort = "DESC" } = reqQuery;
    const sortDirection = sort === "DESC" ? -1 : 1;

    const posts = await this.postModel
      .find({ authorId })
      .skip((Number(page) - 1) * Number(limit)) // skip previous pages' posts
      .limit(Number(limit)) // limit the number of posts per page
      .sort({ createdAt: sortDirection }); // sort by createdAt

    return posts;
  }
}

export const postService = new PostService(PostModel);
