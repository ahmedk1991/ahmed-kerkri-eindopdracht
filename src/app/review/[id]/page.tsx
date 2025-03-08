"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import { FaRedo, FaChartBar } from "react-icons/fa";

interface QuestionResult {
    question: string;
    selected: string | null;
    correct: string;
    explanation?: string;
}

interface TestDetail {
    id: string;
    createdAt: string;
    score: number;
    results: QuestionResult[];
}

export default function TestDetailPage() {
    const router = useRouter();
    const { id } = useParams() as { id: string };
    const [testDetail, setTestDetail] = useState<TestDetail | null>(null);
    const [showOnlyIncorrect, setShowOnlyIncorrect] = useState(false);

    useEffect(() => {
        async function fetchTestDetail() {
            const res = await fetch(`/api/test-results/${id}`);
            if (res.ok) {
                const data = await res.json();
                setTestDetail(data.test);
            } else {
                console.error("Failed to fetch test detail");
            }
        }
        fetchTestDetail();
    }, [id]);

    if (!testDetail) {
        return <p className="text-center p-6">Loading...</p>;
    }

    const filteredResults = showOnlyIncorrect
        ? testDetail.results.filter((q) => q.selected !== q.correct)
        : testDetail.results;

    return (
        <>
            <Header />
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold text-blue-600 text-center mb-4">
                    Test Detail
                </h1>
                <p className="text-center text-gray-600 mb-6">
                    Taken on: {new Date(testDetail.createdAt).toLocaleString()} | Score:{" "}
                    {testDetail.score}
                </p>
                <div className="flex justify-center mb-4">
                    <button
                        onClick={() => setShowOnlyIncorrect((prev) => !prev)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        {showOnlyIncorrect ? "Show All Questions" : "Show Only Incorrect Answers"}
                    </button>
                </div>
                <div className="space-y-4">
                    {filteredResults.map((q, index) => {
                        const isCorrect = q.selected === q.correct;
                        return (
                            <div
                                key={index}
                                className={`p-4 border rounded-md shadow-sm ${
                                    isCorrect ? "bg-green-100 border-green-300" : "bg-red-100 border-red-300"
                                }`}
                            >
                                <div className="font-bold mb-2">Question {index + 1}:</div>
                                <p className="mb-2">{q.question}</p>
                                <p className="mb-2">
                                    <span className="font-semibold">Your Answer:</span>{" "}
                                    {q.selected || "No answer"}
                                </p>
                                <p className="mb-2">
                                    <span className="font-semibold">Correct Answer:</span> {q.correct}
                                </p>
                                {!isCorrect && q.explanation && (
                                    <p className="text-sm text-gray-700">
                                        <span className="font-semibold">Hint:</span> {q.explanation}
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>
                <div className="flex justify-around mt-8">
                    <button
                        onClick={() => router.push("/test")}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                    >
                        <FaRedo size={20} className="mr-2" /> Retake Test
                    </button>
                    <button
                        onClick={() => router.push("/score-analysis")}
                        className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
                    >
                        <FaChartBar size={20} className="mr-2" /> View Score Analysis
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
}
