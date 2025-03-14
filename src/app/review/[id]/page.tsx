"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import D3CircleChart from "@/components/ui/D3CircleChart";
import { FaRedo } from "react-icons/fa";

interface QuestionResult {
    question: string;
    selected: string | null;
    correct: string;
    category: string;
}

interface TestDetail {
    id: string;
    createdAt: string;
    score: number;
    results: QuestionResult[];
}

export default function ReviewPage() {
    const router = useRouter();
    const { id } = useParams() as { id: string };
    const [testDetail, setTestDetail] = useState<TestDetail | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTestDetail = async () => {
            try {
                const res = await fetch(`/api/review/${id}`);
                if (!res.ok) throw new Error("Failed to fetch test details");

                const data = await res.json();
                if (data.test && Array.isArray(data.test.results)) {
                    setTestDetail(data.test);
                } else {
                    throw new Error("Invalid data format");
                }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("An unexpected error occurred.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchTestDetail().then(() => console.log("Test details loaded"));
    }, [id]);


    if (loading) return <p className="text-center p-6">Loading...</p>;
    if (error) return <p className="text-center p-6 text-red-600">{error}</p>;
    if (!testDetail) return <p className="text-center p-6 text-red-600">No test details found.</p>;

    const categoryScores: Record<string, { total: number; correct: number }> = {};
    testDetail.results.forEach(({ category, selected, correct }) => {
        if (!categoryScores[category]) categoryScores[category] = { total: 0, correct: 0 };
        categoryScores[category].total++;
        if (selected === correct) categoryScores[category].correct++;
    });

    const chartData = Object.keys(categoryScores).map((category) => ({
        category,
        score: Math.round((categoryScores[category].correct / categoryScores[category].total) * 100),
    }));

    return (
        <>
            <Header />
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">
                    Test Review
                </h1>
                <p className="text-center text-gray-600 mb-6">
                    Taken on: {new Date(testDetail.createdAt).toLocaleString()} | Score: {testDetail.score}%
                </p>

                {/* ✅ Fix: Only pass required props to D3CircleChart */}
                <div className="flex justify-center mb-8">
                    <D3CircleChart scoreDistribution={chartData} />
                </div>

                <div className="space-y-4">
                    {testDetail.results.map((q, index) => {
                        const isCorrect = q.selected === q.correct;
                        return (
                            <div
                                key={index}
                                className={`p-4 border rounded-md shadow-sm ${
                                    isCorrect ? "bg-green-100 border-green-300" : "bg-red-100 border-red-300"
                                }`}
                            >
                                <div className="font-bold mb-2">Question {index + 1} ({q.category}):</div>
                                <p className="mb-2">{q.question}</p>
                                <p className="mb-2">
                                    <span className="font-semibold">Your Answer:</span>{" "}
                                    <span className={`${isCorrect ? "text-green-600" : "text-red-600"}`}>
                                        {q.selected || "No answer"}
                                    </span>
                                </p>
                                <p className="mb-2">
                                    <span className="font-semibold">Correct Answer:</span>{" "}
                                    <span className="text-green-600">{q.correct}</span>
                                </p>
                            </div>
                        );
                    })}
                </div>

                <div className="flex justify-center mt-8">
                    <button
                        onClick={() => router.push("/test")}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                    >
                        <FaRedo size={20} className="mr-2" /> Retake Test
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
}
