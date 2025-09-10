import React from 'react';
import { motion } from 'framer-motion';

const Gallery = () => {
  const videos = [
    { title: 'Machine Working', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    { title: 'Silo Installation', url: 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ' },
    { title: 'Project Completion', url: 'https://www.youtube.com/watch?v=V-_O7nl0Ii0' },
  ];

  return (
    <div className="bg-gradient-to-r from-blue-800 via-blue-600 to-blue-400 py-20 px-6 md:px-20">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-extrabold text-white mb-4"
        >
          Our Installation Gallery
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-white text-xl font-light max-w-2xl mx-auto"
        >
          Explore our latest installation projects, featuring machine setups, silo installations, and completed projects. Dive into the work we do!
        </motion.p>
      </div>

      {/* Video Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden transform hover:scale-105"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 * index, duration: 0.6 }}
          >
            <div className="relative group">
              <img
                src={`https://img.youtube.com/vi/${video.url.split('=')[1]}/0.jpg`}
                alt={video.title}
                className="w-full h-48 object-cover rounded-t-lg group-hover:opacity-80 transition duration-300"
              />
              <div className="absolute inset-0 flex justify-center items-center group-hover:bg-black/50 transition duration-300">
                <button
                  className="text-white text-5xl opacity-0 group-hover:opacity-100 transition duration-300"
                  onClick={() => window.open(video.url, '_blank')}
                >
                  🎥
                </button>
              </div>
            </div>
            <div className="p-6 bg-white rounded-b-lg">
              <h4 className="text-2xl font-semibold text-gray-800">{video.title}</h4>
              <p className="text-gray-600 text-sm mt-2">Click to watch the video in action.</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
