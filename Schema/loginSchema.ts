import * as z from 'zod';


export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(6, {
        message: "Password should be atleast 8 characters"
    }),
})