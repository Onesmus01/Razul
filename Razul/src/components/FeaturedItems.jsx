import { useEffect, useRef, useState, useCallback } from "react";
import { FaAngleLeft, FaAngleRight, FaStar, FaHeart, FaShoppingCart } from "react-icons/fa";
import { Sparkles, TrendingUp, Zap, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import asset from "../assets/assets.js";

const FeaturedProducts = () => {
  const mobileRef = useRef(null);
  const desktopRef = useRef(null);
  const navigate = useNavigate();
  const [mobileIndex, setMobileIndex] = useState(0);
  const [desktopIndex, setDesktopIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [likedItems, setLikedItems] = useState(new Set());
  const [canScrollMobile, setCanScrollMobile] = useState({ left: false, right: true });
  const [canScrollDesktop, setCanScrollDesktop] = useState({ left: false, right: true });

  const images = Object.values(asset);
  const totalItems = images.length;
  
  const mobileItemsPerView = 2;
  const desktopItemsPerView = 4;
  const maxMobileIndex = Math.ceil(totalItems / mobileItemsPerView) - 1;
  const maxDesktopIndex = Math.ceil(totalItems / desktopItemsPerView) - 1;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const checkScrollPosition = useCallback((ref, setCanScroll) => {
    if (!ref.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = ref.current;
    const maxScroll = scrollWidth - clientWidth;
    setCanScroll({ left: scrollLeft > 10, right: scrollLeft < maxScroll - 10 });
  }, []);

  const handleMobileScroll = useCallback(() => {
    if (!mobileRef.current) return;
    const { scrollLeft, clientWidth } = mobileRef.current;
    const itemWidth = (clientWidth - 12) / 2;
    const newIndex = Math.round(scrollLeft / ((itemWidth + 6) * 2));
    setMobileIndex(Math.min(newIndex, maxMobileIndex));
    checkScrollPosition(mobileRef, setCanScrollMobile);
  }, [maxMobileIndex]);

  const handleDesktopScroll = useCallback(() => {
    if (!desktopRef.current) return;
    const { scrollLeft } = desktopRef.current;
    const itemWidth = 300;
    const newIndex = Math.round(scrollLeft / (itemWidth * 4));
    setDesktopIndex(Math.min(newIndex, maxDesktopIndex));
    checkScrollPosition(desktopRef, setCanScrollDesktop);
  }, [maxDesktopIndex]);

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

  const mobilePrev = () => scrollToIndex(mobileRef, Math.max(0, mobileIndex - 1), true);
  const mobileNext = () => scrollToIndex(mobileRef, Math.min(maxMobileIndex, mobileIndex + 1), true);
  const desktopPrev = () => scrollToIndex(desktopRef, Math.max(0, desktopIndex - 1), false);
  const desktopNext = () => scrollToIndex(desktopRef, Math.min(maxDesktopIndex, desktopIndex + 1), false);

  const toggleLike = (e, idx) => {
    e.stopPropagation();
    setLikedItems((prev) => {
      const newSet = new Set(prev);
      newSet.has(idx) ? newSet.delete(idx) : newSet.add(idx);
      return newSet;
    });
  };

  const handleProductClick = (idx) => {
    navigate(`/product/${idx + 1}`);
  };

  const getBadge = (idx) => {
    if (idx === 0) return { text: "Bestseller", icon: TrendingUp, color: "from-amber-500 to-orange-500" };
    if (idx === 1) return { text: "New", icon: Sparkles, color: "from-emerald-500 to-teal-500" };
    if (idx % 5 === 0) return { text: "Hot", icon: Zap, color: "from-rose-500 to-pink-500" };
    if (idx % 3 === 0) return { text: "Sale", icon: Sparkles, color: "from-slate-600 to-slate-700" };
    return null;
  };

  return (
    <div className="bg-slate-50">
      {/* Header - Silent Professional */}
      <section className="bg-slate-900 py-8 md:py-12 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-300 text-xs font-medium">Premium Collection</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">
            Featured <span className="text-slate-400">Excellence</span>
          </h1>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Discover our curated selection of premium machines
          </p>
        </div>
      </section>

      {/* Products Section - Thin bg, fits content */}
      <section className="py-8 md:py-12 px-3 sm:px-6 lg:px-8 bg-white">
        {/* Mobile Slider */}
        {isMobile && (
          <div className="relative max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-4 px-1">
              <button onClick={mobilePrev} disabled={!canScrollMobile.left} className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-700 disabled:opacity-30 active:scale-95 transition-all shadow-sm">
                <FaAngleLeft size={16} />
              </button>
              <div className="flex gap-1.5">
                {[...Array(maxMobileIndex + 1)].map((_, idx) => (
                  <button key={idx} onClick={() => scrollToIndex(mobileRef, idx, true)} className={`h-1.5 rounded-full transition-all ${mobileIndex === idx ? 'w-5 bg-slate-800' : 'w-1.5 bg-slate-300'}`} />
                ))}
              </div>
              <button onClick={mobileNext} disabled={!canScrollMobile.right} className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-700 disabled:opacity-30 active:scale-95 transition-all shadow-sm">
                <FaAngleRight size={16} />
              </button>
            </div>

            <div ref={mobileRef} onScroll={handleMobileScroll} className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-3">
              {images.map((img, idx) => {
                const badge = getBadge(idx);
                return (
                  <div key={idx} onClick={() => handleProductClick(idx)} className="flex-shrink-0 w-[calc(50%-6px)] snap-start cursor-pointer">
                    <div className="group bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-slate-400 transition-all shadow-sm hover:shadow-md">
                      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                        <img src={img} alt={`Product ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                        {badge && (
                          <div className={`absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r ${badge.color} text-white text-[9px] font-bold`}>
                            <badge.icon className="w-2.5 h-2.5" />
                            {badge.text}
                          </div>
                        )}
                        <button onClick={(e) => toggleLike(e, idx)} className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-white/90 shadow-sm active:scale-90 transition-transform">
                          <FaHeart className={`w-3.5 h-3.5 ${likedItems.has(idx) ? 'text-rose-500 fill-rose-500' : 'text-slate-400'}`} />
                        </button>
                      </div>
                      <div className="p-3">
                        <div className="flex items-center gap-0.5 mb-1">
                          {[...Array(5)].map((_, i) => <FaStar key={i} className={`w-2.5 h-2.5 ${i < 4 ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />)}
                          <span className="text-[9px] text-slate-500 ml-0.5">(4.8)</span>
                        </div>
                        <h3 className="text-xs font-semibold text-slate-800 mb-1 line-clamp-2">Premium Machine {idx + 1}</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-slate-900">${(999 + idx * 100).toLocaleString()}</span>
                          <button onClick={(e) => { e.stopPropagation(); }} className="w-6 h-6 flex items-center justify-center rounded-full bg-slate-900 text-white active:scale-90 transition-transform">
                            <FaShoppingCart className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Desktop Slider */}
        {!isMobile && (
          <div className="relative max-w-7xl mx-auto">
            <div className="flex justify-end gap-2 mb-4">
              <button onClick={desktopPrev} disabled={!canScrollDesktop.left} className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-700 disabled:opacity-30 hover:bg-slate-50 transition-all shadow-sm">
                <FaAngleLeft size={18} />
              </button>
              <button onClick={desktopNext} disabled={!canScrollDesktop.right} className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-700 disabled:opacity-30 hover:bg-slate-50 transition-all shadow-sm">
                <FaAngleRight size={18} />
              </button>
            </div>

            <div ref={desktopRef} onScroll={handleDesktopScroll} className="flex overflow-x-hidden scroll-smooth gap-4">
              {images.map((img, idx) => {
                const badge = getBadge(idx);
                return (
                  <div key={idx} onClick={() => handleProductClick(idx)} className="flex-shrink-0 w-64 snap-start cursor-pointer">
                    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-slate-400 transition-all shadow-sm hover:shadow-lg hover:-translate-y-1">
                      <div className="relative h-48 overflow-hidden bg-slate-100">
                        <img src={img} alt={`Product ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                        {badge && (
                          <div className={`absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r ${badge.color} text-white text-xs font-bold`}>
                            <badge.icon className="w-3 h-3" />
                            {badge.text}
                          </div>
                        )}
                        <button onClick={(e) => toggleLike(e, idx)} className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg transition-all active:scale-90">
                          <FaHeart className={`w-4 h-4 ${likedItems.has(idx) ? 'text-rose-500 fill-rose-500' : 'text-slate-400'}`} />
                        </button>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => <FaStar key={i} className={`w-3.5 h-3.5 ${i < 4 ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />)}
                          <span className="text-xs text-slate-500 ml-1">(4.8)</span>
                        </div>
                        <h3 className="text-sm font-semibold text-slate-800 mb-1 group-hover:text-slate-600 transition-colors">Premium Machine {idx + 1}</h3>
                        <p className="text-xs text-slate-500 mb-3 line-clamp-2">High-performance industrial solution.</p>
                        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                          <span className="text-lg font-bold text-slate-900">${(999 + idx * 100).toLocaleString()}</span>
                          <button onClick={(e) => { e.stopPropagation(); }} className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 active:scale-95 transition-all">
                            <FaShoppingCart className="w-3.5 h-3.5" />
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center gap-2 mt-8">
              {[...Array(maxDesktopIndex + 1)].map((_, idx) => (
                <button key={idx} onClick={() => scrollToIndex(desktopRef, idx, false)} className={`h-1.5 rounded-full transition-all ${desktopIndex === idx ? 'w-6 bg-slate-800' : 'w-1.5 bg-slate-300'}`} />
              ))}
            </div>
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-8">
          <button onClick={() => navigate('/products')} className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 active:scale-95 transition-all">
            View All Products
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; } .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
    </div>
  );
};

export default FeaturedProducts;