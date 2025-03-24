import { db } from "@/db";
import { testResults, users } from "@/db/schema";
import { eq } from "drizzle-orm";

interface ResultRow {
    username: string;
    score: string;
}

export default async function handler(req, res) {
    try {
        const results: ResultRow[] = await db
            .select({
                username: users.username,
                score: testResults.score,
            })
            .from(testResults)
            .innerJoin(users, eq(testResults.user_id, users.id));

        const userScores = new Map<string, number[]>();

        results.forEach((row) => {
            const parsed = parseFloat(row.score);
            if (!isNaN(parsed)) {
                if (!userScores.has(row.username)) {
                    userScores.set(row.username, []);
                }
                userScores.get(row.username)!.push(parsed);
            }
        });

        const top = Array.from(userScores.entries())
            .map(([username, scores]) => ({
                username,
                score: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
            }))
            .sort((a, b) => b.score - a.score)
            .slice(0, 3);

        return res.status(200).json({ top });
    } catch (error) {
        console.error("Leaderboard error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
