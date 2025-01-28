import { z } from "zod"


export const userSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    image: z.string().url().optional(),
    googleId: z.string().nullable()
})