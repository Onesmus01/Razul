import { useEffect, useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import asset from "../assets/assets.js";

const FeaturedProducts = () => {
  const containerRef = useRef(null);
  const [scrollIndex, setScrollIndex] = useState(0);

  const itemWidth = 320;
  const images = Object.values(asset);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const scrollToIndex = (index) => {
    const maxIndex = images.length - 1;
    const nextIndex = Math.max(0, Math.min(index, maxIndex));

    setScrollIndex(nextIndex);
    containerRef.current.scrollTo({
      left: nextIndex * itemWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="font-sans">
      {/* HERO HEADER */}
      <section className="relative py-24 px-6 text-center text-white bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.15),transparent_60%),radial-gradient(circle_at_70%_70%,rgba(96,165,250,0.25),transparent_60%)]" />
        <h1 className="relative z-10 text-5xl md:text-6xl font-extrabold mb-4">
          🌟 Featured Products
        </h1>
        <p className="relative z-10 max-w-xl mx-auto text-lg md:text-2xl text-blue-100">
          Explore our latest machines and innovations.
        </p>
      </section>

      {/* FEATURED CAROUSEL */}
      <section className="relative py-20 px-6 md:px-16 bg-gradient-to-br from-white via-blue-50 to-blue-100 overflow-hidden">
        {/* watery glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,rgba(59,130,246,0.15),transparent_60%),radial-gradient(circle_at_80%_60%,rgba(147,197,253,0.25),transparent_60%)] pointer-events-none" />

        {/* LEFT ARROW */}
        <button
          onClick={() => scrollToIndex(scrollIndex - 1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-blue-600 backdrop-blur-md shadow-lg p-3 rounded-full hover:bg-blue-600 hover:text-white transition"
        >
          <FaAngleLeft size={26} />
        </button>

        {/* RIGHT ARROW */}
        <button
          onClick={() => scrollToIndex(scrollIndex + 1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-blue-600 backdrop-blur-md shadow-lg p-3 rounded-full hover:bg-blue-600 hover:text-white transition"
        >
          <FaAngleRight size={26} />
        </button>

        {/* SLIDER */}
        <div
          ref={containerRef}
          className="relative z-10 flex gap-6 overflow-x-scroll scroll-smooth snap-x snap-mandatory no-scrollbar"
        >
          {images.map((img, idx) => (
            <div
              key={idx}
              data-aos="fade-up"
              data-aos-delay={(idx % 6) * 100}
              className="flex-shrink-0 w-80 snap-start bg-white/80 backdrop-blur-xl rounded-3xl shadow-md hover:shadow-2xl transition transform hover:-translate-y-2"
            >
              {idx % 3 === 0 && (
                <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs px-4 py-1 rounded-full shadow">
                  {idx % 6 === 0 ? "Top Rated" : "New"}
                </span>
              )}

              <img
                src={img}
                alt={`Product ${idx + 1}`}
                className="w-full h-56 object-cover rounded-t-3xl"
              />

              <div className="p-5">
                <h3 className="text-lg font-semibold text-blue-900">
                  Product {idx + 1}
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  Description for product {idx + 1}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FeaturedProducts;
