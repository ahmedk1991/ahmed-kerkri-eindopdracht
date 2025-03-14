"use client";

import { useState, useEffect } from "react";

export default function useAuth() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                setIsLoggedIn(!!user.id);
            } catch (error) {
                console.error("Failed to parse user data:", error);
                setIsLoggedIn(false);
            }
        }
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error("Invalid credentials");
            }

            const data = await response.json();
            localStorage.setItem("user", JSON.stringify(data.user));
            setIsLoggedIn(true);
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        window.location.href = "/login";
    };

    return { isLoggedIn, login, logout };
}
