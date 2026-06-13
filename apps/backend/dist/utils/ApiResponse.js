export function success(data, message) {
    return message !== undefined
        ? { success: true, data, message }
        : { success: true, data };
}
