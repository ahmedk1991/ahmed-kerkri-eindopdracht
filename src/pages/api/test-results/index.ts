import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/db";
import { testResults } from "@/db/schema";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const userId = req.cookies.auth;

    console.log("Cookies in request:", req.cookies);
    console.log("User ID from cookie:", userId);

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    if (req.method === "POST") {
        try {
            const { results, score } = req.body;

            if (!results || score === undefined) {
                return res.status(400).json({ message: "Results and score are required" });
            }

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
    }

    return res.status(405).json({ message: `Method ${req.method} not allowed` });
}
