import { Router } from "express";
import { userController } from "./user.controller";
import { validateZodSchema } from "@utils/validators/zon-schema.validator";
import { UpdateUserSchema } from "./user.types";

const router = Router();

router.get("/", userController.getAllUsers);

router.get("/:id", userController.getUserById);

router.put(
  "/:id",
  validateZodSchema(UpdateUserSchema),
  userController.updateUser
);

router.delete("/:id", userController.deleteUser);

export const userRoutes = router;
