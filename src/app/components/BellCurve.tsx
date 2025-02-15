"use client";

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, ReferenceLine } from "recharts";

interface BellCurveProps {
    iqScore: number;
}

export default function BellCurve({ iqScore }: BellCurveProps) {
    const iqDistribution = [
        { iq: 55, frequency: 5 },
        { iq: 70, frequency: 15 },
        { iq: 85, frequency: 40 },
        { iq: 100, frequency: 60 },
        { iq: 115, frequency: 40 },
        { iq: 130, frequency: 15 },
        { iq: 145, frequency: 5 },
    ];

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={iqDistribution} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                <XAxis dataKey="iq" domain={[55, 145]} tick={{ fontSize: 14, fill: "#333" }} />
                <YAxis hide />
                <Tooltip />
                <Line type="monotone" dataKey="frequency" stroke="#4A90E2" strokeWidth={3} />
                <ReferenceLine x={iqScore} stroke="red" strokeWidth={3} label={{ value: `Your IQ: ${iqScore}`, position: "top", fill: "red" }} />
            </LineChart>
        </ResponsiveContainer>
    );
}
