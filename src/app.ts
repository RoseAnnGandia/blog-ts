import express, { Router, Request, Response } from "express";
import { postRoutes } from "@api/v1/posts/post.routes";
import { errorHandler } from "@middlewares/error-handler.middleware";
import { userRoutes } from "@api/v1/users/user.routes";
import { authRoutes } from "@api/v1/auth/auth.routes";
import { authenticateToken } from "@middlewares/authentication.middleware";
const router = Router();

const app = express();

app.use(express.json());

router.get("/api", (req: Request, res: Response) => {
  res.json({ message: "Welcome to the Express + TypeScript Server!" });
});

app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/users", authenticateToken, userRoutes);

app.use("/api/v1/posts", authenticateToken, postRoutes);

app.use(errorHandler);

export default app;
