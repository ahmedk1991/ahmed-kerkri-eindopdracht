import express from 'express';
import {addQuizQuestion, getAllQuizQuestions, seedQuestions} from "@/services/quizServices";


const router = express.Router();

router.get('/quiz', async (req, res) => {
    const questions = await getAllQuizQuestions();
    res.json(questions);
});

router.post('/quiz', async (req, res) => {
    await addQuizQuestion(req.body);
    res.status(201).send('Question added');
});

router.get('/quiz/seed', async (req, res) => {
    await seedQuestions();
    res.send('Questions seeded');
});

export default router;
