import * as z from 'zod';


export const loginSchema = z.object({
    username: z.string({
        message: "Username is required"
    }),
    password: z.string().min(6, {
        message: "Password should be atleast 8 characters"
    }),
})