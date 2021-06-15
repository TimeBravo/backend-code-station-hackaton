import authConfig from "@config/auth";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import AppError from "@shared/errors/AppError";

interface ITokenPayload {
  iat: number;

  exp: number;

  sub: string;
}

export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction): void {
  const authHeader = request.headers.authorization;

  /**

   * |Temporary

   */

  const twilioHeader = request.headers["x-twilio-signature"];

  if (twilioHeader) {
    request.user = {
      id: "twilio",
    };

    return next();
  }

  if (!authHeader) {
    throw new AppError("JWT token is missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as ITokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch (error) {
    throw new AppError("Invalid JWT token", 401);
  }
}
