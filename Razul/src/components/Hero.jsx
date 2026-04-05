import { useEffect, useState, useRef, useCallback } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const images = [
  "/images/heroA.png",
  "/images/heroB.png",
  "/images/heroC.png",
  "/images/heroD.png",
  "/images/heroE.png",
  "/images/heroF.png",
];

export default function HeroSection() {
  const [imageIndex, setImageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const intervalRef = useRef(null);
  const navigate = useNavigate();

  const minSwipeDistance = 50;

  // Preload images
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Auto-slide
  const startAutoSlide = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
  }, []);

  const stopAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [startAutoSlide]);

  const handlePrev = () => {
    stopAutoSlide();
    setImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    startAutoSlide();
  };

  const handleNext = () => {
    stopAutoSlide();
    setImageIndex((prev) => (prev + 1) % images.length);
    startAutoSlide();
  };

  const goToSlide = (index) => {
    if (index === imageIndex) return;
    stopAutoSlide();
    setImageIndex(index);
    startAutoSlide();
  };

  // Touch handlers for mobile swipe
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrev();
  };

  return (
    <section 
      className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-screen overflow-hidden bg-gray-900"
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Image Slider */}
      <div
        className="flex h-full transition-transform duration-700 ease-out"
        style={{
          transform: `translateX(-${imageIndex * 100}%)`,
        }}
      >
        {images.map((img, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-full h-full relative"
          >
            <img
              src={img}
              alt={`Slide ${idx + 1}`}
              className="w-full h-full object-cover"
              loading={idx === 0 ? "eager" : "lazy"}
            />
            {/* Subtle overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />
          </div>
        ))}
      </div>

      {/* Content - Clean & Centered */}
      <div 
        className={`absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight max-w-4xl leading-tight">
          Powering Grain Solutions
        </h1>
        
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 mt-3 sm:mt-4 md:mt-6 max-w-2xl font-light leading-relaxed px-2">
          Premium machine installation for grain silos, automation systems, and industrial solutions.
        </p>

        <button 
          onClick={() => navigate('/')} 
          className="mt-6 sm:mt-8 px-6 sm:px-8 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm sm:text-base font-medium transition-colors duration-300"
        >
          Get Started
        </button>
      </div>

      {/* Navigation Arrows - Hidden on small mobile, visible on sm+ */}
      <button
        onClick={handlePrev}
        className="hidden sm:flex absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 md:p-3 rounded-full transition-all duration-300 items-center justify-center"
        aria-label="Previous slide"
      >
        <FaChevronLeft size={20} className="md:w-6 md:h-6" />
      </button>
      
      <button
        onClick={handleNext}
        className="hidden sm:flex absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 md:p-3 rounded-full transition-all duration-300 items-center justify-center"
        aria-label="Next slide"
      >
        <FaChevronRight size={20} className="md:w-6 md:h-6" />
      </button>

      {/* Slide Indicators - Bottom */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-3">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
              idx === imageIndex 
                ? "w-6 sm:w-8 bg-white" 
                : "w-1.5 sm:w-2 bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 h-0.5 sm:h-1 bg-white/20 w-full">
        <div 
          className="h-full bg-blue-500 transition-all duration-500"
          style={{ 
            width: `${((imageIndex + 1) / images.length) * 100}%`,
          }}
        />
      </div>
    </section>
  );
}