import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const HeroSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  return (
    <div className="relative h-screen flex items-center justify-center text-center overflow-hidden bg-gray-900">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-bg.jpg"
          alt="Hero Background"
          className="w-full h-full object-cover opacity-40 blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 via-black/60 to-blue-900/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl px-6">
        <h1
          data-aos="fade-down"
          className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg mb-6 leading-tight tracking-wide animate-pulse"
        >
          Powering <span className="text-blue-400">Industrial Excellence</span>
        </h1>
        <p
          data-aos="fade-up"
          className="text-lg md:text-2xl text-gray-200 mb-8 leading-relaxed animate-fade-in-up"
        >
          Premium silos, smart machinery, and next-gen solutions — built for the future, delivered today.
        </p>

        {/* Buttons */}
        <div data-aos="fade-up" data-aos-delay="300" className="flex flex-wrap gap-4 justify-center mt-6">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition duration-300 shadow-lg">
            🛒 View Products
          </button>
          <button className="bg-white hover:bg-gray-100 text-blue-700 font-semibold py-3 px-8 rounded-full transition duration-300 shadow-lg">
            📞 Contact Us
          </button>
        </div>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-10 left-10 animate-bounce-slow">
        <div className="w-20 h-20 rounded-full bg-blue-500 opacity-30 blur-2xl"></div>
      </div>
      <div className="absolute bottom-20 right-10 animate-pulse">
        <div className="w-32 h-32 rounded-full bg-blue-700 opacity-20 blur-2xl"></div>
      </div>
    </div>
  );
};

export default HeroSection;
