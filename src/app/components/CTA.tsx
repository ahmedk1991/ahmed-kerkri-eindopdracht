const CTA = () => {
    return (
        <section className="py-16 bg-blue-600 text-center text-white">
            <h2 className="text-3xl font-bold">Take the Most Accurate Free IQ Test</h2>
            <p className="text-lg mt-3 max-w-2xl mx-auto">
                Challenge yourself with a scientifically designed IQ test that evaluates your reasoning, problem-solving, and logical thinking skills.
                No hidden fees—get your **detailed cognitive analysis for free!**
            </p>
            <ul className="text-lg mt-6 space-y-2 text-left mx-auto max-w-xl">
                <li> <strong>Scientifically Designed:</strong> Based on real IQ assessment models.</li>
                <li> <strong>Completely Free:</strong> No hidden costs or paid upgrades.</li>
            </ul>
            <a href="/test" className="mt-6 inline-block px-6 py-3 bg-white text-blue-600 rounded-md hover:bg-gray-200 font-bold">
                Start Your Free IQ Test
            </a>
        </section>
    );
};

export default CTA;
