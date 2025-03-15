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

        return res.status(200).json({ test });
    } catch (error) {
        console.error("Database error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
