import express, { Router, Request, Response } from "express";
import { postRoutes } from "@api/v1/posts/post.routes";
import { connectToDB } from "config/db";
import { errorHandler } from "@middlewares/error-handler.middleware";
import { userRoutes } from "@api/v1/users/user.routes";
import { authRoutes } from "@api/v1/auth/auth.routes";
import { authenticateToken } from "@middlewares/authentication.middleware";
const router = Router();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

router.get("/api", (req: Request, res: Response) => {
  res.json({ message: "Welcome to the Express + TypeScript Server!" });
});

app.use("/api/v1/users", authenticateToken, userRoutes);

app.use("/api/v1/posts", authenticateToken, postRoutes);

app.use("/api/v1/auth", authRoutes);

app.use(errorHandler);

const start = async () => {
  try {
    await connectToDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

start();
