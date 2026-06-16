import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { ApiError } from "../utils/ApiError.js";
import { generateApiKey } from "@crono/shared";
import { emailService } from "./email.service.js";
import { userRepository } from "../repositories/user.repository.js";
import type {
  RegisterInput,
  LoginInput,
  ForgotPasswordInput,
  ResetPasswordInput,
} from "../validations/auth.validation.js";

const PASSWORD_RESET_PURPOSE = "password_reset";

type PasswordResetPayload = {
  userId: string;
  purpose: typeof PASSWORD_RESET_PURPOSE;
};

function toSafeUser<T extends { password_hash: string }>(user: T) {
  const { password_hash: _, ...safeUser } = user;
  return safeUser;
}

export const authService = {
  async register(input: RegisterInput) {
    const existing = await userRepository.findByEmail(input.email);
    if (existing) {
      throw new ApiError("Email already in use", 409);
    }

    const password_hash = await bcrypt.hash(input.password, 10);
    const api_key = generateApiKey();
    const user = await userRepository.insertUser({
      email: input.email,
      password_hash,
      api_key,
    });

    const token = jwt.sign(
      { userId: user.id, email: user.email, plan: user.plan },
      env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    return { token, user: toSafeUser(user) };
  },

  async login(input: LoginInput) {
    const user = await userRepository.findByEmail(input.email);
    if (!user) {
      throw new ApiError("Invalid email or password", 401);
    }

    const valid = await bcrypt.compare(input.password, user.password_hash);
    if (!valid) {
      throw new ApiError("Invalid email or password", 401);
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, plan: user.plan },
      env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    return { token, user: toSafeUser(user) };
  },

  async getMe(userId: string) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new ApiError("Unauthorized", 401);
    }

    return toSafeUser(user);
  },

  async forgotPassword(input: ForgotPasswordInput) {
    const user = await userRepository.findByEmail(input.email);

    if (user) {
      const token = jwt.sign(
        { userId: user.id, purpose: PASSWORD_RESET_PURPOSE },
        env.JWT_SECRET,
        { expiresIn: "1h" },
      );

      const resetUrl = `${env.APP_URL}/reset-password?token=${encodeURIComponent(token)}`;

      await emailService.sendPasswordReset({
        to: user.email,
        resetUrl,
      });
    }

    return {
      message:
        "If an account exists for this email, password reset instructions were sent.",
    };
  },

  async resetPassword(input: ResetPasswordInput) {
    let payload: PasswordResetPayload;

    try {
      payload = jwt.verify(input.token, env.JWT_SECRET) as PasswordResetPayload;
    } catch {
      throw new ApiError("Invalid or expired reset link", 400);
    }

    if (payload.purpose !== PASSWORD_RESET_PURPOSE || !payload.userId) {
      throw new ApiError("Invalid or expired reset link", 400);
    }

    const user = await userRepository.findById(payload.userId);
    if (!user) {
      throw new ApiError("Invalid or expired reset link", 400);
    }

    const password_hash = await bcrypt.hash(input.password, 10);
    await userRepository.updatePassword(user.id, password_hash);

    return { message: "Password updated. You can sign in now." };
  },
};
