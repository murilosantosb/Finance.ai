import { z } from "zod"

export const transactionSchema = z.object({
    userId: z.string(),
    title: z.string().min(3, "O título tem que conter mais de 3 caracteres."),
    type: z.enum(["Gasto", "Ganho", "Investimento", "Depósito", "Saque"]),
    category: z.enum(["Moradia", "Alimentação", "Transporte", "Saúde", "Lazer", "Outros"]).optional(),
    amount: z.number(),
    paymentMethod: z.enum(["Pix", "Cartão", "Boleto"]),
    date: z.preprocess((val) => {
        if(typeof val === "string" || typeof val === "number") {
            const parsedDate = new Date(val);
            return isNaN(parsedDate.getTime()) ? undefined : parsedDate;
        }
        return val;
    }, z.date()),
})