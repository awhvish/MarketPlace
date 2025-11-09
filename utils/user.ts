import { db } from "./db"

export async function getUserByEmail(email:string){
    try {
        const user = await db.user.findUnique({
        where: {email}
        }) 
        return user;
    }
    catch{
        return null;
    }
}

export async function getUserById(id:string){
    try {
        const user = await db.user.findUnique({
        where: {id}
        })
        return user;
    }
    catch{
        return null;
    }
}

export async function getUserByUsername(username:string){
    if (!username) {
        throw new Error('Username is required');
    }

    try {
        // Try exact match first
        let user = await db.user.findUnique({
            where: { username },
            include: {
                posts: true
            }
        });

        // If no exact match, try removing underscores
        if (!user) {
            console.log('Trying alternative username search for:', username);
            user = await db.user.findFirst({
                where: {
                    OR: [
                        { username },
                        { username: username.replace(/_/g, '') },
                        { username: username.toLowerCase() }
                    ]
                },
                include: {
                    posts: true
                }
            });
        }
        
        if (!user) {
            console.log('No user found for username:', username);
            // List all users for debugging
            const allUsers = await db.user.findMany({
                select: { username: true }
            });
            console.log('Available usernames:', allUsers.map((u: { username: string }) => u.username));
            return null;
        }
        
        return user;
    } catch(error) {
        console.error('Error in getUserByUsername:', error);
        throw new Error('Failed to fetch user from database');
    }
}

export async function getUserWithPosts(username: string) {
    const user = await db.user.findUnique({
      where: {  username: username },
      include: { posts: true }, // Include user's posts
    });
    return user;
  }
  