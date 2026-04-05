import React from 'react';
import { FaLightbulb, FaDraftingCompass, FaTools, FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const steps = [
  {
    id: 1,
    title: 'Planning',
    description: 'We understand your needs and create a full project roadmap.',
    icon: FaLightbulb,
    color: 'text-yellow-500',
  },
  {
    id: 2,
    title: 'Designing',
    description: 'Our engineers design tailored solutions with precision.',
    icon: FaDraftingCompass,
    color: 'text-blue-500',
  },
  {
    id: 3,
    title: 'Installation',
    description: 'Professional on-site installation by expert technicians.',
    icon: FaTools,
    color: 'text-green-500',
  },
  {
    id: 4,
    title: 'Testing',
    description: 'Thorough testing to ensure everything works perfectly.',
    icon: FaCheckCircle,
    color: 'text-purple-500',
  },
];

const OurProcess = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="relative bg-slate-50 py-10 md:py-16 px-4 md:px-8 overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100" />
      
      {/* Header */}
      <div className="relative text-center mb-8 md:mb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-3 py-1 rounded-full bg-slate-200 text-slate-600 text-xs font-medium mb-3">
            How We Work
          </span>
          <h2 className="text-2xl md:text-4xl font-bold text-slate-800 mb-2">
            Our Process
          </h2>
          <p className="text-sm md:text-base text-slate-500 max-w-xl mx-auto px-2">
            Building success step-by-step with precision and professionalism.
          </p>
        </motion.div>
      </div>

      {/* Steps Grid */}
      <div ref={ref} className="relative max-w-6xl mx-auto">
        {/* Desktop Connector Line */}
        <div className="hidden md:block absolute top-16 left-0 right-0 h-0.5 bg-slate-200" />
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative"
              >
                {/* Desktop Number Connector */}
                <div className="hidden md:flex absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white border-2 border-slate-300 rounded-full items-center justify-center text-xs font-bold text-slate-600 z-10">
                  {step.id}
                </div>
                
                <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow text-center">
                  {/* Mobile Number */}
                  <div className="md:hidden absolute -top-2 -left-2 w-6 h-6 bg-slate-800 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {step.id}
                  </div>
                  
                  {/* Icon */}
                  <div className="flex justify-center mb-3 md:mb-4">
                    <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-slate-50">
                      <Icon className={`text-2xl md:text-3xl ${step.color}`} />
                    </div>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-sm md:text-lg font-semibold text-slate-800 mb-1 md:mb-2">
                    {step.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="text-center mt-8 md:mt-12"
      >
        <button className="px-6 py-2.5 md:px-8 md:py-3 bg-slate-800 text-white text-sm md:text-base rounded-full hover:bg-slate-700 transition-colors shadow-lg active:scale-95">
          Let's Get Started
        </button>
      </motion.div>
    </section>
  );
};

export default OurProcess;