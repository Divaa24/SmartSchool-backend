import express, { Application, Request, Response } from "express";
import cors from "cors";
import { globalErrorHandler } from "./middlewares/error.middleware";
import userRoutes from "./routes/user.routes";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import authRoutes from "./routes/auth.routes";

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "SmartSchool API is running smoothly! 🚀",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use(globalErrorHandler);

export default app;
