import { z } from "zod"


export const userSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    image: z.string().url().optional(),
    googleId: z.string().nullable(),
    balance: z.number().min(0),
    investment: z.number().min(0),
    revenue: z.number().min(0),
    expenses: z.number(),
})