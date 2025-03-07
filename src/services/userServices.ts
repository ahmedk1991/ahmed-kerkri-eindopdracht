import {db} from "@/db";
import {users} from "@/db/schema";


export const getAllUsers = async () => {
    return db.select().from(users);
};


export const getUserById = async (id: string) => {
    return db.select().from(users).where(users.id.eq(id));
};


export const addUser = async (newUser) => {
    await db.insert(users).values(newUser);
};


export const updateUser = async (id: string, updatedUser) => {
    await db.update(users).set(updatedUser).where(users.id.eq(id));
};


export const deleteUser = async (id: string) => {
    await db.delete(users).where(users.id.eq(id));
};
