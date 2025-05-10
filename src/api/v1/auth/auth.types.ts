import { z } from "zod";

export const PasswordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long.")
  .max(20, "Password cannot exceed 20 characters.")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
  .regex(/[0-9]/, "Password must contain at least one number.")
  .regex(/[@$!%*?&#]/, "Password must contain at least one special character.");

export const SigninSchema = z
  .object({
    email: z.string(),
    password: z.string(),
  })
  .strict();

export const ChangePassSchema = z
  .object({
    oldPassword: z.string().min(1, "New password cannot be empty"),
    newPassword: PasswordSchema,
  })
  .strict();

export type SigninInput = z.infer<typeof SigninSchema> & {
  deviceId: string;
};

export type ChangePassInput = z.infer<typeof ChangePassSchema> & {
  userId: string;
};

export interface TokenPayload {
  userId: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface SignoutInput {
  refreshToken: string;
  deviceId: string;
}

export interface LocalResAuthUser extends TokenPayload {
  userId: string;
  deviceId: string;
  refreshToken: string;
}
