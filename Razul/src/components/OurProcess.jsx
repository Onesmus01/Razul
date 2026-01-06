import React from 'react';
import { FaLightbulb, FaDraftingCompass, FaTools, FaCheckCircle } from 'react-icons/fa';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const steps = [
  {
    id: 1,
    title: 'Planning',
    description: 'We understand your needs, analyze requirements, and create a full project roadmap.',
    icon: <FaLightbulb className="text-yellow-400 text-5xl drop-shadow-lg" />,
  },
  {
    id: 2,
    title: 'Designing',
    description: 'Our engineers design tailored solutions with cutting-edge technologies and precision.',
    icon: <FaDraftingCompass className="text-blue-500 text-5xl drop-shadow-lg" />,
  },
  {
    id: 3,
    title: 'Installation',
    description: 'Professional on-site installation by our expert technicians for flawless performance.',
    icon: <FaTools className="text-green-500 text-5xl drop-shadow-lg" />,
  },
  {
    id: 4,
    title: 'Testing',
    description: 'Thorough testing and quality checks to ensure everything works perfectly before delivery.',
    icon: <FaCheckCircle className="text-purple-500 text-5xl drop-shadow-lg" />,
  },
];

const OurProcess = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });

  if (inView) controls.start({ width: '100%' });

  return (
    <div className="relative bg-gradient-to-br from-white via-gray-50 to-blue-50 py-16 px-6 md:px-20 overflow-hidden">
      <hr className="border-t-2 border-gray-300 mb-12" />

      {/* Decorative Background Blobs */}
      <div className="absolute top-[-50px] left-[-60px] w-80 h-80 bg-blue-100 rounded-full filter blur-3xl opacity-30 z-0"></div>
      <div className="absolute bottom-[-50px] right-[-60px] w-80 h-80 bg-purple-100 rounded-full filter blur-3xl opacity-30 z-0"></div>

      {/* Header */}
      <div className="text-center mb-20 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: -30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold text-gray-800 mb-4 tracking-wide"
        >
          🔧 Our Process
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-gray-600 text-xl max-w-2xl mx-auto"
        >
          Building success step-by-step with precision, professionalism, and passion.
        </motion.p>
      </div>

      {/* Timeline Steps */}
      <div className="relative flex flex-col md:flex-row md:justify-between items-center md:space-x-10">
        {steps.map((step, index) => (
          <motion.div 
            key={step.id}
            className="relative z-10 bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition duration-300 text-center mb-14 md:mb-0 flex flex-col items-center w-full md:w-1/4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
          >
            <div className="flex justify-center items-center mb-6 bg-gradient-to-br from-white to-gray-100 p-4 rounded-full shadow-inner">
              {step.icon}
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">{step.title}</h3>
            <p className="text-gray-600 text-md leading-relaxed">{step.description}</p>
          </motion.div>
        ))}

        {/* Connecting Line */}
        <div ref={ref} className="absolute top-1/2 transform -translate-y-1/2 w-full hidden md:block z-0">
          <motion.div
            className="h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-4 rounded-full"
            initial={{ width: 0 }}
            animate={controls}
            transition={{ duration: 2 }}
          >
            <div className="flex justify-between items-center absolute top-1/2 w-full transform -translate-y-1/2 px-6">
              {[...Array(4)].map((_, idx) => (
                <span key={idx} className="w-5 h-5 bg-white border-4 border-blue-500 rounded-full shadow-md"></span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Call-to-Action Button */}
      <motion.div 
        className="text-center pb-10 mt-24 relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-10 py-5 rounded-full transition duration-300 shadow-lg hover:shadow-2xl hover:scale-105">
          🚀 Let's Get Started
        </button>
      </motion.div>
    </div>
  );
};

export default OurProcess;
