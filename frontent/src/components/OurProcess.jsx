import React from 'react';
import { FaLightbulb, FaDraftingCompass, FaTools, FaCheckCircle } from 'react-icons/fa';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const steps = [
  {
    id: 1,
    title: 'Planning',
    description: 'We understand your needs, analyze requirements, and create a full project roadmap.',
    icon: <FaLightbulb className="text-yellow-400 text-4xl" />,
  },
  {
    id: 2,
    title: 'Designing',
    description: 'Our engineers design tailored solutions with cutting-edge technologies and precision.',
    icon: <FaDraftingCompass className="text-blue-500 text-4xl" />,
  },
  {
    id: 3,
    title: 'Installation',
    description: 'Professional on-site installation by our expert technicians for flawless performance.',
    icon: <FaTools className="text-green-500 text-4xl" />,
  },
  {
    id: 4,
    title: 'Testing',
    description: 'Thorough testing and quality checks to ensure everything works perfectly before delivery.',
    icon: <FaCheckCircle className="text-purple-500 text-4xl" />,
  },
];

const OurProcess = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });

  if (inView) {
    controls.start({ width: '100%' });
  }

  return (
    <div className="relative bg-gray-50 py-[-20px] px-6 md:px-20 overflow-hidden">
            <hr className="border-t-2 border-gray-300 mb-8" />

      
      {/* Background Patterns */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 via-transparent to-purple-100 opacity-20 pointer-events-none"></div>

      {/* Header */}
      <div className="text-center mb-20 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: -30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold text-gray-800 mb-4"
        >
          📈 Our Process
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-gray-600 text-xl"
        >
          Building success step-by-step with precision, professionalism, and passion.
        </motion.p>
      </div>

      {/* Timeline */}
      <div className="relative flex flex-col md:flex-row md:justify-between items-center md:space-x-10">

        {steps.map((step, index) => (
          <motion.div 
            key={step.id}
            className="relative z-10 bg-white p-8 rounded-xl shadow-md hover:shadow-2xl transition duration-300 text-center mb-14 md:mb-0 flex flex-col items-center w-full md:w-1/4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
          >
            <div className="flex justify-center items-center mb-6">
              {step.icon}
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </motion.div>
        ))}

        {/* Growing Connectors */}
        <div ref={ref} className="absolute top-1/2 transform -translate-y-1/2 w-full hidden md:block z-0">
          <motion.div
            className="h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-2 rounded-full"
            initial={{ width: 0 }}
            animate={controls}
            transition={{ duration: 2 }}
          >
            <div className="flex justify-between items-center absolute top-1/2 w-full transform -translate-y-1/2">
              {[...Array(4)].map((_, idx) => (
                <span key={idx} className="w-5 h-5 bg-white border-4 border-blue-500 rounded-full"></span>
              ))}
            </div>
          </motion.div>
        </div>

      </div>

      {/* CTA Button */}
      <motion.div 
        className="text-center pb-10 mt-20 relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-10 py-5 rounded-full transition duration-300 shadow-lg hover:shadow-2xl">
          🚀 Let's Get Started
        </button>
      </motion.div>

    </div>
  );
};

export default OurProcess;
