import * as express from "express";
import { Application, Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import * as authRouter from "./controllers/auth.controller";
const app: Application = express();
const { BAD_REQUEST, INTERNAL_SERVER_ERROR } = StatusCodes;

app.use(`/admin`, authRouter);

// Error handler for the application
// Error handler for the application
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  const { code } = error as any;
  if (code && code >= 500) {
    res.status(INTERNAL_SERVER_ERROR).send({ errors: [{ error: error.message || (error as any).error }] });
  } else {
    res.status(code || BAD_REQUEST).send({ errors: [{ error: error.message || (error as any).error }] });
  }
});

export = app;
