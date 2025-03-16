import {db} from "@/db";
import {quiztest} from "@/db/schema";
import {eq} from "drizzle-orm";



export const questions = [
    {
        id: 1,
        category: "Math Reasoning",
        text: "A machine produces ⚙️ 3 widgets in 5 minutes. How many widgets can 4 machines produce in 1 hour?",
        options: ["72", "144", "180", "240"],
        correctAnswer: "144",
        explanation: "Each machine produces (60/5) × 3 = 36 widgets per hour. Four machines produce 36 × 4 = 144 widgets."
    },
    {
        id: 2,
        category: "Logical Thinking",
        text: "If today is 🗓️ Wednesday, what day will it be in 100 days?",
        options: ["Monday", "Tuesday", "Wednesday", "Friday"],
        correctAnswer: "Friday",
        explanation: "100 days ÷ 7 = 14 weeks + 2 extra days. Wednesday + 2 days = Friday."
    },
    {
        id: 3,
        category: "Spatial Reasoning",
        text: "Which net of 🟥 squares can be folded into a perfect 🎲 cube?",
        options: [
            "A: ⬛⬛⬛⬛⬛⬛ (all in a straight line)",
            "B: ⬛⬛⬛\n⬛⬛⬛ (cross shape)",
            "C: ⬛⬛⬛⬛\n⬛⬛ (T-shape)",
            "D: ⬛⬛⬛⬛⬛\n⬛ (plus shape)"
        ],
        correctAnswer: "B",
        explanation: "A cube net must have six connected squares where folding along edges forms a closed 3D shape. The cross-like shape (option B) is a valid cube net."
    },
    {
        id: 4,
        category: "Pattern Recognition",
        text: "What is the next letter in this sequence? 🔡 B, E, H, K, __?",
        options: ["M", "N", "O", "P"],
        correctAnswer: "N",
        explanation: "The pattern increases by 3 letters: B(+3) → E(+3) → H(+3) → K(+3) → N."
    },
    {
        id: 5,
        category: "Verbal Reasoning",
        text: "Which word is the opposite of 🔺 'augment'?",
        options: ["Diminish", "Expand", "Enhance", "Amplify"],
        correctAnswer: "Diminish",
        explanation: "'Augment' means to increase; 'diminish' means to decrease."
    },
    {
        id: 6,
        category: "Math Reasoning",
        text: "A 🚆 train leaves at 9:00 AM traveling at 90 km/h. Another train leaves the same station at 10:00 AM at 120 km/h. At what time will the second train catch up?",
        options: ["12:00 PM", "11:30 AM", "11:00 AM", "12:30 PM"],
        correctAnswer: "12:00 PM",
        explanation: "The first train has a 90 km head start. The second train catches up at (90 km / (120 - 90)) = 3 hours → 12:00 PM."
    },
    {
        id: 7,
        category: "Logical Thinking",
        text: "A family has 👶 6 sons. Each son has 1 sister. How many children are in the family?",
        options: ["6", "7", "8", "12"],
        correctAnswer: "7",
        explanation: "All 6 brothers share the same 1 sister, so there are 7 children in total."
    },
    {
        id: 8,
        category: "Spatial Reasoning",
        text: "If you rotate a 🔲 cube 90° clockwise, which face will be on top?",
        options: ["Front", "Right", "Bottom", "Left"],
        correctAnswer: "Right",
        explanation: "A cube rotated 90° clockwise moves the front face to the right."
    },
    {
        id: 9,
        category: "Pattern Recognition",
        text: "What is the missing number? 🔢 2, 6, 12, 20, __?",
        options: ["26", "28", "30", "32"],
        correctAnswer: "30",
        explanation: "Pattern: +4, +6, +8, +10. Next step: 20 + 10 = 30."
    },
    {
        id: 10,
        category: "Verbal Reasoning",
        text: "Which word is a synonym for 🧐 'meticulous'?",
        options: ["Careless", "Thorough", "Impulsive", "Ambiguous"],
        correctAnswer: "Thorough",
        explanation: "'Meticulous' means very careful and precise, similar to 'thorough'."
    },
    {
        id: 11,
        category: "Math Reasoning",
        text: "A rectangle’s 📏 length is doubled while its width remains the same. By what percentage does the area increase?",
        options: ["50%", "100%", "200%", "300%"],
        correctAnswer: "100%",
        explanation: "Area = length × width. If length doubles, area doubles, resulting in a 100% increase."
    },
    {
        id: 12,
        category: "Logical Thinking",
        text: "A man has three daughters. Each daughter has a brother. How many children does he have?",
        options: ["3", "4", "5", "6"],
        correctAnswer: "4",
        explanation: "Each daughter shares the same one brother, so there are 4 children total."
    },
    {
        id: 13,
        category: "Spatial Reasoning",
        text: "Which figure is the mirror image of this shape? 🟦⬛⬛",
        options: ["⬛⬛🟦", "🟦⬛⬛", "⬛🟦⬛", "⬛⬛⬛"],
        correctAnswer: "⬛⬛🟦",
        explanation: "Reflection flips the shape horizontally."
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
        category: "Pattern Recognition",
        text: "🔢 1, 4, 9, 16, 25, __? What comes next?",
        options: ["30", "36", "42", "49"],
        correctAnswer: "36",
        explanation: "These are squares of consecutive numbers: 1², 2², 3², 4², 5²... Next is 6² = 36."
    },
    {
        id: 16,
        category: "Math Reasoning",
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
        text: "Which shape can be folded into a 🔲 cube?",
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
