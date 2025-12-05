"use server"

import { registerSchema } from "@/Schema/registerSchema"
import bcrypt from "bcryptjs";
import { db } from "@/utils/db";
import { getUserByEmail, getUserByUsername } from "@/utils/user";
import {FormValues} from "@/utils/formValue";


export const register = async (formData: FormValues) => {
    const validatedFields = await registerSchema.safeParseAsync(formData);

    if (!validatedFields.success) {
        return {error: "Invalid fields"};
    }

    const {name, email, username, password, country, phone, role } = formData;

    // Check if email already exists
    const existingEmail = await getUserByEmail(email);
    if (existingEmail){
        return {error: "An account already exists with this email"};
    }

    // Check if username already exists
    const existingUsername = await getUserByUsername(username);
    if (existingUsername){
        return {error: "This username is already taken"};
    }

    try {
        await db.user.create({
            data: {
                name,
                email,
                username,
                phone,
                country,
                password: await bcrypt.hash(password, 10),
                role: role === "ARTIST" ? "ARTIST" : "USER",
            }
        })
        console.log("User created");
        return {success: "User created successfully"};
    }
    catch (error: any) {
        console.error(error);
        
        // Handle Prisma unique constraint errors
        if (error.code === 'P2002') {
            const target = error.meta?.target;
            if (target?.includes('username')) {
                return {error: "This username is already taken"};
            }
            if (target?.includes('email')) {
                return {error: "An account already exists with this email"};
            }
        }
        
        return {error: "Error creating account. Please try again."};
    }
}   