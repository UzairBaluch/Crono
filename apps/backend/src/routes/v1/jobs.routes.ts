import { Router } from "express";
import { jobController } from "../../controllers/job.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { authenticate } from "../../middlewares/authenticate.middleware.js";
import {
  createJobSchema,
  updateJobSchema,
  jobIdParamSchema,
} from "../../validations/job.validation.js";

const router = Router();

router.use(authenticate);

router.get("/", asyncHandler(jobController.list));

router.get(
  "/:id",
  validate(jobIdParamSchema, "params"),
  asyncHandler(jobController.getById),
);

router.post(
  "/",
  validate(createJobSchema, "body"),
  asyncHandler(jobController.create),
);

router.patch(
  "/:id",
  validate(jobIdParamSchema, "params"),
  validate(updateJobSchema, "body"),
  asyncHandler(jobController.update),
);

router.delete(
  "/:id",
  validate(jobIdParamSchema, "params"),
  asyncHandler(jobController.remove),
);

export default router;
