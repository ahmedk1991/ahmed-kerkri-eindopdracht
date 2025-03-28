"use client";

import { useRouter } from "next/navigation";

const Hero = () => {
    const router = useRouter();

    const handleClick = () => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            router.push("/test");
        } else {
            router.push("/login");
        }
    };

    return (
        <section className="relative bg-cover bg-center py-20 text-center bg-[url('/images/background.svg')]">
            <div className="container mx-auto relative z-10">
                <h2 className="text-4xl font-bold text-gray-800">Discover your True Intellectual Potential</h2>
                <p className="text-gray-600 mt-4 text-lg">
                    Take a scientifically designed IQ test and get your results instantly.
                </p>
                <button
                    onClick={handleClick}
                    className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Start Test
                </button>
            </div>
        </section>
    );
};

export default Hero;
