import * as z from 'zod'


export const registerSchema = z.object({
    FirstName: z.string().min(1,{
        message: "First name is required"
    }),
    LastName: z.string().min(1,{
        message: "Last name is required"
    }),
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(6, {
        message:"Password should be atleast of 6 characters"
    })
})

