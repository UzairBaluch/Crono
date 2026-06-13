import { userRepository } from "../repositories/user.repository.js";
import { ApiError } from "../utils/ApiError.js";
export async function apiKey(req, res, next) {
    try {
        const header = req.headers["x-api-key"];
        const key = typeof header === "string"
            ? header
            : Array.isArray(header)
                ? header[0]
                : undefined;
        if (!key) {
            throw new ApiError("Unauthorized", 401);
        }
        const user = await userRepository.findByApiKey(key);
        if (!user) {
            throw new ApiError("Unauthorized", 401);
        }
        req.user = user;
        next();
    }
    catch (err) {
        next(err);
    }
}
