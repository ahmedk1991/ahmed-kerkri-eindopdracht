"use client";

import { useState, useEffect } from "react";
import { ProgressBar } from "@/app/components/progressbar";
import { useRouter } from "next/navigation";
import {questions} from "@/services/quizServices";





export default function TestPage() {
    const router = useRouter();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [answers, setAnswers] = useState<{ question: string; selected: string | null; correct: string }[]>([]);
    const [timeLeft, setTimeLeft] = useState(30);

    const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            handleNext();
        }
    }, [timeLeft]);

    const handleAnswerClick = (answer: string) => {
        setSelectedAnswer(answer);
    };

    const handleNext = () => {
        setAnswers([...answers, { question: questions[currentQuestion].text, selected: selectedAnswer, correct: questions[currentQuestion].correctAnswer }]);
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setTimeLeft(30);
        } else {
            localStorage.setItem("testResults", JSON.stringify(answers));
            router.push("/results");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center px-4 relative">
            <div className="absolute top-5 right-10 text-lg font-semibold bg-gray-200 px-4 py-2 rounded-md">⏳ {timeLeft}s</div>
            <div className="w-[70%] mt-10">
                <ProgressBar value={progressPercentage} />
            </div>
            <p className="mt-4 text-lg text-gray-600">Question {currentQuestion + 1} / {questions.length}</p>
            <div className="mt-6 p-6 bg-white shadow-md rounded-lg w-full max-w-2xl text-center">
                <h2 className="text-2xl font-bold text-gray-800">{questions[currentQuestion].text}</h2>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 w-full max-w-lg">
                {questions[currentQuestion].options.map((option, index) => (
                    <button key={index} className={`p-4 border rounded-md text-lg font-medium hover:bg-blue-200 transition ${selectedAnswer === option ? "bg-blue-500 text-white" : "bg-white"}`} onClick={() => handleAnswerClick(option)}>
                        {option}
                    </button>
                ))}
            </div>
            <div className="mt-8 flex justify-between w-full max-w-lg">
                <button onClick={handleNext} className="px-6 py-2 text-lg font-semibold border rounded-md bg-blue-500 text-white hover:bg-blue-600">
                    Next
                </button>
            </div>
        </div>
    );
}

