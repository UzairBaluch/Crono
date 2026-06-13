import type { Request, Response } from "express";
import { jobService } from "../services/job.service.js";
import { success } from "../utils/ApiResponse.js";

export const jobController = {
  async list(req: Request, res: Response) {
    const userId = req.user!.id;
    const jobs = await jobService.list(userId);
    res.status(200).json(success({ jobs }));
  },

  async getById(req: Request, res: Response) {
    const userId = req.user!.id;
    const jobId = req.params.id;
    const job = await jobService.getById(userId, jobId as string);
    res.status(200).json(success({ job }));
  },

  async create(req: Request, res: Response) {
    const userId = req.user!.id;
    const userPlan = req.user!.plan;
    const job = await jobService.create(userId, userPlan, req.body);
    res.status(201).json(success({ job }));
  },

  async update(req: Request, res: Response) {
    const userId = req.user!.id;
    const jobId = req.params.id;
    const job = await jobService.update(userId, jobId as string, req.body);
    res.status(200).json(success({ job }));
  },

  async remove(req: Request, res: Response) {
    const userId = req.user!.id;
    const jobId = req.params.id;
    const result = await jobService.remove(userId, jobId as string);
    res.status(200).json(success(result));
  },
};
