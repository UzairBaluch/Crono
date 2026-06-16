import { Router } from "express";
import { authController } from "../../controllers/auth.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { authenticate } from "../../middlewares/authenticate.middleware.js";
import { apiKey } from "../../middlewares/apiKey.middleware.js";
import { registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema } from "../../validations/auth.validation.js";

const router = Router();

router.post(
  "/register",
  validate(registerSchema, "body"),
  asyncHandler(authController.register),
);
router.post(
  "/login",
  validate(loginSchema, "body"),
  asyncHandler(authController.login),
);
router.get("/me", authenticate, asyncHandler(authController.me));
router.get("/me-key", apiKey, asyncHandler(authController.me));
router.post(
  "/forgot-password",
  validate(forgotPasswordSchema, "body"),
  asyncHandler(authController.forgotPassword),
);
router.post(
  "/reset-password",
  validate(resetPasswordSchema, "body"),
  asyncHandler(authController.resetPassword),
);

export default router;
