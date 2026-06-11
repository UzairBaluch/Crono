import cronParser from "cron-parser";

export function isValidCron(expression: string): boolean {
  try {
    cronParser.parseExpression(expression);
    return true;
  } catch {
    return false;
  }
}
