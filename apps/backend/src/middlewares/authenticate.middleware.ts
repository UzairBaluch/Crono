import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { userRepository } from "../repositories/user.repository.js";
import { ApiError } from "../utils/ApiError.js";

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
      throw new ApiError("Unauthorized", 401);
    }

    const token = header.slice("Bearer ".length);
    const payload = jwt.verify(token, env.JWT_SECRET) as { userId: string };
    const user = await userRepository.findById(payload.userId);

    if (!user) {
      throw new ApiError("Unauthorized", 401);
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}
