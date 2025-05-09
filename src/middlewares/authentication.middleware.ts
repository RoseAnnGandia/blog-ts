import { LocalResAuthUser, TokenPayload } from "@api/v1/auth/auth.types";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createError } from "@utils/custom-error";

dotenv.config();
const { TokenExpiredError } = jwt;

const ACCESS_TOKEN_SECRET: string = process.env.ACCESS_TOKEN_SECRET!;

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization;
  if (!authorization)
    return next(createError.forbidden("Authorization header is missing"));

  const token = authorization?.split(" ")[1];
  if (!token)
    return next(createError.forbidden("Authorization header is missing"));

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      if (err instanceof TokenExpiredError) {
        return next(createError.unauthorized("Token has expired"));
      }

      return next(
        createError.forbidden(err.message || "Invalid or expired token")
      );
    }

    const user = decoded as TokenPayload;

    if (!user?.userId)
      return next(
        createError.unauthorized("Invalid token: User ID is missing")
      );

    res.locals.authUser = user as LocalResAuthUser;
    next();
  });
};
