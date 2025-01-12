import { db } from "./db";

  

export const getProducts = async () => {
    const currentDate = new Date().toISOString()
    const ongoingProducts = await db.post.findMany({
        where: {
            bidEndDate: {
                gte: currentDate, 
            },
        },
    })

    const previousProducts = await db.post.findMany({
        where: {
            bidEndDate: {
                lt: currentDate, 
            },
        },
    })

    return { ongoingProducts, previousProducts }
}


export async function getProductFromId(id: number) {
    try {
        const product = await db.post.findUnique({
            where: { id },
        });

        return product;
    } catch (error) {
        console.error('Error fetching product by ID:', error); 
        return null; 
    }
}
