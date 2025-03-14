import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { db } from "@/db";
import { testResults } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

        if (!token?.sub) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const results = await db
            .select()
            .from(testResults)
            .where(eq(testResults.user_id, token.sub));

        return res.status(200).json({ tests: results });
    } catch (error) {
        console.error("Database error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
