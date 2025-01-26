import { z } from "zod"


export const userSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    image: z.string(),
    googleId: z.string()
})