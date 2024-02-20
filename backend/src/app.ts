import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import noteRoutes from "./routes/notes";
import userRoutes from  "./routes/user"
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/notes", noteRoutes);
app.use("/api/users", userRoutes);

app.use((req, res, next) => {
  next(createHttpError(404, "End Point Not foud blabla"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "An Unknown error by user blabla";
  let statusCode = 500;

  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default app;
