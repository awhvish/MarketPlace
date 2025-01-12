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
    try {
        const user = await db.user.findUnique({
        where: {username}
        })
        return user;
    }
    catch{
        return null;
    }
}

export async function getUserWithPosts(username: string) {
    const user = await db.user.findUnique({
      where: {  username: username },
      include: { posts: true }, // Include user's posts
    });
    return user;
  }
  