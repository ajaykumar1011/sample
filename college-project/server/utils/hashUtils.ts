import { sign as jwtSign, verify as jwtVerify } from "jsonwebtoken";
import { hashSync, compareSync } from "bcryptjs";
const SECRET: string = "API_SECRET";
const ACCESS_TOKEN_LIFETIME = "365d";
const SALTROUNDS = 10;

//  Hash password
export function hashPassword(password: string) {
  try {
    return hashSync(password, SALTROUNDS);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

//  Compare Password
export function comparePassword(password: string, hash_password: string) {
  try {
    return compareSync(password, hash_password);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

//  Create JWT life time
export function createJWT(id: any) {
  return jwtSign(id, SECRET, { expiresIn: ACCESS_TOKEN_LIFETIME });
}

//  JWT VERIFY
export function verifyJWT(id: string) {
  try {
    return jwtVerify(id, SECRET, (err: any, decoded: any) => {
      if (err) {
        if (err.name == "TokenExpiredError") {
          throw new Error(`Token expired`);
        }
        if (err.name == "JsonWebTokenError") {
          throw new Error(`Invalid token`);
        }
      }
      return decoded;
    });
  } catch (err) {
    throw err;
  }
}
