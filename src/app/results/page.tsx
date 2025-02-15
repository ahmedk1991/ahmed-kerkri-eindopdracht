"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BellCurve from "@/app/components/BellCurve";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function ResultsPage() {
    const router = useRouter();
    const [iqScore, setIqScore] = useState(100);
    const [scoreAnalysis, setScoreAnalysis] = useState("");

    useEffect(() => {
        const storedResults = localStorage.getItem("testResults");
        if (storedResults) {
            const results = JSON.parse(storedResults);
            const correctAnswers = results.filter((r: any) => r.selected === r.correct).length;
            const maxCorrect = results.length;
            const avgCorrect = maxCorrect / 2;

            const calculatedIQ = 100 + ((correctAnswers - avgCorrect) / (maxCorrect - avgCorrect)) * 30;
            const finalIQ = Math.round(Math.max(70, Math.min(130, calculatedIQ)));

            setIqScore(finalIQ);

            if (finalIQ < 90) setScoreAnalysis("Your IQ score suggests below-average cognitive ability. Consider practicing logical puzzles to improve.");
            else if (finalIQ >= 90 && finalIQ <= 110) setScoreAnalysis("Your IQ score is within the average range. You have a balanced cognitive ability.");
            else if (finalIQ > 110 && finalIQ <= 120) setScoreAnalysis("You have an above-average IQ. Your problem-solving and reasoning skills are strong.");
            else setScoreAnalysis("You have a genius-level IQ. Exceptional reasoning, logic, and problem-solving skills!");
        }
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center px-6">


            <div className="w-full max-w-2xl bg-white shadow-md p-6 rounded-md text-center">
                <h2 className="text-4xl font-bold text-gray-800">Your IQ Score: {iqScore}</h2>
                <p className="text-lg text-gray-700 mt-2">Your IQ score is within the following range:</p>
                <div className="mt-4 w-full">
                    <BellCurve iqScore={iqScore} />
                </div>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl mt-8">
                <div className={`shadow-md rounded-lg p-6 text-center ${iqScore < 90 ? "bg-gray-800 text-white" : "bg-gray-100"}`}>
                    <h3 className="text-lg font-bold">Below Average</h3>
                    <p className="text-gray-600">&lt;90</p>
                </div>
                <div className={`shadow-md rounded-lg p-6 text-center ${iqScore >= 90 && iqScore <= 110 ? "bg-gray-800 text-white" : "bg-gray-100"}`}>
                    <h3 className="text-lg font-bold">Average</h3>
                    <p className="text-gray-600">90-110</p>
                </div>
                <div className={`shadow-md rounded-lg p-6 text-center ${iqScore > 110 && iqScore <= 120 ? "bg-gray-800 text-white" : "bg-gray-100"}`}>
                    <h3 className="text-lg font-bold">Above Average</h3>
                    <p className="text-gray-600">110-120</p>
                </div>
                <div className={`shadow-md rounded-lg p-6 text-center ${iqScore > 120 ? "bg-gray-800 text-white" : "bg-gray-100"}`}>
                    <h3 className="text-lg font-bold">Genius</h3>
                    <p className="text-gray-600">&gt;120</p>
                </div>
            </div>


            <div className="mt-8 w-full max-w-2xl bg-white shadow-md p-6 rounded-md text-center">
                <h3 className="text-2xl font-bold text-gray-800">Understanding Your Score</h3>
                <p className="text-lg text-gray-700 mt-2">{scoreAnalysis}</p>
            </div>

            <div className="flex items-center gap-4 mt-8">
                <button onClick={() => router.push("/test")} className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Retake Test
                </button>
                <div className="flex gap-3 text-gray-600">
                    <a href="#" className="hover:text-blue-600"><FaFacebook size={28} /></a>
                    <a href="#" className="hover:text-blue-400"><FaTwitter size={28} /></a>
                    <a href="#" className="hover:text-blue-700"><FaLinkedin size={28} /></a>
                </div>
            </div>
        </div>
    );
}
