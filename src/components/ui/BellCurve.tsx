"use client";

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, ReferenceLine } from "recharts";

interface BellCurveProps {
    iqScore: number;
}

export default function BellCurve({ iqScore }: BellCurveProps) {
    const mean = 100;
    const stdDev = 15;

    const generateBellCurve = () => {
        const data: { iq: number; frequency: number }[] = [];
        for (let i = 55; i <= 145; i += 1) {
            const exponent = -0.5 * Math.pow((i - mean) / stdDev, 2);
            const y = (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(exponent) * 10000;
            data.push({ iq: i, frequency: y });
        }
        return data;
    };


    const iqDistribution = generateBellCurve();

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={iqDistribution} margin={{ top: 20, right: 30, left: 30, bottom: 20 }}>
                <XAxis dataKey="iq" domain={[55, 145]} tick={{ fontSize: 14, fill: "#333" }}/>
                <YAxis tick={{ fontSize: 14, fill: "#333" }} />
                <Tooltip />
                <Line type="monotone" dataKey="frequency" stroke="#4A90E2" strokeWidth={3} dot={false} />
                <ReferenceLine x={iqScore} stroke="red" strokeWidth={3} label={{ value: `Your IQ: ${iqScore}`, position: "top", fill: "red" }} />
            </LineChart>
        </ResponsiveContainer>
    );
}
