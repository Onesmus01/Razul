import React, { useEffect, useRef, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import videos from '../assets/videos';

const FeaturedVideos = () => {
  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  const containerRef = useRef(null);
  const [scrollIndex, setScrollIndex] = useState(0);

  const itemWidth = 360;

  const videoList = Object.values(videos).map((src, i) => ({
    id: i + 1,
    title: `Tutorial Video ${i + 1}`,
    description: `Description for video ${i + 1}`,
    src,
    badge: i % 2 === 0 ? 'New' : 'Top Rated',
  }));

  const scrollToIndex = (index) => {
    const maxIndex = videoList.length - 1;
    const nextIndex = Math.max(0, Math.min(index, maxIndex));
    setScrollIndex(nextIndex);

    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: nextIndex * itemWidth,
        behavior: 'smooth',
      });
    }
  };

  const nextSlide = () => scrollToIndex(scrollIndex + 1);
  const prevSlide = () => scrollToIndex(scrollIndex - 1);

  return (
    <div className="bg-gray-100 font-sans">
      {/* Hero */}
      <section className="relative py-20 text-center bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 text-white shadow-lg">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
          🎬 Featured Videos
        </h1>
        <p className="max-w-xl mx-auto text-lg md:text-xl text-white/90">
          Watch our latest tutorials and insights in action
        </p>
      </section>

      {/* Carousel */}
      <section className="relative py-16 px-6 md:px-16">
        {/* Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg p-3 rounded-full hover:bg-purple-100 transition"
        >
          <FaAngleLeft className="text-purple-700 text-2xl" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg p-3 rounded-full hover:bg-purple-100 transition"
        >
          <FaAngleRight className="text-purple-700 text-2xl" />
        </button>

        {/* Videos */}
        <div
          ref={containerRef}
          className="flex overflow-x-hidden space-x-8"
        >
          {videoList.map((video, idx) => (
            <div
              key={video.id}
              className="flex-shrink-0 w-[360px] bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 group"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              {/* Badge */}
              <span className="absolute top-4 left-4 bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                {video.badge}
              </span>

              {/* Video */}
              <video
                controls
                playsInline
                className="w-full h-60 object-cover rounded-t-3xl"
              >
                <source src={video.src} type="video/mp4" />
              </video>

              {/* Info */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-purple-900 mb-1">
                  {video.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FeaturedVideos;
