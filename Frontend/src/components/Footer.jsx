import React from 'react'
import footerLogo from "../assets/footer-logo.png"
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12 px-6">
            {/* Top Section */}
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
                {/* Left Side - Logo and Nav */} 
                <div className="md:w-1/2 w-full ">
                    <img src={footerLogo} alt="Logo" className="mb-6 w-40 px-5" />
                    <ul className="flex flex-col md:flex-row gap-6">
                        <li><a href="#home" className="hover:text-primary">Home</a></li>
                        <li><a href="#services" className="hover:text-primary">Services</a></li>
                        <li><a href="#about" className="hover:text-primary">About Us</a></li>
                        <li><a href="#contact" className="hover:text-primary">Contact</a></li>
                    </ul>
                </div>

                {/* Right Side - Newsletter */}
                <div className="md:w-1/2 w-full">
                    <p className="mb-6 text-sm">
                        Subscribe to our newsletter to receive the latest updates, news, and offers!
                    </p>
                    <div className="flex">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 rounded-l-md text-black border border-gray-300"
                        />
                        <button className="bg-primary px-6 py-3 rounded-r-md hover:bg-primary-dark">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center mt-12 border-t border-gray-700 pt-6">
                {/* Left Side - Privacy Links */}
                <ul className="flex gap-8 mb-6 md:mb-0 text-sm">
                    <li><a href="#privacy" className="hover:text-primary">Privacy Policy</a></li>
                    <li><a href="#terms" className="hover:text-primary">Terms of Service</a></li>
                </ul>

                {/* Right Side - Social Icons */}
                <div className="flex gap-8 p-4">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                        <FaFacebook size={28} />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                        <FaTwitter size={28} />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                        <FaInstagram size={28} />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
