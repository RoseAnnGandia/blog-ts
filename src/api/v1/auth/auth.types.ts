import { z } from "zod";

export const SigninSchema = z
  .object({
    email: z.string(),
    password: z.string(),
  })
  .strict();

export const ChangePassSchema = z
  .object({
    oldPassword: z.string().min(1, "Old password cannot be empty"),
    newPassword: z.string().min(1, "New password cannot be empty"),
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
