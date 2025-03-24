"use client";
import Image from "next/image";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";

export default function AboutPage() {
    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center px-6 py-12">
                <div className="max-w-4xl text-center">
                    <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                        Discover Your True Potential
                    </h1>
                    <p className="mt-4 text-lg text-gray-300">
                        Take our IQ test and uncover your strengths in <b>logical, numerical, and spatial reasoning</b>.
                        The test is <b>100% free</b> and provides accurate results with a detailed report.
                    </p>
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl items-center">
                    <div className="order-1 md:order-none bg-gray-800 p-6 rounded-xl shadow-lg text-center hover:scale-105 transition-transform">
                        <h2 className="text-2xl font-bold">Fast & Reliable</h2>
                        <p className="text-gray-400 mt-2">
                            Our test takes just <b>20 minutes</b> and is optimized for accuracy, ensuring a smooth experience.
                            You will receive instant results and feedback immediately after completing the test.
                        </p>
                    </div>
                    <div className="order-2 md:order-none flex justify-center">
                        <Image
                            src="/images/20min.webp"
                            alt="Fast Test"
                            width={250}
                            height={250}
                            className="rounded-md object-contain max-w-full hover:scale-110 transition-transform"
                        />
                    </div>
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl items-center">
                    <div className="order-1 md:order-2 bg-gray-800 p-6 rounded-xl shadow-lg text-center hover:scale-105 transition-transform">
                        <h2 className="text-2xl font-bold">Compare with Peers</h2>
                        <p className="text-gray-400 mt-2">
                            See how your IQ compares to others, including professionals in different fields.
                            Gain insights into your cognitive strengths and benchmark your performance against others.
                        </p>
                    </div>
                    <div className="order-2 md:order-1 flex justify-center">
                        <Image
                            src="/images/iq-test-1.webp"
                            alt="Compare IQ"
                            width={250}
                            height={250}
                            className="rounded-md object-contain max-w-full hover:scale-110 transition-transform"
                        />
                    </div>
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl items-center">
                    <div className="order-1 md:order-none bg-gray-800 p-6 rounded-xl shadow-lg text-center hover:scale-105 transition-transform">
                        <h2 className="text-2xl font-bold">Retake Anytime</h2>
                        <p className="text-gray-400 mt-2">
                            Each test is unique, so you can retake it as many times as needed to achieve the best result.
                            Our system ensures that every test presents new challenges.
                        </p>
                    </div>
                    <div className="order-2 md:order-none flex justify-center">
                        <Image
                            src="/images/iq-test-2.webp"
                            alt="Retake Test"
                            width={250}
                            height={250}
                            className="rounded-md object-contain max-w-full hover:scale-110 transition-transform"
                        />
                    </div>
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl items-center">
                    <div className="order-1 md:order-2 bg-gray-800 p-6 rounded-xl shadow-lg text-center hover:scale-105 transition-transform">
                        <h2 className="text-2xl font-bold">Data-Driven Precision</h2>
                        <p className="text-gray-400 mt-2">
                            Our test is backed by a vast database, ensuring accuracy and reliable scoring.
                            We use advanced algorithms to analyze your performance in real-time.
                        </p>
                    </div>
                    <div className="order-2 md:order-1 flex justify-center">
                        <Image
                            src="/images/precision.webp"
                            alt="Data Precision"
                            width={250}
                            height={250}
                            className="rounded-md object-contain max-w-full hover:scale-110 transition-transform"
                        />
                    </div>
                </div>

                <div className="mt-16 max-w-3xl text-center">
                    <h2 className="text-3xl font-bold text-blue-400">Why Take Our Test?</h2>
                    <p className="mt-4 text-lg text-gray-300">
                        Unlike other tests that charge high fees, our IQ test is <b>completely free</b> and provides a full report.
                        Whether you&apos;re curious about your intelligence level or preparing for an assessment, our test is the perfect choice.
                    </p>
                    <a
                        href="/test"
                        className="mt-6 inline-block px-6 py-3 bg-white text-blue-600 rounded-md hover:bg-gray-200 font-bold transition-all hover:scale-105"
                    >
                        Start Your Free IQ Test
                    </a>
                </div>
            </div>
            <Footer />
        </>
    );
}
