import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/db";
import { testResults } from "@/db/schema";
import { eq } from "drizzle-orm";

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

        const processedResults = test.results.map((q) => ({
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
