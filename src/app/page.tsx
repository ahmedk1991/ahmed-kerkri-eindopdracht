import Head from "next/head";

import { FaBrain, FaChartLine, FaClock } from "react-icons/fa";
import Header from "@/app/components/Header";
import Hero from "@/app/components/Hero";
import FeatureCard from "@/app/components/FeatureCard";

import Footer from "@/app/components/Footer";


export default function Home() {
  return (
      <div>
        <Head>
          <title>IQ Test - Home</title>
          <meta name="description" content="Take a free IQ test and get instant results." />
        </Head>

        <Header />
        <Hero />

          <section className="py-16 container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <FeatureCard title="30 Minutes Test" description="Complete the test in just 30 minutes with 20 caredfully curated questions" icon={<FaClock /> } />
              <FeatureCard title="Instant Results" description="Get your score immediately and detailed analysis immediately after completion." icon={<FaChartLine />} />
              <FeatureCard title="Certified Test" description="Professionally designed and validated by expert psychologists"icon={<FaBrain />} />
          </section>

        <Footer />
      </div>
  );
}
