import {db} from "@/db";
import {quiztest} from "@/db/schema";
import {eq} from "drizzle-orm";



export const questions = [
    {
        id: 1,
        category: "Mathematical Reasoning",
        text: "What is the next number in the sequence: 3, 6, 12, 24, __?",
        options: ["30", "36", "48", "60"],
        correctAnswer: "48",
        explanation: "Each number is multiplied by 2."
    },
    {
        id: 2,
        category: "Logical Thinking",
        text: "If all Bloops are Razzies and all Razzies are Dazzies, are all Bloops definitely Dazzies?",
        options: ["Yes", "No", "Cannot be determined", "Only some"],
        correctAnswer: "Yes",
        explanation: "If A → B and B → C, then A → C (transitive property)."
    },
    {
        id: 3,
        category: "Spatial Reasoning",
        text: "Which shape completes the pattern?",
        options: ["Square", "Triangle", "Circle", "Hexagon"],
        correctAnswer: "Hexagon",
        explanation: "The pattern alternates between squares and hexagons."
    },
    {
        id: 4,
        category: "Mathematical Reasoning",
        text: "If a car travels at 80 km/h for 2.5 hours, how far does it travel?",
        options: ["150 km", "160 km", "180 km", "200 km"],
        correctAnswer: "200 km",
        explanation: "Distance = Speed × Time → 80 × 2.5 = 200 km."
    },
    {
        id: 5,
        category: "Verbal Reasoning",
        text: "Which word is the odd one out?",
        options: ["Dog", "Cat", "Horse", "Car"],
        correctAnswer: "Car",
        explanation: "The others are animals; 'Car' is not."
    },
    {
        id: 6,
        category: "Pattern Recognition",
        text: "What comes next in the sequence: A, C, F, J, __?",
        options: ["K", "L", "M", "O"],
        correctAnswer: "O",
        explanation: "The gaps between letters increase: +1, +2, +3, +4."
    },
    {
        id: 7,
        category: "Mathematical Reasoning",
        text: "If 5 workers can build 5 houses in 5 days, how long will it take 10 workers to build 10 houses?",
        options: ["5 days", "10 days", "2.5 days", "7 days"],
        correctAnswer: "5 days",
        explanation: "Each worker builds 1 house in 5 days, so 10 workers take the same time."
    },
    {
        id: 8,
        category: "Spatial Reasoning",
        text: "If you rotate a cube 90 degrees, how many faces remain visible?",
        options: ["1", "3", "5", "6"],
        correctAnswer: "3",
        explanation: "Rotating a cube still keeps 3 sides visible."
    },
    {
        id: 9,
        category: "Logical Thinking",
        text: "Find the missing number: 2, 6, 12, 20, __?",
        options: ["28", "30", "32", "36"],
        correctAnswer: "30",
        explanation: "Pattern: +4, +6, +8, +10."
    },
    {
        id: 10,
        category: "Verbal Reasoning",
        text: "Which word is the synonym of 'exquisite'?",
        options: ["Ugly", "Beautiful", "Ordinary", "Boring"],
        correctAnswer: "Beautiful",
        explanation: "'Exquisite' means very beautiful."
    },
    {
        id: 11,
        category: "Pattern Recognition",
        text: "What is the next shape in this series: ⬛⬛🔺🔺⬛⬛🔺🔺⬛⬛ __ __?",
        options: ["🔺🔺", "⬛⬛", "🔺⬛", "⬛🔺"],
        correctAnswer: "🔺🔺",
        explanation: "The pattern repeats every four elements."
    },
    {
        id: 12,
        category: "Mathematical Reasoning",
        text: "What is 20% of 250?",
        options: ["25", "50", "40", "60"],
        correctAnswer: "50",
        explanation: "20% of 250 = (250 × 20) ÷ 100 = 50."
    },
    {
        id: 13,
        category: "Spatial Reasoning",
        text: "Which figure is the mirror image of this shape?",
        options: ["A", "B", "C", "D"],
        correctAnswer: "C",
        explanation: "Reflection flips the image horizontally."
    },
    {
        id: 14,
        category: "Logical Thinking",
        text: "John is older than Sarah. Sarah is older than Mark. Who is the oldest?",
        options: ["Sarah", "Mark", "John", "Cannot be determined"],
        correctAnswer: "John",
        explanation: "John > Sarah > Mark, so John is the oldest."
    },
    {
        id: 15,
        category: "Verbal Reasoning",
        text: "Find the antonym of 'Expand'.",
        options: ["Increase", "Grow", "Contract", "Enlarge"],
        correctAnswer: "Contract",
        explanation: "'Contract' means to shrink."
    },
    {
        id: 16,
        category: "Mathematical Reasoning",
        text: "What is 144 ÷ 12?",
        options: ["10", "11", "12", "13"],
        correctAnswer: "12",
        explanation: "144 divided by 12 equals 12."
    },
    {
        id: 17,
        category: "Pattern Recognition",
        text: "Which number completes the sequence: 1, 3, 6, 10, __?",
        options: ["12", "15", "16", "20"],
        correctAnswer: "15",
        explanation: "Adding +2, +3, +4, +5 each time."
    },
    {
        id: 18,
        category: "Spatial Reasoning",
        text: "Which shape can be folded into a cube?",
        options: ["A", "B", "C", "D"],
        correctAnswer: "B",
        explanation: "Only 'B' forms a cube when folded."
    },
    {
        id: 19,
        category: "Logical Thinking",
        text: "If today is Monday, what day will it be in 10 days?",
        options: ["Tuesday", "Wednesday", "Thursday", "Friday"],
        correctAnswer: "Thursday",
        explanation: "10 days after Monday = Thursday."
    },
    {
        id: 20,
        category: "Verbal Reasoning",
        text: "Which word means the same as 'innovative'?",
        options: ["Creative", "Dull", "Traditional", "Simple"],
        correctAnswer: "Creative",
        explanation: "'Innovative' means creative and new."
    }
];

export const getAllQuizQuestions = async () => {
    return db.select().from(quiztest);
};

export const getQuizQuestionById = async (id: string) => {
    return db.select().from(quiztest).where(eq(quiztest.id, id));
};

export const addQuizQuestion = async (newQuestion) => {
    await db.insert(quiztest).values({
        category: newQuestion.category,
        text: newQuestion.text,
        options: JSON.stringify(newQuestion.options),
        correctAnswer: newQuestion.correctAnswer,
    });
};

export const updateQuizQuestion = async (id: string, updatedQuestion) => {
    await db.update(quiztest)
        .set({
            category: updatedQuestion.category,
            text: updatedQuestion.text,
            options: JSON.stringify(updatedQuestion.options),
            correctAnswer: updatedQuestion.correctAnswer,
        })
        .where(eq(quiztest.id, id));
};


export const deleteQuizQuestion = async (id: string) => {
    await db.delete(quiztest).where(eq(quiztest.id, id));
};
