import { Request, Response, NextFunction } from "express";
import { authService } from "./auth.service";
import { UserType } from "../users/user.model";
import { CreateUserInput } from "../users/user.types";
import { AuthTokens } from "./auth.types";

export class AuthController {
  async signup(
    req: Request<{}, {}, CreateUserInput>,
    res: Response<UserType>,
    next: NextFunction
  ) {
    try {
      const createdUser = await authService.signup(req.body);

      res.status(201).json(createdUser);
    } catch (error) {
      next(error);
    }
  }

  async signin(req: Request, res: Response<AuthTokens>, next: NextFunction) {
    try {
      const deviceId = res.locals.authUser.deviceId;

      const tokens = await authService.signin({
        ...req.body,
        deviceId,
      });

      res.json(tokens);
    } catch (error) {
      next(error);
    }
  }

  async signout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken, deviceId } = res.locals.authUser;

      await authService.signout({
        refreshToken,
        deviceId,
      });

      res.json({ type: "Success", message: "User signed out successfully" });
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken, deviceId } = res.locals.authUser;
      const newTokens = await authService.refreshToken(refreshToken, deviceId);

      res.json(newTokens);
    } catch (error) {
      next(error);
    }
  }

  async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = res.locals.authUser;
      const { oldPassword, newPassword } = req.body;

      await authService.changePassword({ userId, oldPassword, newPassword });

      res.json({ type: "Success", message: "Password changed successfully" });
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
