import { z } from "zod"

export const transactionSchema = z.object({
    userId: z.string(),
    title: z.string().min(3, "O título tem que conter mais de 3 caracteres."),
    financial_category: z.enum(["GAIN", "SPENT", "INVESTMENT"]),
    category: z.enum(["Moradia", "Alimentação", "Transporte", "Saúde", "Lazer", "Outros"]),
    amount: z.number().min(10, "Aceitamos apenas transações a partir de 10 reais."),
    payment_method: z.enum(["PIX", "CARD", "BILLET"]),
    date: z.preprocess((val) => {
        if(typeof val === "string" || val instanceof Date) {
            const parsedDate = new Date(val);
            return isNaN(parsedDate.getTime()) ? undefined : parsedDate;
        }
        return val;
    }, z.date()),
});

export const updateTransactionSchema = z.object({
    title: z.string().min(3, "O título tem que conter mais de 3 caracteres."),
    payment_method: z.enum(["PIX", "CARD", "BILLET"]),
    category: z.enum(["Moradia", "Alimentação", "Transporte", "Saúde", "Lazer", "Outros"]),
    amount: z.number().min(10, "Aceitamos apenas transações a partir de 10 reais."),
    date: z.preprocess((val) => {
        if(typeof val === "string" || val instanceof Date) {
            const parsedDate = new Date(val);
            return isNaN(parsedDate.getTime()) ? undefined : parsedDate;
        }
        return val;
    }, z.date()),
});