"use client";

import { FaBrain, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Footer = () => {
    const router = useRouter();

    return (
        <footer className="bg-gray-800 text-white py-10 mt-auto">
            <div className="container mx-auto flex flex-col items-center text-center">
                <div className="flex items-center space-x-2 text-2xl mb-3">
                    <FaBrain />
                    <span className="font-bold">IQ Master</span>
                </div>

                <p className="text-lg max-w-xl mb-6">
                    Discover and unlock your true intellectual potential with our certified IQ tests.
                </p>

                <div className="flex space-x-6 mb-6">
                    <button onClick={() => router.push("/")} className="hover:underline">Home</button>
                    <button onClick={() => router.push("/about")} className="hover:underline">About</button>
                    <button onClick={() => router.push("/contact")} className="hover:underline">Contact</button>
                </div>

                <div className="flex space-x-6 text-2xl mb-4">
                    <a
                        href="https://www.linkedin.com/in/ahmed-kerkri/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-400"
                    >
                        <FaLinkedinIn />
                    </a>
                    <a
                        href="https://github.com/ahmedk1991"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-400"
                    >
                        <FaGithub />
                    </a>
                </div>

                <p className="text-sm text-gray-400">
                    &copy; {new Date().getFullYear()} IQ Master. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
