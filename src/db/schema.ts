import { pgTable } from "drizzle-orm/pg-core/table";
import { boolean, jsonb, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: uuid().primaryKey().defaultRandom(),
    username: varchar({ length: 100 }).notNull().unique(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 255 }).notNull(),
    isAdmin: boolean().default(false),
    createdAt: timestamp({ mode: "date" }).notNull().defaultNow(),
});

export const quiztest = pgTable("quiztest", {
    id: uuid().primaryKey().defaultRandom(),
    category: varchar({ length: 100 }).notNull(),
    text: varchar({ length: 255 }).notNull(),
    options: jsonb().notNull(),
    correctAnswer: varchar({ length: 100 }).notNull(),
    isActive: boolean().default(true),
    createdAt: timestamp({ mode: "date" }).notNull().defaultNow(),
});

export const testResults = pgTable("test_results", {
    id: uuid().primaryKey().defaultRandom(),
    user_id: uuid().notNull().references(() => users.id),
    results: jsonb().notNull(),
    score: varchar({ length: 100 }).notNull(),
    createdAt: timestamp({ mode: "date" }).notNull().defaultNow(),
});