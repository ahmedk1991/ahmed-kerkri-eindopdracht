"use client";

import { useState, useEffect } from "react";
import { ProgressBar } from "@/app/components/progressbar";
import { useRouter } from "next/navigation";

const questions = [
    { id: 1, text: "What is 2 + 2?", options: ["3", "4", "5", "6"], correctAnswer: "4" },
    { id: 2, text: "Which number is the smallest?", options: ["10", "7", "3", "8"], correctAnswer: "3" },
    { id: 3, text: "What is 15% of 200?", options: ["30", "25", "35", "40"], correctAnswer: "30" },
    { id: 4, text: "What is the capital of France?", options: ["London", "Rome", "Paris", "Berlin"], correctAnswer: "Paris" },
    { id: 5, text: "What is the square root of 144?", options: ["12", "14", "16", "18"], correctAnswer: "12" },
    { id: 6, text: "What is the next prime number after 7?", options: ["8", "9", "10", "11"], correctAnswer: "11" },
    { id: 7, text: "What is the capital of Japan?", options: ["Beijing", "Seoul", "Tokyo", "Bangkok"], correctAnswer: "Tokyo" },
    { id: 8, text: "Which of the following is an even number?", options: ["13", "27", "42", "19"], correctAnswer: "42" },
    { id: 9, text: "What is the square of 9?", options: ["72", "81", "90", "99"], correctAnswer: "81" },
    { id: 10, text: "What is the next number in the sequence: 1, 4, 9, 16, __?", options: ["20", "25", "30", "35"], correctAnswer: "25" },
    { id: 11, text: "Which fraction is the largest?", options: ["1/3", "1/4", "2/5", "3/7"], correctAnswer: "2/5" },
    { id: 12, text: "If a train travels at 60 km/h for 1.5 hours, how far does it go?", options: ["60 km", "75 km", "80 km", "90 km"], correctAnswer: "90 km" },
    { id: 13, text: "What comes next in the sequence: 2, 4, 8, 16, __?", options: ["24", "32", "40", "48"], correctAnswer: "32" },
    { id: 14, text: "If a car uses 8L of fuel per 100 km, how much fuel does it use in 250 km?", options: ["15L", "18L", "20L", "25L"], correctAnswer: "20L" },
    { id: 15, text: "A clock shows 10:15. What is the angle between the hour and minute hands?", options: ["52.5°", "67.5°", "75°", "90°"], correctAnswer: "67.5°" },
    { id: 16, text: "What is the missing letter in the sequence: B, D, F, H, __?", options: ["I", "J", "K", "L"], correctAnswer: "J" },
    { id: 17, text: "Solve for x: 2x + 3 = 11", options: ["3", "4", "5", "6"], correctAnswer: "4" },
    { id: 18, text: "A farmer has 17 sheep. All but 9 run away. How many are left?", options: ["8", "9", "10", "11"], correctAnswer: "9" },
    { id: 19, text: "A cube has how many edges?", options: ["10", "12", "14", "16"], correctAnswer: "12" },
    { id: 20, text: "Which number logically fits in the series? 1, 11, 21, 1211, 111221, __?", options: ["312211", "132112", "321112", "213112"], correctAnswer: "312211" }
];



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
            setTimeLeft(15);
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

