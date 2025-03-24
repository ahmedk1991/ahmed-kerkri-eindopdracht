"use client";

import { useEffect, useState } from "react";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

interface User {
    id: string;
    email: string;
    username: string;
    createdAt: string;
    isAdmin: boolean;
}

interface Test {
    id: string;
    user_id: string;
    score: string;
    createdAt: string;
}

export default function AdminPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [tests, setTests] = useState<Test[]>([]);
    const [expandedUserId, setExpandedUserId] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/admin/data")
            .then(res => res.json())
            .then(data => {
                setUsers(data.users);
                setTests(data.testResults);
            });
    }, []);

    const deleteUser = async (userId: string) => {
        const confirm = window.confirm("Are you sure you want to delete this user?");
        if (!confirm) return;

        await fetch(`/api/admin/delete-user?userId=${userId}`, { method: "DELETE" });
        setUsers(users.filter(u => u.id !== userId));
        setTests(tests.filter(t => t.user_id !== userId));
    };

    const deleteTest = async (testId: string) => {
        const confirm = window.confirm("Are you sure you want to delete this test?");
        if (!confirm) return;

        await fetch(`/api/admin/delete-test?testId=${testId}`, { method: "DELETE" });
        setTests(tests.filter(t => t.id !== testId));
    };

    const toggleExpand = (userId: string) => {
        setExpandedUserId(prev => (prev === userId ? null : userId));
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />

            <main className="flex-grow p-6 max-w-6xl mx-auto w-full">
                <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    {users.map(user => (
                        <div key={user.id} className="border-b">
                            <div className="flex justify-between items-center p-4 bg-gray-100">
                                <div>
                                    <p className="font-semibold">{user.username} ({user.email})</p>
                                    <p className="text-sm text-gray-500">Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => toggleExpand(user.id)}
                                        className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                                    >
                                        {expandedUserId === user.id ? "Hide Tests" : "View Tests"}
                                    </button>
                                    {!user.isAdmin && (
                                        <button
                                            onClick={() => deleteUser(user.id)}
                                            className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                                        >
                                            Delete User
                                        </button>
                                    )}
                                </div>
                            </div>

                            {expandedUserId === user.id && (
                                <div className="p-4 bg-white">
                                    <table className="min-w-full table-auto border-t">
                                        <thead>
                                        <tr className="text-left bg-gray-50">
                                            <th className="p-2">Score</th>
                                            <th className="p-2">Date</th>
                                            <th className="p-2">Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {tests.filter(t => t.user_id === user.id).map(test => (
                                            <tr key={test.id} className="border-t">
                                                <td className="p-2">{test.score}%</td>
                                                <td className="p-2">{new Date(test.createdAt).toLocaleString()}</td>
                                                <td className="p-2">
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => window.location.href = `/review/${test.id}`}
                                                            className="text-sm px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                                        >
                                                            View
                                                        </button>
                                                        <button
                                                            onClick={() => deleteTest(test.id)}
                                                            className="text-sm px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {tests.filter(t => t.user_id === user.id).length === 0 && (
                                            <tr><td className="p-2 text-gray-500" colSpan={3}>No tests found.</td></tr>
                                        )}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}