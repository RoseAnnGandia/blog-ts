import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { zodInputErrorHandler } from "../utils/zod-error-handler";
import { AppError } from "../utils/custom-error";

const errorMap: Record<string, number> = {
  NotFoundError: 404,
  ValidationError: 400,
  UnauthorizedError: 401,
  ForbiddenError: 403,
  ConflictError: 409,
};

export function errorHandler(
  err: AppError | ZodError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // handle Zod validation errors directly
  if (err instanceof ZodError) {
    const zodError = zodInputErrorHandler(err);
    res.status(400).json(zodError);
    return;
  }

  // check if the error is a known CustomError
  const statusCode = err.statusCode || errorMap[err.type] || 500;
  const message = err.message || "An unexpected error occurred.";

  res.status(statusCode).json({
    type: err.type || "InternalServerError",
    message,
  });
}
