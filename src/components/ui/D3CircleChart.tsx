"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface D3CircleChartProps {
    scoreDistribution: { category: string; score: number }[];
}

export default function D3CircleChart({ scoreDistribution }: D3CircleChartProps) {
    const chartRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (!chartRef.current) return;

        const width = 300;
        const height = 300;
        const radius = Math.min(width, height) / 2;

        d3.select(chartRef.current).selectAll("*").remove();

        const svg = d3.select(chartRef.current)
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${width / 2}, ${height / 2})`);

        const color = d3.scaleOrdinal(d3.schemeCategory10);

        const pie = d3.pie<{ category: string; score: number }>()
            .value((d) => d.score);

        const arc = d3.arc<d3.PieArcDatum<{ category: string; score: number }>>()
            .innerRadius(50)
            .outerRadius(radius);

        const pieData = pie(scoreDistribution);

        svg.selectAll("path")
            .data(pieData)
            .enter()
            .append("path")
            .attr("d", arc)
            .attr("fill", (d, i) => color(i.toString()))
            .attr("stroke", "#fff")
            .style("stroke-width", "2px");

        svg.selectAll("text")
            .data(pieData)
            .enter()
            .append("text")
            .attr("transform", (d) => `translate(${arc.centroid(d)})`)
            .attr("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("fill", "white")
            .text((d) => d.data.category);
    }, [scoreDistribution]);

    return <svg ref={(el) => { if (el) chartRef.current = el; }} className="mx-auto"></svg>;
}
