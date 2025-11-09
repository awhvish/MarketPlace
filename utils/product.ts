import { db } from "./db";

  

export const getProducts = async () => {
    const currentDate = new Date().toISOString()
    try {
        const ongoingProducts = await db.post.findMany({
            where: {
                bidEndDate: {
                    gte: currentDate,
                },
            },
            include: {
                author: {
                    select: {
                        username: true
                    }
                }
            }
        })

        const previousProducts = await db.post.findMany({
            where: {
                bidEndDate: {
                    lt: currentDate,
                },
            },
            include: {
                author: {
                    select: {
                        username: true
                    }
                }
            }
        })

        const formatProduct = (product: any) => ({
            ...product,
            authorUserName: product.author.username,
            author: undefined
        })

        return { 
            ongoingProducts: ongoingProducts.map(formatProduct), 
            previousProducts: previousProducts.map(formatProduct) 
        }
    } catch (error) {
        console.error('getProducts DB error:', error);
        // Return empty lists in case DB is unreachable so dev server/page rendering continues
        return { ongoingProducts: [], previousProducts: [] };
    }
}


export async function getProductFromId(id: number) {
    try {
        const product = await db.post.findUnique({
            where: { id },
            include: {
                author: {
                    select: {
                        id: true,
                        username: true,
                        name: true,
                        role: true,
                        image: true
                    }
                }
            }
        });

        if (!product) {
            return null;
        }

        return {
            ...product,
            bidHistory: product.bidHistory as { userId: string; username: string; amount: number; timestamp: string; }[]
        };
    } catch (error) {
        console.error('Error fetching product by ID:', error); 
        throw new Error('Failed to fetch product');
    }
}
