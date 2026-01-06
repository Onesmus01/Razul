import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#1E3A8A]  text-white py-12">
      {/* Footer Container */}
      <div className="max-w-screen-xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-3xl font-bold text-blue-500">GrainTech Installers</h3>
            <p className="text-gray-400">
              We provide high-quality machine installations for grain silos, automation systems, and other industrial solutions.
            </p>
            <p className="text-gray-400">Follow us for updates, news, and more.</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-blue-500">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-300 hover:text-blue-400 transition duration-300">Home</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-blue-400 transition duration-300">Services</a></li>
              <li><a href="#projects" className="text-gray-300 hover:text-blue-400 transition duration-300">Projects</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-blue-400 transition duration-300">Contact</a></li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-blue-500">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com" className="text-gray-300 hover:text-blue-500 transition duration-300">
                <FaFacebook className="text-3xl" />
              </a>
              <a href="https://www.twitter.com" className="text-gray-300 hover:text-blue-500 transition duration-300">
                <FaTwitter className="text-3xl" />
              </a>
              <a href="https://www.instagram.com" className="text-gray-300 hover:text-blue-500 transition duration-300">
                <FaInstagram className="text-3xl" />
              </a>
              <a href="https://www.linkedin.com" className="text-gray-300 hover:text-blue-500 transition duration-300">
                <FaLinkedin className="text-3xl" />
              </a>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <a href="#contact">
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105">
              🚀 Let's Get in Touch
            </button>
          </a>
        </div>
      </div>

      {/* Bottom Footer (Legal & Copyright) */}
      <div className="bg-gray-800 text-center text-gray-400 py-4 mt-12">
        <p>&copy; {new Date().getFullYear()} GrainTech Installers. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
