
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";


if (!process.env.NEXT_PUBLIC_DATABASE_URL) {
    throw new Error("Missing NEXT_PUBLIC_DATABASE_URL in environment variables");
}

const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL!);
export const db = drizzle(sql, { schema });
