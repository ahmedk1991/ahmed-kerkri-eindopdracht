import { db } from "@/db";
import { users, testResults } from "@/db/schema";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") return res.status(405).json({ message: "Method not allowed" });

    try {
        const allUsers = await db.select().from(users);
        const allTests = await db.select().from(testResults);
        res.status(200).json({ users: allUsers, testResults: allTests });
    } catch (error) {
        res.status(500).json({ message: "Error fetching data" });
    }
}