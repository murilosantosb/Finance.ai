"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTransactionSchema = exports.transactionSchema = void 0;
const zod_1 = require("zod");
exports.transactionSchema = zod_1.z.object({
    userId: zod_1.z.string(),
    title: zod_1.z.string().min(3, "O título tem que conter mais de 3 caracteres."),
    financial_category: zod_1.z.enum(["GAIN", "SPENT", "INVESTMENT"]),
    category: zod_1.z.enum(["Moradia", "Alimentação", "Transporte", "Saúde", "Lazer", "Outros"]),
    amount: zod_1.z.number().min(10, "Aceitamos apenas transações a partir de 10 reais."),
    payment_method: zod_1.z.enum(["PIX", "CARD", "BILLET"]),
    date: zod_1.z.preprocess((val) => {
        if (typeof val === "string" || val instanceof Date) {
            const parsedDate = new Date(val);
            return isNaN(parsedDate.getTime()) ? undefined : parsedDate;
        }
        return val;
    }, zod_1.z.date()),
});
exports.updateTransactionSchema = zod_1.z.object({
    title: zod_1.z.string().min(3, "O título tem que conter mais de 3 caracteres."),
    payment_method: zod_1.z.enum(["PIX", "CARD", "BILLET"]),
    category: zod_1.z.enum(["Moradia", "Alimentação", "Transporte", "Saúde", "Lazer", "Outros"]),
    amount: zod_1.z.number().min(10, "Aceitamos apenas transações a partir de 10 reais."),
    date: zod_1.z.preprocess((val) => {
        if (typeof val === "string" || val instanceof Date) {
            const parsedDate = new Date(val);
            return isNaN(parsedDate.getTime()) ? undefined : parsedDate;
        }
        return val;
    }, zod_1.z.date()),
});
