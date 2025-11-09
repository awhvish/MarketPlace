"use server"

import { loginSchema } from "@/Schema/loginSchema"
import bcrypt from "bcryptjs";
import { getUserByUsername } from "@/utils/user";
import { LoginFormValues } from "@/utils/formValue";
import { signIn } from '@/auth'

export const login = async (formData: LoginFormValues) => {
    try {
        const validatedFields = await loginSchema.safeParseAsync(formData);
        console.log("Validation result:", validatedFields);

        if (!validatedFields.success) {
            return { error: "Invalid fields" };
        }

        const { username, password } = formData;
        console.log("Login attempt for username:", username);

        const existingUser = await getUserByUsername(username);
        console.log("User found in database:", !!existingUser);

        if (!existingUser) {
            return { error: "No account exists with this username" };
        }

        const passwordMatch = await bcrypt.compare(password, existingUser.password);
        console.log("Password match result:", passwordMatch);

        if (!passwordMatch) {
            return { error: "Invalid password" };
        }

        const result = await signIn('credentials', {
            username,
            password,
            callbackUrl: `/user/profile/${username}`
        },
        );
        
        console.log("SignIn result:", result);

        if (result?.error) {
            return { error: "Invalid credentials" };
        }

        return { success: "User logged in successfully" };
    } catch (error) {
        console.error("Login error:", error);
        return { error: "Authentication failed. Please try again." };
    }
}