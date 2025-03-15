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
    explanation: string;
}

interface TestDetail {
    id: string;
    createdAt: string;
    score: string;
    results: QuestionResult[];
}

export default function ReviewPage() {
    const router = useRouter();
    const { id } = useParams<{ id: string }>();
    const [testDetail, setTestDetail] = useState<TestDetail | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchTestDetail = async () => {
            try {
                const res = await fetch(`/api/test-results/${id}`);

                if (!res.ok) {
                    const errorText = await res.text();
                    throw new Error(`Failed to fetch test details: ${errorText}`);
                }

                const data = await res.json();
                if (!data.test || !Array.isArray(data.test.results)) {
                    throw new Error("Invalid data format");
                }

                setTestDetail(data.test);
            } catch (error) {
                console.error("Error fetching test details:", error);
                setError("Failed to load test details.");
            } finally {
                setLoading(false);
            }
        };

        fetchTestDetail().then(() => console.log("Tests loaded"));
    }, [id]);

    if (loading) return <p className="text-center p-6">Loading...</p>;
    if (error) return <p className="text-center p-6 text-red-600">{error}</p>;
    if (!testDetail) return <p className="text-center p-6 text-red-600">No test details found.</p>;


    const scoreDistribution = [
        { category: "Correct", score: testDetail.results.filter((q) => q.selected === q.correct).length },
        { category: "Incorrect", score: testDetail.results.filter((q) => q.selected !== q.correct).length }
    ];

    return (
        <>
            <Header />
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">Test Review</h1>
                <p className="text-center text-gray-600 mb-6">
                    Taken on: {new Date(testDetail.createdAt).toLocaleString()} | Score: {testDetail.score}%
                </p>


                <div className="flex justify-center mb-8">
                    <D3CircleChart scoreDistribution={scoreDistribution} />
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
                                <div className="font-bold mb-2">Question {index + 1}:</div>
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
                                {q.explanation && (
                                    <p className="mt-2 text-sm text-gray-600">
                                        <span className="font-semibold">Explanation:</span> {q.explanation}
                                    </p>
                                )}
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
