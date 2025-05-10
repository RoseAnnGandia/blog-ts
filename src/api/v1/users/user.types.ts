import { z } from "zod";
import { PasswordSchema } from "../auth/auth.types";

export const CreateUserSchema = z
  .object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().email({ message: "Invalid email address." }),
    password: PasswordSchema,
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
