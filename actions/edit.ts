"use server";

import { FormValues } from "@/utils/formValue";
import { getUserByEmail } from "@/utils/user";
import bcrypt from "bcryptjs";
import { registerSchema } from "@/Schema/registerSchema";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { db } from "@/utils/db";

export const edit = async (formData: FormValues) => {
    const validatedFields = await registerSchema.safeParseAsync(formData);
    if (!validatedFields.success) {
        return { error: "Invalid field data" };
    }

    const user = await getUserByEmail(formData.email);
    if (!user) {
        return { error: "User not found" };
    }

    const validatePassword = await bcrypt.compare(formData.password, user.password);
    if (!validatePassword) {
        return { error: "Invalid Password" };
    }



    try {
        const updateUser = await db.user.update({
            where: { email: formData.email },
            data: {
                name: formData.name,
                username: formData.username,
                phone: formData.phone,
                country: formData.country,
                role: formData.role,
            },
        });
        if (!updateUser) {
            return { error: "Error updating user" };
        }
        console.log("Updating User: Success");
        return { success: "Successfully updated user!" };
    } catch (err) {
        console.log("Error updating user:", err);
        return { error: "Database error" };
    }
};
