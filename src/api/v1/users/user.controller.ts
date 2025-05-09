import { Request, Response, NextFunction } from "express";
import { userService } from "./user.service";
import { UserType } from "./user.model";
import { UpdateUserInput } from "./user.types";

export class UserController {
  async getAllUsers(
    req: Request,
    res: Response<UserType[]>,
    next: NextFunction
  ) {
    try {
      const users = await userService.getAllUsers();

      res.json(users);
    } catch (error) {
      next(error);
    }
  }

  async getUserById(
    req: Request<{ id: string }>,
    res: Response<UserType>,
    next: NextFunction
  ) {
    try {
      const updatedUser = await userService.getUserById(req.params.id);

      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(
    req: Request<{ id: string }, {}, UpdateUserInput>,
    res: Response<UserType>,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;

      const updatedUser = await userService.updateUser(id, req.body);

      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(
    req: Request<{ id: string }>,
    res: Response<{ message: string }>,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;

      await userService.deleteUser(id);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController();
