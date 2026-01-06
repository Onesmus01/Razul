import React from 'react';
import { FaTools, FaUsersCog, FaAward } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <div className="bg-slate-900 text-white min-h-screen px-6 py-12 lg:px-20 font-sans">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Razul Group Installation Company</h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Professional installations with excellence and integrity. We serve homes, businesses, and industries with reliable solutions you can trust.
        </p>
      </div>

      {/* About Content Section */}
      <div className="flex flex-col-reverse lg:flex-row items-center gap-10 mb-20">
        <div className="w-full lg:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1581092919531-25c43f1f2d0e?auto=format&fit=crop&w=1050&q=80"
            alt="Installation Team"
            className="rounded-3xl shadow-lg"
          />
        </div>
        <div className="w-full lg:w-1/2 text-left space-y-5">
          <h2 className="text-3xl font-semibold text-white">Who We Are</h2>
          <p className="text-gray-300">
            Razul Group Installation Company is a trusted name in electrical, security, and industrial installations. With over a decade of hands-on experience,
            we’ve built our reputation on precision, safety, and customer satisfaction.
          </p>
          <p className="text-gray-300">
            Our dedicated team of experts ensures seamless setup and support, tailored to meet client-specific requirements across all sectors.
          </p>
        </div>
      </div>

      {/* Values and Stats */}
      <div className="grid md:grid-cols-3 gap-8 text-center mb-20">
        <div className="bg-white/10 border border-white/10 rounded-xl p-8 hover:bg-white/20 transition-all duration-300">
          <FaTools className="text-4xl mx-auto text-teal-400 mb-4" />
          <h3 className="text-xl font-bold mb-2">1000+ Installations</h3>
          <p className="text-gray-300">Successfully completed with consistent client satisfaction.</p>
        </div>
        <div className="bg-white/10 border border-white/10 rounded-xl p-8 hover:bg-white/20 transition-all duration-300">
          <FaUsersCog className="text-4xl mx-auto text-orange-400 mb-4" />
          <h3 className="text-xl font-bold mb-2">Expert Team</h3>
          <p className="text-gray-300">Certified professionals ready to deliver and support.</p>
        </div>
        <div className="bg-white/10 border border-white/10 rounded-xl p-8 hover:bg-white/20 transition-all duration-300">
          <FaAward className="text-4xl mx-auto text-yellow-400 mb-4" />
          <h3 className="text-xl font-bold mb-2">10+ Years of Experience</h3>
          <p className="text-gray-300">A proven legacy of excellence and reliability.</p>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="bg-white/10 rounded-2xl p-10 text-center">
        <h2 className="text-3xl font-semibold mb-4 text-white">Our Mission</h2>
        <p className="text-gray-300 max-w-4xl mx-auto">
          At Razul Group, we aim to empower individuals, homes, and businesses with reliable, safe, and cutting-edge installation solutions.
          We are driven by professionalism, innovation, and an unwavering commitment to quality.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;