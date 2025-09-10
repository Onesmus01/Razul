import React from 'react';
import { FaLightbulb, FaDraftingCompass, FaTools } from 'react-icons/fa';
import { motion } from 'framer-motion';

const services = [
  {
    id: 1,
    title: 'Machine Installation',
    description:
      'We specialize in the efficient and precise installation of all types of machinery. Our team ensures a smooth setup for optimal performance, minimizing downtime and ensuring productivity.',
    icon: <FaLightbulb className="text-yellow-400 text-5xl group-hover:scale-110 group-hover:text-yellow-300 transition duration-300" />,
  },
  {
    id: 2,
    title: 'Silo Building',
    description:
      'Our silo building services offer durable and safe storage solutions. Whether for agricultural or industrial use, we tailor each build to meet specific client needs and industry standards.',
    icon: <FaDraftingCompass className="text-blue-500 text-5xl group-hover:text-blue-400 transition duration-300" />,
  },
  {
    id: 3,
    title: 'Industrial Automation',
    description:
      'We offer cutting-edge industrial automation solutions that optimize production lines, reduce human error, and increase operational efficiency, helping businesses stay ahead of the competition.',
    icon: <FaTools className="text-green-500 text-5xl group-hover:text-green-400 transition duration-300" />,
  },
];

const Services = () => {
  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 py-16 px-6 md:px-20 font-[Poppins]">
      <div className="text-center mb-20">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-extrabold text-gray-800 mb-4"
        >
          📈 Our Services
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-gray-600 text-lg max-w-2xl mx-auto"
        >
          Discover our premium, customized industrial services that redefine performance and reliability.
        </motion.p>
      </div>

      {/* Timeline */}
      <div className="relative pl-8 md:pl-16 border-l-4 border-blue-300">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            className="mb-20 ml-6 group relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.3, duration: 0.8 }}
          >
            {/* Icon circle */}
            <div className="absolute -left-10 top-3 w-16 h-16 bg-white border-4 border-blue-500 rounded-full flex items-center justify-center shadow-md group-hover:shadow-blue-500 transition duration-300">
              {service.icon}
            </div>

            {/* Card */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 border border-blue-100">
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA Button */}
      <motion.div
        className="text-center mt-24"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 1 }}
      >
        <button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white text-lg px-10 py-5 rounded-full shadow-xl hover:shadow-blue-400 transition duration-300 transform hover:scale-105 font-semibold">
          🚀 Let's Get Started
        </button>
      </motion.div>
    </div>
  );
};

export default Services;
