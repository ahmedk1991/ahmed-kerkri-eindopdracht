import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "DELETE") return res.status(405).json({ message: "Method not allowed" });

    const { userId } = req.query;
    if (!userId || typeof userId !== "string") return res.status(400).json({ message: "Invalid user ID" });

    try {
        await db.delete(users).where(eq(users.id, userId));
        res.status(200).json({ message: "User deleted" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete user" });
    }
}