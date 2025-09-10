// src/components/TechHub.jsx
import React from 'react'
import Machine1 from '../assets/machine1.jpg' // Add your images/videos here
import Machine2 from '../assets/machine2.jpg'
import MachineVideo from '../assets/machine-demo.mp4' // Local video or use YouTube embed

export default function TechHub() {
  return (
    <section className="w-full bg-white py-16 px-6 sm:px-10">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800" style={{ fontFamily: 'Playfair Display, serif' }}>
          TechHub – Our Machines in Action
        </h1>
        <hr className="mt-4 w-24 border-t-4 border-orange-500 mx-auto rounded-full" />
        <p className="mt-4 text-gray-600 text-lg max-w-xl mx-auto" style={{ fontFamily: 'Raleway, sans-serif' }}>
          Explore our state-of-the-art agricultural machines and how they power your productivity.
        </p>
      </div>

      {/* Machines Grid */}
      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        <div className="rounded-xl shadow-lg hover:shadow-orange-200 transition duration-300 overflow-hidden">
          <img src={Machine1} alt="Machine 1" className="object-cover w-full h-72" />
          <div className="p-4">
            <h3 className="text-xl font-semibold text-gray-800">Precision Planter</h3>
            <p className="text-gray-600 mt-2">
              High-efficiency planting machine for all terrain. Boosts yield with less labor.
            </p>
          </div>
        </div>

        <div className="rounded-xl shadow-lg hover:shadow-orange-200 transition duration-300 overflow-hidden">
          <img src={Machine2} alt="Machine 2" className="object-cover w-full h-72" />
          <div className="p-4">
            <h3 className="text-xl font-semibold text-gray-800">Grain Dryer Pro</h3>
            <p className="text-gray-600 mt-2">
              Fast, fuel-efficient grain drying system — retain quality, reduce post-harvest loss.
            </p>
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div className="mt-20 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
          Watch Our Machines in Action
        </h2>
        <div className="rounded-2xl overflow-hidden shadow-xl hover:shadow-orange-300 transition duration-500">
          <video
            src={MachineVideo}
            controls
            className="w-full h-[400px] object-cover"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  )
}
