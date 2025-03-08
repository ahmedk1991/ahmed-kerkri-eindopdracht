"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

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
                            <div
                                key={test.id}
                                onClick={() => router.push(`/review/${test.id}`)}
                                className="p-4 border rounded-md shadow-md hover:bg-blue-50 cursor-pointer"
                            >
                                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">
                    {new Date(test.createdAt).toLocaleString()}
                  </span>
                                    <span className="font-bold text-blue-600">
                    Score: {test.score}
                  </span>
                                </div>
                                <p className="text-lg font-semibold">Test ID: {test.id}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}
