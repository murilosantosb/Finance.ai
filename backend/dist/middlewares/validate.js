"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDataSchema = void 0;
const zod_1 = require("zod");
const validateDataSchema = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            console.log("Dados recebidos para validação:", req.body);
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                res.status(400).json({
                    errors: error.errors.map(err => ({
                        path: err.path,
                        message: err.message,
                    })),
                });
            }
            next(error);
        }
    };
};
exports.validateDataSchema = validateDataSchema;
