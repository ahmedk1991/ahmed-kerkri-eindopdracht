"use client";

import { useRouter } from "next/navigation";
import { FaBrain } from "react-icons/fa";
import useAuth from "@/hooks/useAuth";

const Header = () => {
    const router = useRouter();
    const { isLoggedIn, logout } = useAuth();

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
                <nav className="flex space-x-6">
                    <button onClick={() => router.push("/")} className="text-gray-700 hover:text-blue-600">
                        Home
                    </button>
                    <button onClick={() => router.push("/about")} className="text-gray-700 hover:text-blue-600">
                        About
                    </button>
                    <button onClick={() => router.push("/contact")} className="text-gray-700 hover:text-blue-600">
                        Contact
                    </button>
                    {isLoggedIn ? (
                        <>
                            <button
                                onClick={() => router.push("/review")}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Review Tests
                            </button>
                            <button
                                onClick={logout}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
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
        </header>
    );
};

export default Header;
