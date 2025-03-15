import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/db";
import { testResults } from "@/db/schema";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            const results = await db.select().from(testResults);
            return res.status(200).json({ tests: results });
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    if (req.method === "POST") {
        try {
            const { user_id, results, score } = req.body;

            if (!user_id || !results || typeof score !== "number") {
                return res.status(400).json({ message: "Invalid request data" });
            }

            const [newTest] = await db
                .insert(testResults)
                .values({
                    user_id,
                    results,
                    score,
                    createdAt: new Date(),
                })
                .returning();

            return res.status(201).json({ message: "Test results saved", testId: newTest.id });
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    return res.status(405).json({ message: "Method not allowed" });
}
