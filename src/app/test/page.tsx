"use client";

import { useState } from "react";
import { ProgressBar } from "@/app/components/progressbar";

const questions = [
    {
        id: 1,
        text: "What comes next in the sequence: 2, 4, 8, 16, __?",
        options: ["24", "32", "40", "48"],
        correctAnswer: "32",
    },
    {
        id: 2,
        text: "Which shape is different from the rest?",
        options: ["A", "B", "C", "D"],
        correctAnswer: "C",
    },
    {
        id: 3,
        text: "What is the capital of France?",
        options: ["London", "Paris", "Berlin", "Madrid"],
        correctAnswer: "Paris",
    },
    {
        id: 4,
        text: "Which of the following is a prime number?",
        options: ["9", "21", "29", "42"],
        correctAnswer: "29",
    },
    {
        id: 5,
        text: "Which of the following is a mammal?",
        options: ["Snake", "Turtle", "Dolphin", "Crocodile"],
        correctAnswer: "Dolphin",
    },
];

export default function TestPage() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);


    const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;

    const handleAnswerClick = (answer: string) => {
        setSelectedAnswer(answer);
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
            setSelectedAnswer(null);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center px-4">

            <div className="w-[70%] mt-10">
                <h1 className="text-3xl font-bold text-left p-2">IQ Test</h1>
                <ProgressBar value={progressPercentage} />
            </div>


            <p className="mt-4 text-lg text-gray-600">
                Question {currentQuestion + 1} / {questions.length}
            </p>


            <div className="mt-6 p-6 bg-white shadow-md rounded-lg w-full max-w-2xl text-center">
                <h2 className="text-2xl font-bold text-gray-800">
                    {questions[currentQuestion].text}
                </h2>
            </div>


            <div className="mt-6 grid grid-cols-2 gap-4 w-full max-w-lg">
                {questions[currentQuestion].options.map((option, index) => (
                    <button
                        key={index}
                        className={`p-4 border rounded-md text-lg font-medium hover:bg-blue-200 transition ${
                            selectedAnswer === option ? "bg-blue-500 text-white" : "bg-white"
                        }`}
                        onClick={() => handleAnswerClick(option)}
                    >
                        {option}
                    </button>
                ))}
            </div>


            <div className="mt-8 flex justify-between w-full max-w-lg">
                <button
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                    className="px-6 py-2 text-lg font-semibold border rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                >
                    Previous
                </button>
                <button
                    onClick={handleNext}
                    disabled={currentQuestion === questions.length - 1}
                    className="px-6 py-2 text-lg font-semibold border rounded-md bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
