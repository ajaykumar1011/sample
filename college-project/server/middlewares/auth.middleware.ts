import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { dbQuery } from "../db";
import { APIError, getFormattedError } from "../utils/errorHandler";
import { comparePassword, createJWT } from "../utils/hashUtils";
const { OK } = StatusCodes;

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { success, error, resp } = await dbQuery(
      `SELECT * from admins WHERE email='${req.body.email.toLowerCase()}'`
    );
    if (success) {
      if (!comparePassword(req.body.password, resp[0].password)) {
        throw new APIError(`Invalid credentials`, 401);
      }
      const jwtToken = createJWT({ email: req.body.email.toLowerCase() });
      res.status(OK).send({ token: jwtToken });
    } else {
      throw new APIError(error);
    }
  } catch (error) {
    next(getFormattedError(error));
  }
}
