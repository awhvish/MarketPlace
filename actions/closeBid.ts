"use server"

import { db } from "@/utils/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { getProductFromId } from "@/utils/product";

export const closeBid = async (postId: number) => {
    const session = await getServerSession(authOptions);
    if (!session) {
        return { error: "Not authenticated" };
    }

    try {
        const post = await getProductFromId(postId);
        if (!post) {
            return { error: "Post not found" };
        }

        // Check if user is the artist/owner of the post
        if (post.authorId !== session.user.id) {
            return { error: "Not authorized to close this bid" };
        }

        // Close the bid
        await db.post.update({
            where: { id: postId },
            data: { bidsClosed: true }
        });

        return { success: "Bid closed successfully" };
    } catch (error) {
        console.error("Error in closeBid:", error);
        return { error: "Failed to close bid" };
    }
};