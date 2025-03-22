"use client";

import { useState } from "react";
import Image from "next/image";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [status, setStatus] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("Sending...");

        const response = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (response.ok) {
            setStatus("Message Sent!");
            setFormData({ name: "", email: "", message: "" });
        } else {
            setStatus("Error Sending Message.");
        }
    };

    return (
        <>
            <Header />
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-6 py-12">
                <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                    Get in Touch
                </h1>
                <p className="text-gray-300 mt-4">Have questions? Contact us anytime.</p>

                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl w-full">
                    <div className="bg-gray-800 bg-opacity-50 p-8 rounded-xl shadow-lg backdrop-blur-lg w-full">
                        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Your Name"
                                className="w-full px-4 py-3 text-white bg-transparent border border-gray-500 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                            />

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="Your Email"
                                className="w-full px-4 py-3 text-white bg-transparent border border-gray-500 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                            />

                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                placeholder="Your Message"
                                rows={4}
                                className="w-full px-4 py-3 text-white bg-transparent border border-gray-500 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                            />

                            <button
                                type="submit"
                                className="w-full py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition"
                            >
                                Send Message
                            </button>

                            {status && (
                                <p className="text-center mt-2 text-gray-300">
                                    {status}
                                </p>
                            )}
                        </form>
                    </div>

                    <div className="flex justify-center items-center max-w-[400px]">
                        <Image
                            src="/images/contact-us.jpg"
                            alt="Contact Us"
                            width={400}
                            height={300}
                            className="rounded-md object-contain"
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
