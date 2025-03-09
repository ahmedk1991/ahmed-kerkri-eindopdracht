
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const [user] = await db.select().from(users).where(eq(users.email, email));

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        res.setHeader(
            "Set-Cookie",
            `auth=${user.id}; Path=/; Max-Age=86400; HttpOnly; SameSite=Lax`
        );

        return res.status(200).json({ message: "Login successful", user: { id: user.id, name: user.username } });
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
