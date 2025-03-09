"use client";

import { useState, useEffect } from "react";

export default function useAuth() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem("user");
        console.log("Raw User from localStorage:", user);

        if (user && user !== "undefined" && user !== "null") {
            try {
                const parsedUser = JSON.parse(user);
                console.log("Parsed User:", parsedUser);

                setIsLoggedIn(Boolean(parsedUser?.id));
            } catch (error) {
                console.error("Failed to parse user data:", error);
                setIsLoggedIn(false);
            }
        } else {
            console.warn("No valid user data found in localStorage.");
            setIsLoggedIn(false);
        }
    }, []);

    const logout = async () => {
        await fetch("/api/logout", { method: "POST" });
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        window.location.href = "/login";
    };

    return { isLoggedIn, logout };
}
