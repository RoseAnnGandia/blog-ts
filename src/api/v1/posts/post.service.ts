import { PostModel, PostType } from "./post.model";
import { CreatePostInput, UpdatePostInput } from "./post.types";
import { Types } from "mongoose";
import { createError } from "@utils/custom-error";

export class PostService {
  constructor(private readonly postModel: typeof PostModel) {
    this.postModel = postModel;
  }

  async getAllPosts(): Promise<PostType[]> {
    return this.postModel.find();
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
}

export const postService = new PostService(PostModel);
