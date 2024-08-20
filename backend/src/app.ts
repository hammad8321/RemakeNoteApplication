import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import noteRoutes from "./routes/notes";
import userRoutes from  "./routes/user"
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import session from "express-session"
import env from "./util/validateEnv";
import MongoStore from "connect-mongo";
import {   requiresAuth } from "./middleware/auth";
//import { requestAuth } from "./middleware/auth";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

/* This code snippet is setting up a session middleware in an Express application using the
`express-session` package. Here's what each option in the `app.use(session({}))` configuration is
doing: */
app.use(session({

  secret : env.SESSION_SECRET,
  resave:false ,
  saveUninitialized: false ,
  cookie :{
    maxAge: 60 * 60 * 1000 ,
  },
  rolling: true,
  store : MongoStore.create({
    mongoUrl : env.MONGO_CONNECTION_STRING
  }),
}));

app.use("/api/notes",requiresAuth, noteRoutes); // 
app.use("/api/users" ,userRoutes);

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
