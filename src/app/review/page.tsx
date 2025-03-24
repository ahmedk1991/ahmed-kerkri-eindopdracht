"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import Image from "next/image";
import D3AverageScoreChart from "@/components/ui/D3CircleChartAverage";

interface TestSummary {
    id: string;
    createdAt: string;
    score: string;
}

interface UserInfo {
    email: string;
    createdAt: string;
    username: string;
}

export default function TestHistoryPage() {
    const router = useRouter();
    const [tests, setTests] = useState<TestSummary[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [user, setUser] = useState<UserInfo | null>(null);

    useEffect(() => {
        fetch("/api/test-results")
            .then((res) => res.json())
            .then((data) => {
                setTests(data.tests || []);
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);

            fetch(`/api/test-results?userId=${parsedUser.id}`)
                .then((res) => res.json())
                .then((data) => {
                    setTests(data.tests || []);
                })
                .catch((err) => setError(err.message))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);



    const averageScore = tests.length
        ? Math.round(tests.reduce((a, b) => a + parseFloat(b.score), 0) / tests.length)
        : 0;

    const highestScore = tests.length
        ? Math.max(...tests.map((t) => parseFloat(t.score)))
        : 0;

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />

            <main className="flex-grow container mx-auto p-4">
                {user && (
                    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row justify-between items-center mb-8">
                        <div className="flex items-center gap-6">
                            <Image
                                src="/images/avatar-default.webp"
                                alt="avatar"
                                width={80}
                                height={80}
                                className="rounded-full object-cover"
                            />
                            <div>
                                <h2 className="text-xl font-bold">{user.username}</h2>
                                <p className="text-sm text-gray-500">
                                    Member since {new Date(user.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => router.push("/test")}
                            className="mt-4 md:mt-0 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Retake Test
                        </button>
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white rounded-lg shadow p-6 text-center">
                        <h3 className="text-lg font-semibold text-gray-700">Average Score</h3>
                        <p className="text-3xl text-blue-600 mt-2">{averageScore}%</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6 text-center">
                        <h3 className="text-lg font-semibold text-gray-700">Tests Taken</h3>
                        <p className="text-3xl text-blue-600 mt-2">{tests.length}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6 text-center">
                        <h3 className="text-lg font-semibold text-gray-700">Best Score</h3>
                        <p className="text-3xl text-blue-600 mt-2">{highestScore}%</p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6 mb-10 overflow-x-auto">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Test Results</h2>
                    <table className="min-w-full">
                        <thead>
                        <tr className="text-left border-b">
                            <th className="py-2">Date</th>
                            <th className="py-2">Score</th>
                            <th className="py-2">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tests.map((test) => (
                            <tr key={test.id} className="border-b hover:bg-gray-50">
                                <td className="py-2">{new Date(test.createdAt).toLocaleString()}</td>
                                <td className="py-2">{parseFloat(test.score)}%</td>
                                <td className="py-2">
                                    <button
                                        onClick={() => router.push(`/review/${test.id}`)}
                                        className="text-blue-600 hover:underline"
                                    >
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <div className="bg-white shadow p-6 rounded-lg text-center">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                        Your Average Performance
                    </h2>
                    <div className="w-full h-[300px] flex justify-center items-center">
                        <D3AverageScoreChart averageScore={averageScore} />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
