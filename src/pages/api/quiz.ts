import { NextApiRequest, NextApiResponse } from "next";
import { addQuizQuestion, getAllQuizQuestions } from "@/services/quizServices";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET":
            const questions = await getAllQuizQuestions();
            res.status(200).json(questions);
            break;

        case "POST":
            await addQuizQuestion(req.body);
            res.status(201).json({ message: "Question added" });
            break;

        default:
            res.setHeader("Allow", ["GET", "POST"]);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
