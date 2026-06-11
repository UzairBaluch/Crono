export type ApiSuccessResponse<T> = {
  success: true;
  data: T;
  message?: string;
};

export function success<T>(data: T, message?: string): ApiSuccessResponse<T> {
  return message !== undefined
    ? { success: true, data, message }
    : { success: true, data };
}
