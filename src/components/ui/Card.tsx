"use client";

import React, { ReactNode } from "react";

interface CardProps {
    title?: string;
    children: ReactNode;
    onClick?: () => void;
    className?: string;
}

const Card: React.FC<CardProps> = ({ title, children, onClick, className }) => {
    return (
        <div
            onClick={onClick}
            className={`p-4 bg-white shadow-md rounded-md hover:shadow-lg transition cursor-pointer ${className}`}
        >
            {title && <h3 className="text-xl font-semibold mb-2">{title}</h3>}
            <div>{children}</div>
        </div>
    );
};

export default Card;
