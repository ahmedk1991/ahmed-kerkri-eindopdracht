import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/db";
import { testResults } from "@/db/schema";
import { eq } from "drizzle-orm";

interface QuestionResult {
    question: string;
    selected: string | null;
    correct: string;
    category: string;
    explanation: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    try {
        const test = await db
            .select()
            .from(testResults)
            .where(eq(testResults.id, id as string))
            .then((rows) => rows[0]);

        if (!test) {
            return res.status(404).json({ message: "Test not found" });
        }

        console.log(" Retrieved test data:", test);

        if (!Array.isArray(test.results)) {
            throw new Error("Invalid test results format");
        }

        const processedResults = (test.results as QuestionResult[]).map((q) => ({
            ...q,
            category: q.category ?? "General",
            explanation: q.explanation ?? "No explanation provided.",
        }));

        return res.status(200).json({ test: { ...test, results: processedResults } });
    } catch (error) {
        console.error("Database error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
