import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import asset from '../assets/assets';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const testimonials = [
  {
    name: 'John Doe',
    title: 'Homeowner',
    message: 'This team transformed my house completely. Professional, punctual, and passionate!',
    image: `${asset.img1}`,
  },
  {
    name: 'Jane Smith',
    title: 'Project Manager',
    message: 'Flawless execution from planning to installation. Couldn’t have asked for more.',
    image: `${asset.img2}`,
  },
  {
    name: 'Carlos Santana',
    title: 'Business Owner',
    message: 'Reliable and precise. Our office space looks futuristic thanks to them.',
    image: `${asset.img4}`,
  },
];

const Testimonials = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="overflow-x-hidden bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="relative text-center py-24 px-6 bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-6 leading-tight">
            What Our Clients Say
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-indigo-700 font-medium italic tracking-wide leading-relaxed mb-8 max-w-3xl mx-auto shadow-sm bg-white/50 backdrop-blur-lg rounded-xl px-6 py-4">
  Discover properties that match your style, comfort, and budget — all in one stunning platform.
</p>

        </div>

        {/* SVG Waves */}
        <svg className="absolute bottom-0 w-full z-0 pointer-events-none" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="waveTopGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#c7d2fe" />
            <stop offset="100%" stopColor="#a5f3fc" />
          </linearGradient>
          <linearGradient id="waveMidGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="waveBackGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.5" />
          </linearGradient>
          <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
          </filter>
        </defs>

        <path
          d="M0,240L60,213.3C120,187,240,133,360,144C480,155,600,229,720,229.3C840,229,960,155,1080,133.3C1200,112,1320,144,1380,160L1440,176V320H0Z"
          fill="url(#waveBackGradient)"
          filter="url(#blur)"
          className="animate-[wave-sway_14s_ease-in-out_infinite]"
        />
        <path
          d="M0,224L48,229.3C96,235,192,245,288,229.3C384,213,480,171,576,170.7C672,171,768,213,864,234.7C960,256,1056,256,1152,240C1248,224,1344,192,1392,176L1440,160V320H0Z"
          fill="url(#waveMidGradient)"
          className="animate-[wave-sway_10s_ease-in-out_infinite]"
        />
        <path
          d="M0,256L48,245.3C96,235,192,213,288,202.7C384,192,480,192,576,181.3C672,171,768,149,864,160C960,171,1056,213,1152,234.7C1248,256,1344,256,1392,245.3L1440,235V320H0Z"
          fill="url(#waveTopGradient)"
          style={{ mixBlendMode: 'screen' }}
          className="animate-[wave-sway_8s_ease-in-out_infinite]"
        />

        <style>{`
          @keyframes wave-sway {
            0%, 100% { transform: translateX(0); }
            50% { transform: translateX(-25px); }
          }
        `}</style>
      </svg>
      </section>

      {/* Testimonials Carousel */}
      <section className="relative z-10 bg-gradient-to-br from-white via-[#f7f7f7] to-[#e1e1e1] py-32 px-8 md:px-32 overflow-hidden text-gray-900 font-sans">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-indigo-500 to-purple-600 text-6xl font-extrabold mb-20 tracking-tight drop-shadow-2xl animate-pulse-low">
      Proved testimonials
    </h2>

    <Swiper
      modules={[Autoplay, Pagination, Navigation, EffectFade]}
      spaceBetween={40}
      slidesPerView={1}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      loop={true}
      breakpoints={{
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
    >
      {testimonials.map((t, idx) => (
        <SwiperSlide key={idx}>
          <div
            data-aos="fade-up"
            className="bg-opacity-70 backdrop-blur-2xl border-4 border-indigo-700/20 rounded-3xl p-12 shadow-[0_15px_50px_rgba(93,72,255,0.3)] hover:shadow-xl hover:shadow-indigo-600/70 transition-all duration-500 ease-in-out transform hover:-translate-y-6 relative group"
          >
            {/* Premium Gradient Glow */}
            <div className="absolute -top-8 -right-8 w-48 h-48 bg-gradient-to-br from-indigo-600 via-pink-500 to-purple-400 opacity-25 blur-3xl rounded-full z-0 group-hover:scale-125 transition-transform duration-800 ease-in-out" />

            <div className="relative z-10 text-center">
              {/* Profile Image */}
              <img
                src={t.image}
                alt={t.name}
                className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-white shadow-lg mb-6 grayscale-0 hover:grayscale-0 transition-all ease-in-out duration-300"
              />

              {/* Name */}
              <h3 className="text-3xl font-semibold text-gray-800 mb-2 tracking-wide">
                {t.name}
              </h3>

              {/* Title */}
              <p className="text-sm text-gray-600 italic mb-5">{t.title}</p>

              {/* Star Rating */}
              <div className="flex justify-center gap-2 mb-5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.562-.955L10 0l2.95 5.955 6.562.955-4.756 4.635 1.122 6.545z" />
                  </svg>
                ))}
              </div>

              {/* Testimonial Message */}
              <p className="text-lg text-gray-800 leading-relaxed italic">
                “{t.message}”
              </p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>

    {/* CTA Button */}
    <div className="text-center mt-20">
      <button className="px-10 py-5 text-xl font-semibold bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full text-white shadow-2xl hover:scale-105 hover:shadow-indigo-600/50 transition-transform duration-300">
        See More Stories
      </button>
    </div>
  </div>

  {/* Decorative Background Effects */}
  <div className="absolute inset-0 pointer-events-none z-0">
    <div className="absolute top-0 left-1/2 w-96 h-96 bg-gradient-to-br from-teal-500 via-indigo-500 to-pink-400 opacity-10 blur-3xl animate-pulse-slow rounded-full" />
    <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-gradient-to-bl from-yellow-300 via-orange-500 to-red-500 opacity-20 blur-2xl animate-pulse-slow rounded-full" />
  </div>

  <style jsx>{`
    @keyframes pulse-slow {
      0%, 100% { opacity: 0.05; transform: scale(1); }
      50% { opacity: 0.1; transform: scale(1.15); }
    }
    .animate-pulse-slow {
      animation: pulse-slow 8s ease-in-out infinite;
    }
  `}</style>
</section>


      {/* Call to Action */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 py-20 px-6 text-white text-center">
        <svg className="absolute top-0 w-full -translate-y-full rotate-180" viewBox="0 0 1440 320">
          <path
            fill="#ffffff"
            d="M0,224L48,229.3C96,235,192,245,288,229.3C384,213,480,171,576,170.7C672,171,768,213,864,234.7C960,256,1056,256,1152,240C1248,224,1344,192,1392,176L1440,160V320H0Z"
          />
        </svg>
        <h2 className="text-4xl font-extrabold mb-6">Ready to transform your space?</h2>
        <p className="text-lg max-w-xl mx-auto mb-10 text-gray-100">
          Let’s work together to bring your vision to life. Contact us for a free consultation today.
        </p>
        <a href="#contact">
          <button className="bg-white text-blue-800 font-semibold py-3 px-10 rounded-full shadow-xl hover:bg-blue-100 hover:scale-105 transition-all">
            Get in Touch
          </button>
        </a>
      </section>
    </div>
  );
};

export default Testimonials;
