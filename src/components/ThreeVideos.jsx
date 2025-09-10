import React, { useEffect, useRef, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import videos from '../assets/videos'; // ✅ Import actual videos

const FeaturedVideos = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const containerRef = useRef(null);
  const [scrollIndex, setScrollIndex] = useState(0);
  const scrollAmount = 1;
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
    const nextIndex = index > maxIndex ? 0 : index < 0 ? maxIndex : index;
    setScrollIndex(nextIndex);
    containerRef.current.scrollTo({
      left: nextIndex * itemWidth,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      scrollToIndex(scrollIndex + scrollAmount);
    }, 6000);
    return () => clearInterval(interval);
  }, [scrollIndex]);

  const nextSlide = () => scrollToIndex(scrollIndex + scrollAmount);
  const prevSlide = () => scrollToIndex(scrollIndex - scrollAmount);

  return (
    <div className="bg-gray-100 font-sans">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center py-20 px-6 text-center bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 text-white overflow-hidden shadow-md">
        <div className="absolute inset-0 bg-[url('/images/video-bg.jpg')] bg-cover bg-center opacity-20 blur-sm"></div>
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 z-10 tracking-tight animate-pulse">🎬 Featured Videos</h1>
        <p className="max-w-xl text-lg md:text-2xl z-10 text-white/90 animate-fade-in-up">
          Watch our latest tutorials and insights in action.
        </p>
      </section>

      {/* Video Carousel */}
      <section className="relative py-16 px-6 md:px-16">
        <div className="flex justify-between items-center mb-6">
          <button onClick={prevSlide} className="text-purple-700 hover:text-purple-900 text-2xl font-bold">&larr;</button>
          <button onClick={nextSlide} className="text-purple-700 hover:text-purple-900 text-2xl font-bold">&rarr;</button>
        </div>
        <div
          ref={containerRef}
          className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory space-x-6 scrollbar-hide"
        >
          {videoList.map((video, idx) => (
            <div
              key={video.id}
              className="flex-shrink-0 w-[360px] snap-start bg-white rounded-3xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300 relative group"
              data-aos="fade-up"
              data-aos-delay={(idx % 6) * 100}
            >
              {/* Badges */}
              {video.badge && (
                <span className="absolute top-4 left-4 bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                  {video.badge}
                </span>
              )}
              <span className="absolute bottom-4 right-4 bg-black/70 text-white text-xs font-semibold px-2 py-1 rounded-md shadow">
                4K
              </span>

              {/* Video */}
              <video
                controls
                preload="auto"
                playsInline
                className="w-full h-60 object-cover rounded-t-3xl"
              >
                <source src={video.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Description */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-purple-900">{video.title}</h3>
                <p className="text-gray-600 text-sm">{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FeaturedVideos;
