"use client";

import { useState, useEffect } from "react";

interface User {
    id: string;
    email: string;
    name?: string;
    isAdmin?: boolean;
}

export default function useAuth() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setIsLoggedIn(!!parsedUser.id);
                setUser(parsedUser);
            } catch (error) {
                console.error("Failed to parse user data:", error);
                setIsLoggedIn(false);
                setUser(null);
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
            console.log("Login response:", data);

            if (!data.user || !data.user.id) {
                throw new Error("User data is missing from response");
            }

            localStorage.setItem("user_id", data.user.id);
            localStorage.setItem("user", JSON.stringify(data.user));

            setIsLoggedIn(true);
            setUser(data.user);
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("user_id");
        setIsLoggedIn(false);
        setUser(null);
        window.location.href = "/login";
    };

    return { isLoggedIn, user, login, logout };
}
