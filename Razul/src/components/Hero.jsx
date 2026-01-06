import { useEffect, useState, useRef } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import logo from "../assets/logo.jpg";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

// Hero images
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
  const slideRef = useRef(null);

  const navigate = useNavigate();

  // Auto-slide every 4 seconds
  useEffect(() => {
    AOS.init({ duration: 1200 });

    const interval = setInterval(() => {
      nextSlide();
    }, 9000);

    return () => clearInterval(interval);
  }, [imageIndex]);

  const prevSlide = () => {
    setImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setImageIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Slider wrapper */}
      <div
        className="flex transition-transform duration-1000 ease-in-out h-full"
        style={{
          transform: `translateX(-${imageIndex * 100}%)`,
        }}
        ref={slideRef}
      >
        {images.map((img, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-full h-screen relative"
          >
            <img
              src={img}
              alt={`Slide ${idx + 1}`}
              className="w-full h-full object-cover"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/5 bg-opacity-0 z-10" />
            {/* Hero content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 px-6 pt-24">
              <img
                src={logo}
                alt="Logo"
                className="w-40 h-40 object-cover mb-6 rounded-full shadow-xl animate-bounce-slow"
              />
              <h1
                className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg"
                style={{ fontFamily: "Playfair Display" }}
              >
                Powering Grain Solutions
              </h1>
              <p className="text-lg md:text-2xl text-gray-200 mt-4 max-w-3xl">
                Premium machine installation for grain silos, automation systems,
                and industrial solutions.
              </p>
              <button onClick={()=>navigate('/')} className="mt-8 px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-full text-lg font-semibold shadow-lg transition duration-300">
                Get Started
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-5 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition z-30"
      >
        <FaAngleLeft size={30} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-5 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition z-30"
      >
        <FaAngleRight size={30} />
      </button>
    </div>
  );
}
