import React, { useEffect, useRef, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import asset from '../assets/assets.js';

const FeaturedProducts = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const containerRef = useRef(null);
  const [scrollIndex, setScrollIndex] = useState(0);
  const scrollAmount = 1;
  const itemWidth = 320;

  const images = Object.values(asset); // All imported images (up to 74)

  const scrollToIndex = (index) => {
    const maxIndex = images.length - 1;
    const nextIndex = index > maxIndex ? 0 : index < 0 ? maxIndex : index;
    setScrollIndex(nextIndex);
    containerRef.current.scrollTo({
      left: nextIndex * itemWidth,
      behavior: 'smooth',
    });
  };

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      scrollToIndex(scrollIndex + scrollAmount);
    }, 4000);
    return () => clearInterval(interval);
  }, [scrollIndex]);

  const nextSlide = () => scrollToIndex(scrollIndex + scrollAmount);
  const prevSlide = () => scrollToIndex(scrollIndex - scrollAmount);

  return (
    <div className="bg-gray-50 font-sans">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center py-20 px-6 text-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden shadow-md">
        <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center opacity-20 blur-sm"></div>
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 z-10 tracking-tight animate-pulse">🌟 Featured Products</h1>
        <p className="max-w-xl text-lg md:text-2xl z-10 text-white/90 animate-fade-in-up">Explore our latest machines and innovations.</p>
      </section>

      {/* Carousel */}
      <section className="relative py-16 px-6 md:px-16">
        <div className="flex justify-between items-center mb-6">
          <button onClick={prevSlide} className="text-blue-700 hover:text-blue-900 text-2xl font-bold">&larr;</button>
          <button onClick={nextSlide} className="text-blue-700 hover:text-blue-900 text-2xl font-bold">&rarr;</button>
        </div>
        <div
          ref={containerRef}
          className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory space-x-6 scrollbar-hide"
        >
          {images.map((img, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-80 snap-start bg-white rounded-3xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300 relative group"
              data-aos="fade-up"
              data-aos-delay={(idx % 6) * 100}
            >
              {idx % 3 === 0 && (
                <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-semibold px-4 py-1 rounded-full shadow-md">
                  {idx % 6 === 0 ? 'Top Rated' : 'New'}
                </span>
              )}
              <img src={img} alt={`Product ${idx + 1}`} className="w-full h-56 object-cover rounded-t-3xl" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-blue-900">Product {idx + 1}</h3>
                <p className="text-gray-600 text-sm">Description for product {idx + 1}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FeaturedProducts;
