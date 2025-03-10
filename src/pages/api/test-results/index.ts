import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/db";
import { testResults } from "@/db/schema";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("Cookies in request:", req.cookies);

    const userId = req.cookies.auth;
    console.log("Parsed user ID from cookie:", userId);

    if (!userId) {
        console.log("No user ID found in cookies");
        return res.status(401).json({ message: "Unauthorized" });
    }

    if (req.method === "POST") {
        const { results, score } = req.body;
        console.log("Received results:", results);
        console.log("Received score:", score);

        if (!results || score === undefined) {
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
    } else {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}