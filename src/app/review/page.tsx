"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import Card from "@/components/ui/Card";


interface TestSummary {
    id: string;
    createdAt: string;
    score: number;
}

export default function TestHistoryPage() {
    const router = useRouter();
    const [tests, setTests] = useState<TestSummary[]>([]);

    useEffect(() => {
        async function fetchTests() {
            const res = await fetch("/api/test-results");
            if (res.ok) {
                const data = await res.json();
                setTests(data.tests);
            } else {
                console.error("Failed to fetch test results");
            }
        }
        fetchTests();
    }, []);

    return (
        <>
            <Header />
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">
                    Your Test History
                </h1>
                {tests.length === 0 ? (
                    <p className="text-center text-gray-600">No tests found.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {tests.map((test) => (
                            <Card key={test.id}>
                                <div className="flex flex-col items-center p-4">
                                    <p className="text-sm text-gray-500">
                                        {new Date(test.createdAt).toLocaleString()}
                                    </p>
                                    <span className="text-lg font-bold text-blue-600">
                                        Score: {test.score}
                                    </span>
                                    <button
                                        onClick={() => router.push(`/review/${test.id}`)}
                                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}
