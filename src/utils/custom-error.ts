export interface AppError extends Error {
  statusCode: number;
  type: string;
}

export class CustomError extends Error implements AppError {
  type: string;
  statusCode: number;

  constructor(type: string, message: string, statusCode: number) {
    super(message);
    this.type = type;
    this.statusCode = statusCode;
  }
}

export const createError = {
  notFound: (message: string = "Item not found.") =>
    new CustomError("NotFoundError", message, 404),

  validation: (message: string = "Invalid input data.") =>
    new CustomError("ValidationError", message, 400),

  unauthorized: (message: string = "Unauthorized access.") =>
    new CustomError("UnauthorizedError", message, 401),

  forbidden: (message: string = "Forbidden access.") =>
    new CustomError("ForbiddenError", message, 403),

  conflict: (
    message: string = "Conflict with the current state of the resource."
  ) => new CustomError("ConflictError", message, 409),
};
