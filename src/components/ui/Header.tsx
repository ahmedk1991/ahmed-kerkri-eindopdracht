"use client";

import { useRouter } from "next/navigation";
import { FaBars, FaBrain, FaTimes } from "react-icons/fa";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";

const Header = () => {
    const router = useRouter();
    const { isLoggedIn, logout, user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto flex justify-between items-center p-5">
                <h1
                    className="text-2xl font-bold text-blue-600 flex items-center space-x-2 cursor-pointer"
                    onClick={() => router.push("/")}
                >
                    <FaBrain />
                    <span>IQ Master</span>
                </h1>

                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>

                <nav className="hidden md:flex space-x-6 items-center">
                    <button onClick={() => router.push("/")} className="text-gray-700 hover:text-blue-600">
                        Home
                    </button>
                    <button onClick={() => router.push("/about")} className="text-gray-700 hover:text-blue-600">
                        About
                    </button>
                    <button onClick={() => router.push("/contact")} className="text-gray-700 hover:text-blue-600">
                        Contact
                    </button>
                    {isLoggedIn && (
                        <button onClick={() => router.push("/leaderboard")} className="text-gray-700 hover:text-blue-600">
                            Leaderboard
                        </button>
                    )}
                    {isLoggedIn && user?.isAdmin && (
                        <button
                            onClick={() => router.push("/admin")}
                            className="text-blue-600 hover:text-blue-800 px-4 py-2"
                        >
                            Admin Dashboard
                        </button>
                    )}
                    {isLoggedIn ? (
                        <>
                            <button
                                onClick={() => router.push("/review")}
                                className="text-blue-600 hover:text-blue-800 px-4 py-2"
                            >
                                Review Tests
                            </button>
                            <button
                                onClick={logout}
                                className="text-red-600 hover:text-red-800 px-4 py-2"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => router.push("/login")}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Login
                            </button>
                            <button
                                onClick={() => router.push("/register")}
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                            >
                                Register
                            </button>
                        </>
                    )}
                </nav>
            </div>

            {isOpen && (
                <div className="md:hidden bg-white shadow px-4 pb-4">
                    <div className="flex flex-col space-y-2">
                        <button onClick={() => { router.push("/"); setIsOpen(false); }} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-100">Home</button>
                        <button onClick={() => { router.push("/about"); setIsOpen(false); }} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-100">About</button>
                        <button onClick={() => { router.push("/contact"); setIsOpen(false); }} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-100">Contact</button>
                        {isLoggedIn && (
                            <button onClick={() => { router.push("/leaderboard"); setIsOpen(false); }} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-100">Leaderboard</button>
                        )}
                        {isLoggedIn && user?.isAdmin && (
                            <button onClick={() => { router.push("/admin"); setIsOpen(false); }} className="w-full text-left px-4 py-2 text-blue-600 hover:bg-blue-100">Admin Dashboard</button>
                        )}
                        {isLoggedIn ? (
                            <>
                                <button onClick={() => { router.push("/review"); setIsOpen(false); }} className="w-full text-left px-4 py-2 text-blue-600 hover:bg-blue-100">Review Tests</button>
                                <button onClick={() => { logout(); setIsOpen(false); }} className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100">Logout</button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => { router.push("/login"); setIsOpen(false); }} className="w-full text-left px-4 py-2 text-blue-600 hover:bg-blue-100">Login</button>
                                <button onClick={() => { router.push("/register"); setIsOpen(false); }} className="w-full text-left px-4 py-2 text-green-600 hover:bg-green-100">Register</button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
