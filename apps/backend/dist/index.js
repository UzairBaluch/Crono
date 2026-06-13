import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import apiRoutes from "./routes/index.js";
import { requestId } from "./middlewares/requestId.middleware.js";
import { errorHandler } from "./middlewares/error.middleware.js";
function notFoundHandler(req, res) {
    res.status(404).json({ success: false, message: "Not found" });
}
const app = express();
app.use(cors({ origin: env.APP_URL }));
app.use(express.json());
app.use(requestId);
app.use("/api", apiRoutes);
app.use(notFoundHandler);
app.use(errorHandler);
app.listen(env.PORT, () => console.log(`API on :${env.PORT}`));
