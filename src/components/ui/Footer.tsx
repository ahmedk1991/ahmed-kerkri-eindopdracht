import { FaBrain, FaFacebook, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-10 mt-auto ">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-lg font-semibold flex items-center space-x-2 m-3">
                        <FaBrain />
                        <span>IQ Master</span>
                    </h3>
                    <p className="text-lg my-2.5 m-3">Discover and unlock your true <br/>
                        intellectual potential with our certified <br/>
                        IQ tests.</p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold">Quick links</h3>
                    <ul className="mt-4 space-y-2">
                        <li><a href="/" className="hover:underline">Home</a></li>
                        <li><a href="/about" className="hover:underline">About</a></li>
                        <li><a href="/contact" className="hover:underline">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold">Legal</h3>
                    <ul className="mt-4 space-y-2">
                        <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                        <li><a href="#" className="hover:underline">Terms of Service</a></li>
                        <li><a href="#" className="hover:underline">Cookie Policy</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold">Follow Us</h3>
                    <ul className="mt-4 flex items-center space-x-4">
                        <li><a href="#" className="hover:underline"><FaTwitter /></a></li>
                        <li><a href="#" className="hover:underline"><FaFacebook /></a></li>
                        <li><a href="#" className="hover:underline"><FaInstagram /></a></li>
                        <li><a href="#" className="hover:underline"><FaLinkedinIn /></a></li>
                    </ul>
                </div>
            </div>

            <p className="text-center mt-10 py-6">&copy; {new Date().getFullYear()} IQ Master. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
