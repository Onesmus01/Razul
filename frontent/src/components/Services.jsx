import React from 'react';
import { FaLightbulb, FaDraftingCompass, FaTools } from 'react-icons/fa';
import { motion } from 'framer-motion';

const services = [
  {
    id: 1,
    title: 'Machine Installation',
    description:
      'We specialize in the efficient and precise installation of all types of machinery. Our team ensures a smooth setup for optimal performance, minimizing downtime and ensuring productivity.',
    icon: <FaLightbulb className="text-yellow-400 text-5xl" />,
  },
  {
    id: 2,
    title: 'Silo Building',
    description:
      'Our silo building services offer durable and safe storage solutions. Whether for agricultural or industrial use, we tailor each build to meet specific client needs and industry standards.',
    icon: <FaDraftingCompass className="text-blue-500 text-5xl" />,
  },
  {
    id: 3,
    title: 'Industrial Automation',
    description:
      'We offer cutting-edge industrial automation solutions that optimize production lines, reduce human error, and increase operational efficiency, helping businesses stay ahead of the competition.',
    icon: <FaTools className="text-green-500 text-5xl" />,
  },
];

const Services = () => {
  return (
    <div className="bg-gray-50 py-0 px-16 md:px-16 lg:px-24">
      {/* Horizontal Rule Separation */}
      <hr className="border-t-2 border-gray-300 mb-8" />

      {/* Page Header */}
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-gray-800 mb-4"
        >
          📈 Our Services
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-gray-600 text-lg max-w-2xl mx-auto"
        >
          We offer world-class services designed to meet the unique needs of the industrial and machinery sectors. Explore our diverse range of services below:
        </motion.p>
      </div>

      {/* Timeline Section */}
      <div className="relative border-l-4 border-blue-500">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            className="mb-16 ml-10 group"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.3, duration: 0.8 }}
          >
            <div className="absolute -left-6 top-0 flex items-center justify-center bg-blue-500 text-white rounded-full w-14 h-14 group-hover:bg-blue-700 transition duration-300">
              {service.icon}
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
              <h3 className="text-3xl font-bold text-gray-800 mb-3">{service.title}</h3>
              <p className="text-gray-600 text-lg">{service.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA Button Section */}
      <motion.div
        className="text-center mt-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 1 }}
      >
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-10 py-5 rounded-full transition duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
          🚀 Let's Get Started
        </button>
      </motion.div>
    </div>
  );
};

export default Services;
