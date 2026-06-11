import type { Request, Response, NextFunction } from "express";

export function apiKey(req: Request, res: Response, next: NextFunction) {
  next();
}
