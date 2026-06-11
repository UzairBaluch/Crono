import { randomUUID } from "node:crypto";
import type { Request, Response, NextFunction } from "express";

export function requestId(req: Request, res: Response, next: NextFunction) {
  const header = req.headers["x-request-id"];
  const id =
    typeof header === "string" ? header : Array.isArray(header) ? header[0] : randomUUID();

  req.id = id;
  res.setHeader("x-request-id", id);
  next();
}
