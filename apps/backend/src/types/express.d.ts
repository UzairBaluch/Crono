import type { User } from "@crono/db/types";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export {};
