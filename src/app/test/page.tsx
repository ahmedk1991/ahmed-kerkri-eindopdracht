"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRedo } from "react-icons/fa";

import { questions } from "@/services/quizServices";
import { ProgressBar } from "@/components/ui/progressbar";

export default function TestPage() {
    const router = useRouter();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [answers, setAnswers] = useState<
        { question: string; selected: string | null; correct: string }[]
    >([]);
    const [timeLeft, setTimeLeft] = useState(30);

    const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;

    const handleNext = async () => {
        const newAnswer = {
            question: questions[currentQuestion].text,
            selected: selectedAnswer,
            correct: questions[currentQuestion].correctAnswer,
        };

        const updatedAnswers = [...answers, newAnswer];

        if (currentQuestion < questions.length - 1) {
            setAnswers(updatedAnswers);
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setTimeLeft(30);
        } else {
            const correctCount = updatedAnswers.filter((r) => r.selected === r.correct).length;
            const totalQuestions = questions.length;

            let score = 0;
            if (totalQuestions > 0) {
                score = Math.round((correctCount / totalQuestions) * 100);
            }

            console.log("Results to save:", updatedAnswers);
            console.log("Score to save:", score);

            try {
                const response = await fetch("/api/test-results", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({ results: updatedAnswers, score }),
                });

                console.log("API Response Status:", response.status);

                if (response.ok) {
                    localStorage.setItem("testResults", JSON.stringify(updatedAnswers));
                    router.push("/results");
                } else {
                    const errorData = await response.json();
                    console.error("Failed to save test results:", errorData.message);
                }
            } catch (error) {
                console.error("Fetch error:", error);
            }
        }
    };

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

    return (
        <div className="min-h-screen flex flex-col items-center px-4 relative">
            <div className="absolute top-5 right-10 text-lg font-semibold bg-gray-200 px-4 py-2 rounded-md">
                ⏳ {timeLeft}s
            </div>
            <div className="w-[70%] mt-10">
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
                        onClick={() => handleAnswerClick(option)}
                        className={`p-4 border rounded-md text-lg font-medium hover:bg-blue-200 transition ${
                            selectedAnswer === option ? "bg-blue-500 text-white" : "bg-white"
                        }`}
                    >
                        {option}
                    </button>
                ))}
            </div>
            <div className="mt-8 flex justify-between w-full max-w-lg">
                <button
                    onClick={handleNext}
                    className="px-6 py-2 text-lg font-semibold border rounded-md bg-blue-500 text-white hover:bg-blue-600"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
