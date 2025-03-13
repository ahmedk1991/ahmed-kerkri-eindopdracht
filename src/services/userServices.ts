import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

// ✅ Get all users
export const getAllUsers = async () => {
    return db.select().from(users);
};

export const getUserById = async (id: string) => {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user ?? null;
};


export const addUser = async (newUser: { username: string; email: string; password: string }) => {
    return db.insert(users).values(newUser).returning();
};


export const updateUser = async (id: string, updatedUser: Partial<{ username: string; email: string; password: string }>) => {
    return db.update(users).set(updatedUser).where(eq(users.id, id)).returning();
};


export const deleteUser = async (id: string) => {
    return db.delete(users).where(eq(users.id, id)).returning();
};
