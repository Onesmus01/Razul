import { useEffect, useRef, useState, useCallback } from "react";
import { FaAngleLeft, FaAngleRight, FaStar, FaHeart, FaEye, FaShoppingCart } from "react-icons/fa";
import { Sparkles, TrendingUp, Zap, ArrowRight } from "lucide-react";
import asset from "../assets/assets.js";

const FeaturedProducts = () => {
  const mobileRef = useRef(null);
  const desktopRef = useRef(null);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [desktopIndex, setDesktopIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [likedItems, setLikedItems] = useState(new Set());
  const [canScrollMobile, setCanScrollMobile] = useState({ left: false, right: true });
  const [canScrollDesktop, setCanScrollDesktop] = useState({ left: false, right: true });

  const images = Object.values(asset);
  const totalItems = images.length;
  
  // Mobile: 2 items per view, Desktop: 4 items per view
  const mobileItemsPerView = 2;
  const desktopItemsPerView = 4;
  const maxMobileIndex = Math.ceil(totalItems / mobileItemsPerView) - 1;
  const maxDesktopIndex = Math.ceil(totalItems / desktopItemsPerView) - 1;

  // Check viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Check scroll position for button states
  const checkScrollPosition = useCallback((ref, setCanScroll) => {
    if (!ref.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = ref.current;
    const maxScroll = scrollWidth - clientWidth;
    
    setCanScroll({
      left: scrollLeft > 10,
      right: scrollLeft < maxScroll - 10
    });
  }, []);

  // Mobile scroll handler
  const handleMobileScroll = useCallback(() => {
    if (!mobileRef.current) return;
    const { scrollLeft, clientWidth } = mobileRef.current;
    const itemWidth = (clientWidth - 12) / 2;
    const newIndex = Math.round(scrollLeft / ((itemWidth + 6) * 2));
    setMobileIndex(Math.min(newIndex, maxMobileIndex));
    checkScrollPosition(mobileRef, setCanScrollMobile);
  }, [maxMobileIndex]);

  // Desktop scroll handler
  const handleDesktopScroll = useCallback(() => {
    if (!desktopRef.current) return;
    const { scrollLeft } = desktopRef.current;
    const itemWidth = 300;
    const newIndex = Math.round(scrollLeft / (itemWidth * 4));
    setDesktopIndex(Math.min(newIndex, maxDesktopIndex));
    checkScrollPosition(desktopRef, setCanScrollDesktop);
  }, [maxDesktopIndex]);

  // Scroll to specific index
  const scrollToIndex = useCallback((ref, index, isMobileView) => {
    if (!ref.current) return;
    
    if (isMobileView) {
      const { clientWidth } = ref.current;
      const itemWidth = (clientWidth - 12) / 2;
      const scrollPos = index * (itemWidth + 6) * 2;
      ref.current.scrollTo({ left: scrollPos, behavior: 'smooth' });
    } else {
      const itemWidth = 300;
      const scrollPos = index * itemWidth * 4;
      ref.current.scrollTo({ left: scrollPos, behavior: 'smooth' });
    }
  }, []);

  // Navigation functions
  const mobilePrev = () => scrollToIndex(mobileRef, Math.max(0, mobileIndex - 1), true);
  const mobileNext = () => scrollToIndex(mobileRef, Math.min(maxMobileIndex, mobileIndex + 1), true);
  const desktopPrev = () => scrollToIndex(desktopRef, Math.max(0, desktopIndex - 1), false);
  const desktopNext = () => scrollToIndex(desktopRef, Math.min(maxDesktopIndex, desktopIndex + 1), false);

  // Like toggle
  const toggleLike = (idx) => {
    setLikedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(idx)) newSet.delete(idx);
      else newSet.add(idx);
      return newSet;
    });
  };

  // Badge helper
  const getBadge = (idx) => {
    if (idx === 0) return { text: "Bestseller", icon: TrendingUp, color: "from-amber-500 to-orange-500", shadow: "shadow-amber-500/30" };
    if (idx === 1) return { text: "New", icon: Sparkles, color: "from-emerald-500 to-teal-500", shadow: "shadow-emerald-500/30" };
    if (idx % 5 === 0) return { text: "Hot", icon: Zap, color: "from-rose-500 to-pink-500", shadow: "shadow-rose-500/30" };
    if (idx % 3 === 0) return { text: "Sale", icon: Sparkles, color: "from-violet-500 to-purple-500", shadow: "shadow-violet-500/30" };
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -right-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute -bottom-40 left-1/3 w-72 h-72 bg-pink-400/20 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Hero Header */}
      <section className="relative py-12 md:py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 via-indigo-600/90 to-violet-600/90" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-4 md:mb-6">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span className="text-white/90 text-sm font-medium">Premium Collection 2026</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4 tracking-tight">
            Featured
            <span className="block mt-1 md:mt-2 bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent">
              Excellence
            </span>
          </h1>
          
          <p className="text-base md:text-lg text-blue-100 max-w-xl mx-auto leading-relaxed px-4">
            Discover our curated selection of premium machines
          </p>
        </div>
      </section>

      {/* MOBILE: 2-Column Horizontal Scroll Slider */}
      {isMobile && (
        <section className="relative px-2 pb-8">
          {/* Navigation Arrows Mobile */}
          <div className="flex justify-between items-center px-2 mb-4">
            <button
              onClick={mobilePrev}
              disabled={!canScrollMobile.left}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/90 backdrop-blur shadow-lg border border-gray-100 text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-all"
            >
              <FaAngleLeft size={20} />
            </button>
            
            <div className="flex gap-1.5">
              {[...Array(maxMobileIndex + 1)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToIndex(mobileRef, idx, true)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    mobileIndex === idx ? 'w-6 bg-blue-600' : 'w-1.5 bg-gray-300'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={mobileNext}
              disabled={!canScrollMobile.right}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/90 backdrop-blur shadow-lg border border-gray-100 text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-all"
            >
              <FaAngleRight size={20} />
            </button>
          </div>

          {/* 2-Column Scroll Container */}
          <div
            ref={mobileRef}
            onScroll={handleMobileScroll}
            className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-3 px-2 pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {images.map((img, idx) => {
              const badge = getBadge(idx);
              
              return (
                <div
                  key={idx}
                  className="flex-shrink-0 w-[calc(50%-6px)] snap-start"
                >
                  <div className="group relative bg-white/90 backdrop-blur-xl rounded-2xl overflow-hidden shadow-lg border border-white/60 h-full flex flex-col">
                    {/* Badge */}
                    {badge && (
                      <div className={`absolute top-2 left-2 z-20 flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r ${badge.color} text-white text-[10px] font-bold shadow-lg ${badge.shadow}`}>
                        <badge.icon className="w-3 h-3" />
                        {badge.text}
                      </div>
                    )}

                    {/* Like */}
                    <button
                      onClick={() => toggleLike(idx)}
                      className="absolute top-2 right-2 z-20 w-7 h-7 flex items-center justify-center rounded-full bg-white/95 backdrop-blur shadow-md active:scale-90 transition-transform"
                    >
                      <FaHeart className={`w-3.5 h-3.5 transition-colors ${likedItems.has(idx) ? 'text-rose-500 fill-rose-500' : 'text-gray-400'}`} />
                    </button>

                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                      <img
                        src={img}
                        alt={`Product ${idx + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-3 flex-1 flex flex-col">
                      <div className="flex items-center gap-0.5 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={`w-2.5 h-2.5 ${i < 4 ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} />
                        ))}
                        <span className="text-[9px] text-gray-500 ml-0.5">(4.8)</span>
                      </div>
                      
                      <h3 className="text-xs font-bold text-gray-800 leading-tight mb-1 line-clamp-2 flex-1">
                        Premium Machine {idx + 1}
                      </h3>
                      
                      <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                        <span className="text-sm font-bold text-blue-600">${(999 + idx * 100).toLocaleString()}</span>
                        <button className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-600 text-white shadow-md active:scale-90 transition-transform">
                          <FaShoppingCart className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* DESKTOP: Multi-Column Carousel */}
      {!isMobile && (
        <section className="relative py-8 px-4 lg:px-12">
          {/* Navigation Arrows */}
          <button
            onClick={desktopPrev}
            disabled={!canScrollDesktop.left}
            className="absolute left-2 lg:left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/95 backdrop-blur-xl shadow-xl border border-gray-100 text-blue-600 hover:bg-blue-600 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <FaAngleLeft size={24} />
          </button>

          <button
            onClick={desktopNext}
            disabled={!canScrollDesktop.right}
            className="absolute right-2 lg:right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/95 backdrop-blur-xl shadow-xl border border-gray-100 text-blue-600 hover:bg-blue-600 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <FaAngleRight size={24} />
          </button>

          {/* Carousel Container */}
          <div
            ref={desktopRef}
            onScroll={handleDesktopScroll}
            className="flex overflow-x-hidden scroll-smooth gap-5 px-2"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {images.map((img, idx) => {
              const badge = getBadge(idx);
              
              return (
                <div
                  key={idx}
                  className="flex-shrink-0 w-72 snap-start"
                >
                  <div className="group relative bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-white/60 transition-all duration-500 hover:-translate-y-2">
                    {/* Badge */}
                    {badge && (
                      <div className={`absolute top-3 left-3 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r ${badge.color} text-white text-xs font-bold shadow-lg ${badge.shadow} animate-pulse`}>
                        <badge.icon className="w-3.5 h-3.5" />
                        {badge.text}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="absolute top-3 right-3 z-20 flex flex-col gap-2">
                      <button
                        onClick={() => toggleLike(idx)}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/95 backdrop-blur shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
                      >
                        <FaHeart className={`w-5 h-5 transition-colors ${likedItems.has(idx) ? 'text-rose-500 fill-rose-500' : 'text-gray-400 hover:text-rose-400'}`} />
                      </button>
                      <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white/95 backdrop-blur shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 duration-500">
                        <FaEye className="w-5 h-5 text-blue-600" />
                      </button>
                    </div>

                    {/* Image */}
                    <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-100 via-gray-50 to-white">
                      <img
                        src={img}
                        alt={`Product ${idx + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={`w-4 h-4 ${i < 4 ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} />
                        ))}
                        <span className="text-xs text-gray-500 ml-1">(4.8)</span>
                      </div>
                      
                      <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">
                        Premium Machine {idx + 1}
                      </h3>
                      
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        High-performance industrial solution with advanced automation technology.
                      </p>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div>
                          <span className="text-xs text-gray-400 line-through">${(1299 + idx * 100).toLocaleString()}</span>
                          <span className="text-xl font-bold text-blue-600 block">${(999 + idx * 100).toLocaleString()}</span>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105 active:scale-95 transition-all duration-300">
                          <FaShoppingCart className="w-4 h-4" />
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {[...Array(maxDesktopIndex + 1)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToIndex(desktopRef, idx, false)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  desktopIndex === idx ? 'w-8 bg-blue-600' : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </section>
      )}

      {/* View All Button */}
      <section className="relative py-8 px-4 text-center">
        <button className="group inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105 active:scale-95 transition-all duration-300">
          View All Products
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </section>

      {/* CSS for hiding scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default FeaturedProducts;