import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import asset from '../assets/assets';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  {
    name: 'Maize Millers',
    title: 'Industrial Client',
    message: 'Professional, punctual, and passionate!',
    image: `${asset.img1}`,
    rating: 5,
  },
  {
    name: 'Benedict Nzulu',
    title: 'Project Manager',
    message: 'Flawless execution from start to finish.',
    image: `${asset.img2}`,
    rating: 5,
  },
  {
    name: 'Carlos Santana',
    title: 'Business Owner',
    message: 'Reliable and precise work.',
    image: `${asset.img4}`,
    rating: 5,
  },
  {
    name: 'Sarah Johnson',
    title: 'Operations Director',
    message: 'Exceeded all expectations.',
    image: `${asset.img1}`,
    rating: 5,
  },
];

const Testimonials = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="bg-slate-50 overflow-hidden">
      {/* Header - Compact */}
      <div className="bg-slate-900 py-6 md:py-8 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl md:text-3xl font-bold text-white mb-1">
            What Clients Say
          </h2>
          <p className="text-slate-400 text-xs md:text-sm">
            Trusted by industry leaders
          </p>
        </div>
      </div>

      {/* Testimonials - 2 per row, very small */}
      <div className="py-4 md:py-8 px-2 md:px-4 max-w-5xl mx-auto">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={8}
          slidesPerView={2}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true, dynamicBullets: true }}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 12 },
            768: { slidesPerView: 2, spaceBetween: 16 },
            1024: { slidesPerView: 4, spaceBetween: 16 },
          }}
          className="testimonial-swiper pb-8"
        >
          {testimonials.map((t, idx) => (
            <SwiperSlide key={idx}>
              <div 
                data-aos="fade-up" 
                data-aos-delay={idx * 50}
                className="bg-white rounded-lg p-2.5 md:p-4 shadow-sm border border-slate-200 h-full flex flex-col"
              >
                {/* Profile - Compact */}
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[11px] md:text-sm font-semibold text-slate-800 truncate">
                      {t.name}
                    </h3>
                    <p className="text-[9px] md:text-xs text-slate-500 truncate">{t.title}</p>
                  </div>
                </div>

                {/* Stars - Tiny */}
                <div className="flex gap-0.5 mb-1.5">
                  {[...Array(t.rating)].map((_, i) => (
                    <FaStar key={i} className="w-2 h-2 md:w-3 md:h-3 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                {/* Message - Very small */}
                <p className="text-slate-600 text-[10px] md:text-xs leading-snug">
                  "{t.message}"
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* CTA - Small */}
        <div className="text-center mt-4 md:mt-6">
          <button className="px-4 py-2 md:px-6 md:py-2.5 bg-slate-800 text-white text-xs md:text-sm rounded-full hover:bg-slate-700 transition-colors shadow active:scale-95">
            More Reviews
          </button>
        </div>
      </div>

      {/* Custom Swiper Styles */}
      <style jsx>{`
        .testimonial-swiper .swiper-pagination-bullet {
          width: 4px;
          height: 4px;
          background: #cbd5e1;
          opacity: 1;
        }
        .testimonial-swiper .swiper-pagination-bullet-active {
          width: 12px;
          border-radius: 2px;
          background: #475569;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
