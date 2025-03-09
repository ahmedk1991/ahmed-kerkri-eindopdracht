import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/db";
import { testResults } from "@/db/schema";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const user = JSON.parse(req.cookies.user || "null");

    console.log("Cookies in request:", req.cookies);
    console.log("Parsed user from cookie:", user);

    if (!user?.id) {
        console.error("No user ID found in cookies");
        return res.status(401).json({ message: "Unauthorized" });
    }

    if (req.method === "POST") {
        const { results, score } = req.body;

        console.log("Received results:", results);
        console.log("Received score:", score);


        if (!Array.isArray(results) || typeof score !== "number") {
            console.error("Invalid results or score format");
            return res.status(400).json({ message: "Results and score are required" });
        }

        try {
            await db.insert(testResults).values({
                user_id: user.id,
                results,
                score: String(score),
            });

            console.log("Test results successfully saved to the database");
            return res.status(201).json({ message: "Test results saved" });
        } catch (error) {
            console.error("Error saving test results to database:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    } else if (req.method === "GET") {
        try {
            const tests = await db
                .select()
                .from(testResults)
                .where(testResults.user_id.equals(user.id));

            console.log("Fetched test results:", tests);

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
