import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export const validateZodSchema = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const parsedReq = schema.safeParse(req.body);

    if (!parsedReq.success) next(parsedReq.error);

    next();
  };
};
