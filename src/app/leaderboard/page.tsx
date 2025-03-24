"use client";

import { useEffect, useState } from "react";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import { motion } from "framer-motion";

interface LeaderboardUser {
    username: string;
    score: number;
}

export default function LeaderboardPage() {
    const [topUsers, setTopUsers] = useState<LeaderboardUser[]>([]);

    useEffect(() => {
        fetch("/api/leaderboard")
            .then((res) => res.json())
            .then((data) => setTopUsers(data.top || []))
            .catch((err) => console.error("Failed to load leaderboard", err));
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
            <Header />

            <main className="flex-grow container mx-auto p-6 text-center">
                <h1 className="text-4xl font-bold text-blue-800 mb-10">🏆 Leaderboard</h1>

                <div className="grid sm:grid-cols-3 gap-6 justify-center">
                    {topUsers.slice(0, 3).map((user, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className={`rounded-xl shadow-lg p-6 bg-white ${
                                index === 0 ? "border-4 border-yellow-400 scale-105" : "border"
                            }`}
                        >
                            <div className="text-5xl mb-4">
                                {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                            </div>
                            <h2 className="text-xl font-semibold text-blue-700">{user.username}</h2>
                            <p className="text-lg text-gray-600">Score: {user.score}%</p>
                        </motion.div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
