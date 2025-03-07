"use client";

import { useEffect, useState } from "react";

export default function useAuth() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const user = document.cookie.split("; ").find(row => row.startsWith("user="));
        setIsLoggedIn(!!user);
    }, []);

    const logout = async () => {
        await fetch("/api/logout", { method: "POST" });
        document.cookie = "user=; Path=/; Max-Age=0";
        window.location.href = "/login";
    };

    return { isLoggedIn, logout };
}
