"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { questions } from "@/services/quizServices";
import { ProgressBar } from "@/components/ui/progressbar";

interface Answer {
    question: string;
    selected: string | null;
    correct: string;
    category: string;
    explanation: string;
}

export default function TestPage() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [timeLeft, setTimeLeft] = useState(30);

    const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;
    const router = useRouter();

    const saveResults = useCallback(async (finalAnswers: Answer[]) => {
        const correctCount = finalAnswers.filter((r) => r.selected === r.correct).length;
        const totalQuestions = questions.length;
        const score = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

        const userData = localStorage.getItem("user");
        const userId = userData ? JSON.parse(userData).id : null;

        if (!userId) {
            console.error("User ID is missing. Ensure the user is logged in.");
            return;
        }

        const payload = { user_id: userId, results: finalAnswers, score };
        console.log(" Sending test results:", payload);

        try {
            const response = await fetch("/api/test-results", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(payload),
            });

            const responseData = await response.json();
            console.log("Server response:", responseData);

            if (response.ok) {
                localStorage.setItem("testResults", JSON.stringify(finalAnswers));
                router.push("/results");
            } else {
                console.error("Failed to save test results:", responseData.message);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }, [questions, router]);

    const goToNextQuestion = useCallback(async () => {
        const currentQ = questions[currentQuestion];

        const newAnswer: Answer = {
            question: currentQ.text,
            selected: selectedAnswer,
            correct: currentQ.correctAnswer,
            category: currentQ.category || "General",
            explanation: currentQ.explanation || "No explanation provided.",
        };

        const updatedAnswers = [...answers, newAnswer];
        setAnswers(updatedAnswers);

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
            setSelectedAnswer(null);
            setTimeLeft(30);
        } else {
            await saveResults(updatedAnswers);
        }
    }, [currentQuestion, selectedAnswer, answers, saveResults]);


    useEffect(() => {
        const timer = setTimeout(() => {
            if (timeLeft > 0) {
                setTimeLeft((prev) => prev - 1);
            } else {
                goToNextQuestion().catch((error) => console.error("Error in goToNextQuestion:", error));
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
                    onClick={() => goToNextQuestion().catch((error) => console.error("Error in goToNextQuestion:", error))}
                    className="px-6 py-2 text-lg font-semibold border rounded-md bg-blue-500 text-white hover:bg-blue-600"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
