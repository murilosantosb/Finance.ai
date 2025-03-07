import { z } from "zod"

export const transactionSchema = z.object({
    userId: z.string(),
    title: z.string().trim().min(3, "O título deve ter pelo menos 3 caracteres"),
    financial_category: z.enum(["GAIN", "SPENT", "INVESTMENT"]),
    category: z.enum(["Moradia", "Alimentação", "Transporte", "Saúde", "Lazer", "Outros"]),
    amount: z.coerce.number().min(10, "O valor deve ser no mínimo R$ 10.00").or(z.null()).or(z.undefined()),
    payment_method: z.enum(["PIX", "CARD", "BILLET"]),
    date: z.coerce.date(),
})

export const updatedTransactionSchema = z.object({
    userId: z.string(),
    title: z.string().trim().min(3, "O título deve ter pelo menos 3 caracteres"),
    category: z.enum(["Moradia", "Alimentação", "Transporte", "Saúde", "Lazer", "Outros"]),
    amount: z.coerce.number().min(10, "O valor deve ser no mínimo R$ 10.00").or(z.null()).or(z.undefined()),
    payment_method: z.enum(["PIX", "CARD", "BILLET"]),
    date: z.coerce.date(),
    _id: z.string().optional(),
});