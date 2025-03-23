"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface D3AverageScoreChartProps {
    averageScore: number;
}

export default function D3AverageScoreChart({ averageScore }: D3AverageScoreChartProps) {
    const chartRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (!chartRef.current) return;

        const width = 300;
        const height = 300;
        const thickness = 30;
        const radius = Math.min(width, height) / 2;

        d3.select(chartRef.current).selectAll("*").remove();

        const svg = d3
            .select(chartRef.current)
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${width / 2}, ${height / 2})`);

        const backgroundArc = d3.arc()
            .innerRadius(radius - thickness)
            .outerRadius(radius)
            .startAngle(0)
            .endAngle(2 * Math.PI);

        svg
            .append("path")
            .attr("d", backgroundArc as any)
            .attr("fill", "#e5e7eb");

        const angle = (Math.min(averageScore, 100) / 100) * 2 * Math.PI;

        const foregroundArc = d3.arc()
            .innerRadius(radius - thickness)
            .outerRadius(radius)
            .startAngle(0)
            .endAngle(angle);

        svg
            .append("path")
            .attr("d", foregroundArc as any)
            .attr("fill", "#3B82F6");

        svg
            .append("text")
            .attr("text-anchor", "middle")
            .attr("dy", "0.35em")
            .attr("font-size", "28px")
            .attr("font-weight", "bold")
            .attr("fill", "#111827")
            .text(`${averageScore}%`);
    }, [averageScore]);

    return <svg ref={(el) => { if (el) chartRef.current = el; }} className="mx-auto" />;
}
