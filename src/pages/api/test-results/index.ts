import { db } from "@/db";
import { testResults } from "@/db/schema";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        try {
            const { user_id, results, score } = req.body;

            if (!user_id || !results || typeof score !== "number") {
                console.log("Invalid request data:", req.body);
                return res.status(400).json({ message: "Invalid request data" });
            }

            const enrichedResults = results.map((r) => ({
                question: r.question,
                selected: r.selected,
                correct: r.correct,
                category: r.category ?? "General",  // Ensure category is stored
                explanation: r.explanation ?? "No explanation provided.",  // Ensure explanation is stored
            }));

            console.log("📥 Storing in DB:", enrichedResults); // Debugging

            const [newTest] = await db
                .insert(testResults)
                .values({
                    user_id,
                    results: enrichedResults,
                    score,
                    createdAt: new Date(),
                })
                .returning();

            console.log("Test saved with ID:", newTest.id);
            return res.status(201).json({ message: "Test results saved", testId: newTest.id });
        } catch (error) {
            console.error(" Database Error:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    if (req.method === "GET") {
        try {
            const results = await db.select().from(testResults);
            console.log(" Retrieved test results:", results);
            return res.status(200).json({ tests: results });
        } catch (error) {
            console.error("Database Error:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    return res.status(405).json({ message: "Method not allowed" });
}
