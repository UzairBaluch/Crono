import type { Request, Response } from "express";
import { getHealth } from "../services/health.service.js";
import { success } from "../utils/ApiResponse.js";

export const healthController = {
  get(req: Request, res: Response) {
    const result = getHealth();
    res.status(200).json(success(result));
  },
};
