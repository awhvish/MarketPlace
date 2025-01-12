"use server"

import { db } from "@/utils/db";
import { getProductFromId } from "@/utils/product";

export const increaseBid = async (newBid: number, id: number) => {
    if (!id || typeof id !== "number") {
        console.error("Invalid ID provided");
        return { error: "Invalid product ID" };
    }

    try {
        const getPost = await getProductFromId(id);

        if (!getPost) {
            console.error("Post not found for ID:", id);
            return { error: "An unknown error occurred. Please try again later." };
        }

        if (newBid > Number(getPost.price)) {
            const updatePrice = await db.post.update({
                where: { id },
                data: { price: newBid.toString() },
            });

            if (!updatePrice) {
                return { error: "Error updating price" };
            }

            return { success: "Successfully updated price" };
        } else {
            return { error: "New bid must be higher than the current price" };
        }
    } catch (error) {
        console.error("Error in increaseBid:", error);
        return { error: "Internal server error" };
    }
};
