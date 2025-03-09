import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/db";
import { testResults } from "@/db/schema";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const userId = req.cookies.userId;
    console.log("Cookies in request:", req.cookies);

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    if (req.method === "POST") {
        const { results, score } = req.body;
        if (!results || !score) {
            return res.status(400).json({ message: "Results and score are required" });
        }
        try {
            await db.insert(testResults).values({
                user_id: userId,
                results,
                score: String(score),
            });
            return res.status(201).json({ message: "Test results saved" });
        } catch (error) {
            console.error("Error saving test results:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    } else if (req.method === "GET") {
        try {
            const tests = await db
                .select()
                .from(testResults)
                .where(testResults.user_id.equals(userId));
            return res.status(200).json({ tests });
        } catch (error) {
            console.error("Error fetching test results:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    } else {
        res.setHeader("Allow", ["GET", "POST"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
