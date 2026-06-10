import { parseExpression } from "cron-parser";

export function isValidCron(expression: string): boolean {
  try {
    parseExpression(expression);
    return true;
  } catch {
    return false;
  }
}
