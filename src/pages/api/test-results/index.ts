import { db } from "@/db";
import { testResults } from "@/db/schema";
import { NextApiRequest, NextApiResponse } from "next";
import {eq} from "drizzle-orm";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        try {
            const {user_id, results, score} = req.body;

            if (!user_id || !results || typeof score !== "number") {
                console.log("Invalid request data received:", req.body);
                return res.status(400).json({message: "Invalid request data"});
            }

            const enrichedResults = results.map((r: any) => ({
                question: r.question,
                selected: r.selected,
                correct: r.correct,
                explanation: r.explanation || "No explanation provided.",
                category: r.category || "General",
            }));

            const [newTest] = await db
                .insert(testResults)
                .values({
                    user_id: String(user_id),
                    results: enrichedResults,
                    score: String(score),
                    createdAt: new Date(),
                })
                .returning();

            console.log("Test results saved successfully with ID:", newTest.id);
            return res.status(201).json({message: "Test results saved", testId: newTest.id});
        } catch (error) {
            console.error("Database Error:", error);
            return res.status(500).json({message: "Internal server error"});
        }
    }

    if (req.method === "GET") {
        try {
            const { userId } = req.query;

            const results = userId
                ? await db.select().from(testResults).where(eq(testResults.user_id, userId as string))
                : [];

            return res.status(200).json({ tests: results });
        } catch (error) {
            console.error("Database Error:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

}