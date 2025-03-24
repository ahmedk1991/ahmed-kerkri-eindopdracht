import { db } from "@/db";
import { testResults } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "DELETE") return res.status(405).json({ message: "Method not allowed" });

    const { testId } = req.query;
    if (!testId || typeof testId !== "string") return res.status(400).json({ message: "Invalid test ID" });

    try {
        await db.delete(testResults).where(eq(testResults.id, testId));
        res.status(200).json({ message: "Test deleted" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete test" });
    }
}