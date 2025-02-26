import { pgTable, uuid, varchar, jsonb, boolean, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: uuid().primaryKey().defaultRandom(),
    username: varchar({ length: 100 }).notNull().unique(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 255 }).notNull(),
    createdAt: timestamp({ mode: "date" }).notNull().defaultNow(),
});


export const quiztest = pgTable("quiztest", {
    id: uuid().primaryKey().defaultRandom(),
    text: varchar({ length: 255 }).notNull(),
    options: jsonb().notNull(),
    correctAnswer: varchar({ length: 100 }).notNull(),
    isActive: boolean().default(true),
    createdAt: timestamp({ mode: "date" }).notNull().defaultNow(),
});
