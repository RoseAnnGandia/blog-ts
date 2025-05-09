import { z } from "zod";

export const CreateUserSchema = z
  .object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string(),
  })
  .strict();

export const UpdateUserSchema = z
  .object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
  })
  .strict();

export type CreateUserInput = z.infer<typeof CreateUserSchema>;

export type UpdateUserInput = z.infer<typeof UpdateUserSchema>;
