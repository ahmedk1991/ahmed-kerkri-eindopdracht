"use client";

import Head from "next/head";
import Header from "@/components/ui/Header";
import Hero from "@/components/ui/Hero";
import FeatureCard from "@/components/ui/FeatureCard";
import CTA from "@/components/ui/CTA";
import Footer from "@/components/ui/Footer";

import { FaBrain, FaChartLine, FaClock } from "react-icons/fa";

import React from "react";
import useAuth from "@/hooks/useAuth";

export default function Home() {
    const { isLoggedIn, logout } = useAuth();
    console.log("isLoggedIn", isLoggedIn);

    return (
        <div>
            <Head>
                <title>IQ Test - Home</title>
                <meta name="description" content="Take a free IQ test and get instant results." />
            </Head>

            <Header />
            <Hero />

            <section className="py-16 container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <FeatureCard
                    title="30 Minutes Test"
                    description="Complete the test in just 30 minutes with 20 carefully curated questions"
                    icon={<FaClock />}
                />
                <FeatureCard
                    title="Instant Results"
                    description="Get your score immediately and detailed analysis after completion."
                    icon={<FaChartLine />}
                />
                <FeatureCard
                    title="Certified Test"
                    description="Professionally designed and validated by expert psychologists"
                    icon={<FaBrain />}
                />
            </section>

            <CTA />

            <Footer />
        </div>
    );
}
