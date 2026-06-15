import type { Request, Response } from "express";
import { logService } from "../services/log.service.js";
import { success } from "../utils/ApiResponse.js";

export const logController = {
  listByJobId: async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const jobId = req.params.id;
    const logs = await logService.listByJobId(userId, jobId as string);
    res.status(200).json(success({ logs }));
  },
};
