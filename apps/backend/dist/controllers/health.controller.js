import { getHealth } from "../services/health.service.js";
import { success } from "../utils/ApiResponse.js";
export const healthController = {
    get(req, res) {
        const result = getHealth();
        res.status(200).json(success(result));
    },
};
