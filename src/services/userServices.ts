import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export async function getUserById(id: string) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user ?? null;
}


export async function getAllUsers() {
    return db.select().from(users);
}


export async function addUser(userData: { email: string; password: string; username: string }) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const [newUser] = await db.insert(users)
        .values({
            email: userData.email,
            password: hashedPassword,
            username: userData.username,
        })
        .returning();

    return newUser;
}


export async function updateUser(
    id: string,
    userData: Partial<{ email: string; password: string; username: string }>
) {
    if (userData.password) {
        userData.password = await bcrypt.hash(userData.password, 10);
    }

    const [updatedUser] = await db.update(users)
        .set(userData)
        .where(eq(users.id, id))
        .returning();

    return updatedUser;
}

export async function deleteUser(id: string) {
    await db.delete(users).where(eq(users.id, id));
    return { success: true, message: "User deleted successfully" };
}
