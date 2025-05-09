import { Request, Response, NextFunction } from "express";
import { createError } from "@utils/custom-error";

export function validateRefreshTokenHeader(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  if (!authorization)
    throw createError.forbidden("Authorization header is missing");

  const refreshToken = authorization.split(" ")[1];

  res.locals.authUser = res.locals.authUser ?? {};
  res.locals.authUser.refreshToken = refreshToken;

  next();
}
