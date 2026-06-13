export type ApiSuccessResponse<T> = {
    success: true;
    data: T;
    message?: string;
};
export declare function success<T>(data: T, message?: string): ApiSuccessResponse<T>;
//# sourceMappingURL=ApiResponse.d.ts.map