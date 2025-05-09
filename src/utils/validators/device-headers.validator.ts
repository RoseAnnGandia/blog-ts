import { Request, Response, NextFunction } from "express";
import { createError } from "@utils/custom-error";

export function validateDeviceIdHeader(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const deviceId = req.headers["device-id"];
  if (!deviceId) throw createError.forbidden("Device ID header is missing");

  res.locals.authUser = res.locals.authUser ?? {};
  res.locals.authUser.deviceId = deviceId;

  next();
}
