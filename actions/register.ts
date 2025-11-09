"use server"

import { registerSchema } from "@/Schema/registerSchema"
import bcrypt from "bcryptjs";
import { db } from "@/utils/db";
import { getUserByEmail } from "@/utils/user";
import {FormValues} from "@/utils/formValue";


export const register = async (formData: FormValues) => {
    const validatedFields = await registerSchema.safeParseAsync(formData);

    if (!validatedFields.success) {
        return {error: "Invalid fields"};
    }

    const {name, email, username, password, country, phone, role } = formData;

    const existingUser = await getUserByEmail(email);

    if (existingUser){
        return  {error: "An account already exists with this Email"};
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
    catch (error) {
        console.error(error);
        return {error: "Error creating account"};
    }
}   