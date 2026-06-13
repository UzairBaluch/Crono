import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { ApiError } from "../utils/ApiError.js";
import { generateApiKey } from "@crono/shared";
import { userRepository } from "../repositories/user.repository.js";
function toSafeUser(user) {
    const { password_hash: _, ...safeUser } = user;
    return safeUser;
}
export const authService = {
    async register(input) {
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
        const token = jwt.sign({ userId: user.id, email: user.email, plan: user.plan }, env.JWT_SECRET, { expiresIn: "7d" });
        return { token, user: toSafeUser(user) };
    },
    async login(input) {
        const user = await userRepository.findByEmail(input.email);
        if (!user) {
            throw new ApiError("Invalid email or password", 401);
        }
        const valid = await bcrypt.compare(input.password, user.password_hash);
        if (!valid) {
            throw new ApiError("Invalid email or password", 401);
        }
        const token = jwt.sign({ userId: user.id, email: user.email, plan: user.plan }, env.JWT_SECRET, { expiresIn: "7d" });
        return { token, user: toSafeUser(user) };
    },
    async getMe(userId) {
        const user = await userRepository.findById(userId);
        if (!user) {
            throw new ApiError("Unauthorized", 401);
        }
        return toSafeUser(user);
    },
};
