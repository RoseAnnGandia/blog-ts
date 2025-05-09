import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { TokenPayload } from "./auth.types";
import { createError } from "@utils/custom-error";
import dotenv from "dotenv";

dotenv.config();

export class TokenService {
  private static ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
  private static REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;
  private static BCRYPT_SALT_ROUNDS = 10;

  static generateAccessToken(userId: string): string {
    return jwt.sign({ userId }, this.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
  }

  static generateRefreshToken(userId: string): string {
    return jwt.sign({ userId }, this.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
  }

  static async hashToken(token: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.BCRYPT_SALT_ROUNDS);
    return await bcrypt.hash(token, salt);
  }

  static async verifyHashedToken(token: string, hashedToken: string) {
    try {
      return await bcrypt.compare(token, hashedToken);
    } catch (error) {
      throw createError.forbidden("Invalid refresh token");
    }
  }

  static verifyAccessToken(token: string): TokenPayload {
    try {
      return jwt.verify(token, this.ACCESS_TOKEN_SECRET) as TokenPayload;
    } catch (error) {
      throw createError.unauthorized("Invalid access token");
    }
  }

  static verifyRefreshToken(token: string): TokenPayload {
    try {
      return jwt.verify(token, this.REFRESH_TOKEN_SECRET) as TokenPayload;
    } catch (error) {
      throw createError.unauthorized("Invalid refresh token");
    }
  }
}
