import type { Config } from "drizzle-kit";

export default {
    schema: "./src/db/schema.ts",
    out: "./src/db/migrations",
    dialect: "postgresql",
    driver: "d1-http",
    dbCredentials: {
        connectionString: process.env.NEXT_PUBLIC_DATABASE_URL ?? "",
    },
} satisfies Config;