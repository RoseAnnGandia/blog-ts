import { Schema, model, InferSchemaType } from "mongoose";

const postSchema = new Schema(
  {
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

postSchema.index({ authorId: 1 });

export type PostType = InferSchemaType<typeof postSchema>;
export const PostModel = model<PostType>("Post", postSchema);
