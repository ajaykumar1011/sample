import { Request, Response, NextFunction } from "express";
import { APIError } from "./errorHandler";
import { verifyJWT } from "./hashUtils";
import { Auth } from "./messages";

function getBearerToken(req: Request) {
  let bearerToken: string = (
    req.query.token
      ? req.query.token
      : (req.headers.authorization || "").substring(7, (req.headers.authorization || "").length)
  ) as string;
  if (!bearerToken) {
    throw new APIError(Auth.AUTH_FAILED, 401);
  }
  return bearerToken;
}

export async function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    let bearerToken: string = getBearerToken(req);
    const tokenObj: any = verifyJWT(bearerToken);
    if (tokenObj.expires) {
      return next(new APIError(`Token expired`, 401));
    }
    res.locals.token = bearerToken;
    next();
  } catch (error) {
    return next(new APIError(error, 401));
  }
}
