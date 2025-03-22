"use client";

import { useEffect, useState } from "react";
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
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const getTests = async () => {
            try {
                const res = await fetch("/api/test-results");

                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.message || "Failed to fetch test results");
                }

                const data = await res.json();
                if (Array.isArray(data.tests)) {
                    setTests(data.tests);
                } else {
                    throw new Error("Invalid data format");
                }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.error("Error fetching test details:", error.message);
                    setError(error.message);
                } else {
                    console.error("Unknown error fetching test details", error);
                    setError("An unexpected error occurred.");
                }
            } finally {
                setLoading(false);
            }
        };

        getTests().then(() => console.log("Tests loaded"));
    }, []);

    if (loading) return <p className="text-center text-gray-600">Loading...</p>;
    if (error) return <p className="text-center text-red-600">{error}</p>;
    if (tests.length === 0) return <p className="text-center text-gray-600">No tests found.</p>;

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-grow container mx-auto p-4">
                <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">Test History</h1>

                {loading ? (
                    <p className="text-center text-gray-600">Loading...</p>
                ) : error ? (
                    <p className="text-center text-red-600">{error}</p>
                ) : tests.length === 0 ? (
                    <p className="text-center text-gray-600">No tests found.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {tests.map((test) => (
                            <Card key={test.id}>
                                <div className="flex flex-col items-center p-4">
                                    <p className="text-sm text-gray-500">{new Date(test.createdAt).toLocaleString()}</p>
                                    <span className="text-lg font-bold text-blue-600">Score: {test.score}%</span>
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
            </main>

            <Footer />
        </div>
    );
}
