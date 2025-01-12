"use server"

import { AddPostValues } from "@/utils/formValue"
import { db } from "@/utils/db";
import { getServerSession } from "next-auth";
import { getUserByEmail } from "@/utils/user";
import { authOptions } from '@/auth';

export const addpost = async (form: AddPostValues) => {

    const session = await getServerSession(authOptions);
    if (!session) {
        return {
            error: "No session detected"
        }
    }

    const email = session.user?.email;
    if (!email) {
        return {
            error: "No email found in session"
        }
    }
    const user = await getUserByEmail(email);
    if (!user) {
        return {
            error: "Error fetching user"
        }
    }

    const { title, price, description, bidEndDate, filePath } = form;
    try {
        const addpost = await db.post.create({
            data: {
                title: title,
                price: price,
                description: description,
                bidEndDate: bidEndDate,
                image: filePath,
                published: true,
                author: {
                    connect: {
                        id: user.id
                    }
                },
            }
        })
    } catch(error) {
        return {
            error: "Error creating a post"
        }
    }
    console.log("Added post: " + filePath)
    return {
        success: "Successfully added Post"
    }
}