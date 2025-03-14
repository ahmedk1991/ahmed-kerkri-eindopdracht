import { db } from "@/db";
import { quiztest } from "@/db/schema";
import { questions } from "@/services/quizServices";

async function seed() {
    try {
        console.log("Seeding quiz questions...");

        for (const question of questions) {
            await db.insert(quiztest).values({
                category: question.category,
                text: question.text,
                options: JSON.stringify(question.options),
                correctAnswer: question.correctAnswer,
            });
        }

        console.log(" Questions seeded successfully!");
    } catch (error) {
        console.error(" Error seeding questions:", error);
    } finally {
        process.exit();
    }
}

seed().then(() => console.log("Seeding completed")).catch(console.error);
