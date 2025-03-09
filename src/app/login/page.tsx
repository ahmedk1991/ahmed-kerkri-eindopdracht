"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();

                localStorage.setItem("user", JSON.stringify(data.user));
                console.log(localStorage.getItem("user"));

                router.push("/");
            } else {
                const data = await response.json();
                setError(data.message || "An error occurred");
            }
        } catch (err) {
            setError("Failed to login. Please try again.");
        }
    };

    return (
        <>
            <Header />
            <div className="flex flex-col items-center justify-center bg-gray-100 py-10 min-h-[60vh]">
                <div className="w-full max-w-sm bg-white shadow rounded p-6">
                    <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        {error && <div className="text-red-500 text-xs text-center">{error}</div>}
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}
