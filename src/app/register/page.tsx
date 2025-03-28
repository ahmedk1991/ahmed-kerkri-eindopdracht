"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password }),
        });

        if (res.ok) {
            router.push("/login");
        } else {
            const data = await res.json();
            setError(data?.message || "Registratie mislukt");
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-grow flex items-center justify-center px-4 py-12 bg-gray-100">
                <form onSubmit={handleRegister} className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-4 text-center">Registreren</h2>

                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Gebruikersnaam"
                        className="border p-2 w-full mb-4 rounded-md"
                        required
                    />

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="E-mail"
                        className="border p-2 w-full mb-4 rounded-md"
                        required
                    />

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Wachtwoord"
                        className="border p-2 w-full mb-4 rounded-md"
                        required
                    />

                    {error && <p className="text-red-500 mb-2 text-sm text-center">{error}</p>}

                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full font-semibold"
                    >
                        Registreren
                    </button>
                </form>
            </main>

            <Footer />
        </div>
    );

}
