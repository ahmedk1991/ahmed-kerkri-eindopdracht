import { ReactElement } from "react";

interface FeatureCardProps {
    title: string;
    description: string;
    icon: ReactElement;
}

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="text-blue-600 text-4xl">{icon}</div>
            <h3 className="text-xl font-semibold mt-4">{title}</h3>
            <p className="text-gray-600 mt-2">{description}</p>
        </div>
    );
};

export default FeatureCard;
