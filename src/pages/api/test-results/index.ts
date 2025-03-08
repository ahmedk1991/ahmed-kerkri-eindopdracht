import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { db } from "@/db";
import { testResults } from "@/db/schema";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const session = await getServerSession(req as any, res as any, authOptions as any);


    if (!session || !session.user?.id) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const tests = await db.select().from(testResults).where(testResults.user_id.eq(String(session.user.id)));
        return res.status(200).json({ tests });
    } catch (error) {
        console.error("Error fetching test results:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
