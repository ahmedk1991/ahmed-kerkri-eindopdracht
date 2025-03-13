"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { questions } from "@/services/quizServices";
import { ProgressBar } from "@/components/ui/progressbar";

interface Answer {
    question: string;
    selected: string | null;
    correct: string;
}

export default function TestPage() {
    const router = useRouter();
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [timeLeft, setTimeLeft] = useState<number>(30);

    const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;

    const goToNextQuestion = useCallback(() => {
        const newAnswer: Answer = {
            question: questions[currentQuestion].text,
            selected: selectedAnswer,
            correct: questions[currentQuestion].correctAnswer,
        };

        const updatedAnswers = [...answers, newAnswer];
        setAnswers(updatedAnswers);

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
            setSelectedAnswer(null);
            setTimeLeft(30);
        } else {
            saveResults(updatedAnswers)
                .then(() => console.log("Results saved successfully"))
                .catch((error) => console.error("Failed to save test results:", error));
        }
    }, [currentQuestion, selectedAnswer, answers]);

    const saveResults = async (finalAnswers: Answer[]) => {
        const correctCount = finalAnswers.filter((r) => r.selected === r.correct).length;
        const totalQuestions = questions.length;
        const score = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

        try {
            const response = await fetch("/api/test-results", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ results: finalAnswers, score }),
            });

            if (response.ok) {
                localStorage.setItem("testResults", JSON.stringify(finalAnswers));
                router.push("/results");
            } else {
                const errorData = await response.json();
                console.error("Failed to save test results:", errorData.message);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (timeLeft > 0) {
                setTimeLeft((prev) => prev - 1);
            } else {
                goToNextQuestion();
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft, goToNextQuestion]);

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
                        onClick={() => setSelectedAnswer(option)}
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
                    onClick={goToNextQuestion}
                    className="px-6 py-2 text-lg font-semibold border rounded-md bg-blue-500 text-white hover:bg-blue-600"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
