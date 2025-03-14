"use client";

import Link from "next/link";
import { FaBrain } from "react-icons/fa";
import useAuth from "@/hooks/useAuth";

const Header = () => {
    const { isLoggedIn, logout } = useAuth();

    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto flex justify-between items-center p-5">
                <h1 className="text-2xl font-bold text-blue-600 flex items-center space-x-2">
                    <FaBrain />
                    <span>IQ Master</span>
                </h1>
                <nav className="flex space-x-6">
                    <Link href="/" className="text-gray-700 hover:text-blue-600">
                        Home
                    </Link>
                    <Link href="/about" className="text-gray-700 hover:text-blue-600">
                        About
                    </Link>
                    <Link href="/contact" className="text-gray-700 hover:text-blue-600">
                        Contact
                    </Link>
                    {isLoggedIn ? (
                        <>
                            <Link
                                href="/review"
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Review Tests
                            </Link>
                            <button
                                onClick={logout}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
