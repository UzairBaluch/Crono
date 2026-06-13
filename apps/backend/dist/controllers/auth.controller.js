import { authService } from "../services/auth.service.js";
import { success } from "../utils/ApiResponse.js";
export const authController = {
    async register(req, res) {
        const result = await authService.register(req.body);
        res.status(201).json(success(result));
    },
    async login(req, res) {
        const result = await authService.login(req.body);
        res.status(200).json(success(result));
    },
    async me(req, res) {
        const user = await authService.getMe(req.user.id);
        res.status(200).json(success({ user }));
    },
};
