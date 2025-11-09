import * as z from 'zod'


export const registerSchema = z.object({
    role: z.enum(['USER', 'ARTIST'], {
        required_error: "Role is required"
    }),
    name: z.string().min(2,{
        message: "First name is required"
    }),
    username: z.string().min(4,{
        message: "Last name is required"
    }),
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(6, {
        message:"Password should be atleast of 6 characters"
    }),
    phone: z.string().min(9, {
        message:"Phone number should be of atleast 10 digits"
    }),
    country: z.string().min(1, {
        message: "Location is required"
    })
})