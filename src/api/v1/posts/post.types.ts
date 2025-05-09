import { z } from "zod";

export const CreatePostSchema = z
  .object({
    title: z.string(),
    content: z.string(),
  })
  .strict();

export const UpdatePostSchema = z
  .object({
    title: z.string().optional(),
    content: z.string().optional(),
  })
  .strict();

export type CreatePostInput = z.infer<typeof CreatePostSchema> & {
  authorId: string;
};

export type UpdatePostInput = z.infer<typeof UpdatePostSchema>;
