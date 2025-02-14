const Hero = () => {
    return (
        <section className="bg-blue-50 py-20 text-center">
            <div className="container mx-auto">
                <h2 className="text-4xl font-bold text-gray-800">Discover your True Intellectual Potential</h2>
                <p className="text-gray-600 mt-4 text-lg">
                    Take a scientifically designed IQ test and get your results instantly.
                </p>
                <a href="/test" className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Start Test
                </a>
            </div>
        </section>
    );
};

export default Hero;
