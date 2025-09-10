import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.jpg';
import hero1 from '../assets/hero1.jpg';
import hero2 from '../assets/hero2.jpg';
// import hero3 from '../assets/hero3.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css';

const images = [hero1, hero2, hero2];

export default function HeroSection() {
  const [navbarSmall, setNavbarSmall] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 1200 });

    const handleScroll = () => {
      if (window.scrollY > 50) setNavbarSmall(true);
      else setNavbarSmall(false);
    };
    window.addEventListener('scroll', handleScroll);

    const interval = setInterval(() => {
      setImageIndex(prev => (prev + 1) % images.length);
    }, 4000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background image slideshow */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{ backgroundImage: `url(${images[imageIndex]})`, opacity: 0.7 }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-10" />

      {/* Navbar */}
      {/* <nav
        className={`fixed w-full z-50 top-0 transition-all duration-300 ease-in-out backdrop-blur-md ${
          navbarSmall ? 'py-2 shadow-md bg-white/80' : 'py-6 bg-white/30'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Company Logo" className="w-14 h-14 object-cover rounded-full shadow-md" />
            <h1 className="text-2xl font-bold text-blue-800" style={{ fontFamily: 'Playfair Display' }}>
              GrainTech Installers
            </h1>
          </div>
          <ul className="hidden md:flex space-x-6 text-gray-700 font-semibold text-lg">
            <li className="hover:text-blue-700 cursor-pointer">Home</li>
            <li className="hover:text-blue-700 cursor-pointer">Services</li>
            <li className="hover:text-blue-700 cursor-pointer">Projects</li>
            <li className="hover:text-blue-700 cursor-pointer">Contact</li>
          </ul>
        </div>
      </nav> */}

      {/* Hero Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center min-h-screen px-6 pt-24">
        <img src={logo} alt="Main Logo" className="w-40 h-40 object-cover mb-6 rounded-full shadow-xl animate-bounce-slow" />
        <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg" style={{ fontFamily: 'Playfair Display' }}>
          Powering Grain Solutions
        </h1>
        <p className="text-lg md:text-2xl text-gray-200 mt-4 max-w-3xl">
          Premium machine installation for grain silos, automation systems, and industrial solutions.
        </p>
        <button className="mt-8 px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-full text-lg font-semibold shadow-lg transition duration-300">
          Get Started
        </button>
      </div>
    </div>
  );
}
