import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/db";
import { users } from "@/db/schema";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const [existingUser] = await db.select().from(users).where(eq(users.email, email));
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [newUser] = await db.insert(users).values({
            username,
            email,
            password: hashedPassword,

        }).returning();

        return res.status(201).json({
            message: "User created",
            user: {
                id: newUser.id,
                email: newUser.email,
                username: newUser.username,
                createdAt: newUser.createdAt
            }
        });
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
