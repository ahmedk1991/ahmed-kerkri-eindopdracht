import { useRouter } from "next/navigation";

const CTA = () => {
    const router = useRouter();

    const handleClick = () => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            router.push("/test");
        } else {
            router.push("/login");
        }
    };

    return (
        <section className="py-16 bg-blue-600 text-center text-white">
            <h2 className="text-3xl font-bold">Take the Most Accurate Free IQ Test</h2>
            <p className="text-lg mt-3 max-w-2xl mx-auto">
                Challenge yourself with a scientifically designed IQ test that evaluates your reasoning, problem-solving, and logical thinking skills.
                No hidden fees—get your **detailed cognitive analysis for free!**
            </p>
            <ul className="text-lg mt-6 space-y-2 text-left mx-auto max-w-xl"></ul>

            <button
                onClick={handleClick}
                className="mt-6 inline-block px-6 py-3 bg-white text-blue-600 rounded-md hover:bg-gray-200 font-bold"
            >
                Start Your Free IQ Test
            </button>
        </section>
    );
};

export default CTA;
