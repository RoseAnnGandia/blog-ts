import { Router } from "express";
import { authController } from "./auth.controller";
import { validateZodSchema } from "@utils/validators/zon-schema.validator";
import { CreateUserSchema } from "../users/user.types";
import { ChangePassSchema, SigninSchema } from "./auth.types";
import { validateDeviceIdHeader } from "@utils/validators/device-headers.validator";
import { validateRefreshTokenHeader } from "@utils/validators/auth-headers-validator";
import { authenticateToken } from "@middlewares/authentication.middleware";

const router = Router();

router.post(
  "/signup",
  validateZodSchema(CreateUserSchema),
  authController.signup
);

router.post(
  "/signin",
  validateZodSchema(SigninSchema),
  validateDeviceIdHeader,
  authController.signin
);

router.post(
  "/signout",
  validateDeviceIdHeader,
  validateRefreshTokenHeader,
  authController.signout
);

router.post(
  "/refresh",
  validateDeviceIdHeader,
  validateRefreshTokenHeader,
  authController.refreshToken
);

router.post(
  "/change-password",
  validateZodSchema(ChangePassSchema),
  authenticateToken,
  authController.changePassword
);

export const authRoutes = router;
