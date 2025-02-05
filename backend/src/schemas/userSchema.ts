import { z } from "zod"


export const userSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    image: z.string().url().optional(),
    googleId: z.string().nullable(),
    balance: z.number().min(0).optional(),
    investment: z.number().min(0).optional(),
    revenue: z.number().min(0).optional(),
    expenses: z.number().optional(),
})