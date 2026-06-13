export function validate(schema, source) {
    return (req, res, next) => {
        const result = schema.safeParse(req[source]);
        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: result.error.message,
            });
        }
        req[source] = result.data;
        next();
    };
}
