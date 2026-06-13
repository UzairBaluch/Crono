import { randomUUID } from "node:crypto";
export function requestId(req, res, next) {
    const header = req.headers["x-request-id"];
    const id = typeof header === "string" ? header : Array.isArray(header) ? header[0] : randomUUID();
    req.id = id;
    res.setHeader("x-request-id", id);
    next();
}
