import { useEffect, useRef, useState, useCallback } from "react";
import { FaAngleLeft, FaAngleRight, FaStar, FaHeart, FaShoppingCart } from "react-icons/fa";
import { Sparkles, TrendingUp, Zap, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import asset from "../assets/assets.js";

const FeaturedProduct = () => {
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
  const maxMobileIndex = Math.ceil(totalItems / 2) - 1;
  const maxDesktopIndex = Math.ceil(totalItems / 4) - 1;

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
    const itemWidth = (clientWidth - 8) / 2;
    const newIndex = Math.round(scrollLeft / (itemWidth * 2 + 8));
    setMobileIndex(Math.min(newIndex, maxMobileIndex));
    checkScrollPosition(mobileRef, setCanScrollMobile);
  }, [maxMobileIndex]);

  const handleDesktopScroll = useCallback(() => {
    if (!desktopRef.current) return;
    const { scrollLeft } = desktopRef.current;
    const newIndex = Math.round(scrollLeft / 1200);
    setDesktopIndex(Math.min(newIndex, maxDesktopIndex));
    checkScrollPosition(desktopRef, setCanScrollDesktop);
  }, [maxDesktopIndex]);

  const scrollToIndex = useCallback((ref, index, isMobileView) => {
    if (!ref.current) return;
    if (isMobileView) {
      const { clientWidth } = ref.current;
      const itemWidth = (clientWidth - 8) / 2;
      ref.current.scrollTo({ left: index * (itemWidth * 2 + 8), behavior: 'smooth' });
    } else {
      ref.current.scrollTo({ left: index * 1200, behavior: 'smooth' });
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
    if (idx === 0) return { text: "Best", icon: TrendingUp, color: "from-amber-500 to-orange-500" };
    if (idx === 1) return { text: "New", icon: Sparkles, color: "from-emerald-500 to-teal-500" };
    if (idx % 5 === 0) return { text: "Hot", icon: Zap, color: "from-rose-500 to-pink-500" };
    return null;
  };

  return (
    <div className="bg-slate-50 w-full">
      {/* Header - Silent Professional */}
      

      {/* Products Section */}
      <section className="py-4 md:py-8 px-2 sm:px-4 bg-white">
        {/* Mobile */}
        {isMobile && (
          <div className="w-full">
            <div className="flex justify-between items-center mb-3 px-1">
              <button onClick={mobilePrev} disabled={!canScrollMobile.left} className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 disabled:opacity-30 flex items-center justify-center">
                <FaAngleLeft size={16} />
              </button>
              <div className="flex gap-1">
                {[...Array(maxMobileIndex + 1)].map((_, idx) => (
                  <button key={idx} onClick={() => scrollToIndex(mobileRef, idx, true)} className={`h-1 rounded-full transition-all ${mobileIndex === idx ? 'w-4 bg-slate-800' : 'w-1 bg-slate-300'}`} />
                ))}
              </div>
              <button onClick={mobileNext} disabled={!canScrollMobile.right} className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 disabled:opacity-30 flex items-center justify-center">
                <FaAngleRight size={16} />
              </button>
            </div>

            <div ref={mobileRef} onScroll={handleMobileScroll} className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-2" style={{ scrollbarWidth: 'none' }}>
              {images.map((img, idx) => {
                const badge = getBadge(idx);
                return (
                  <div key={idx} onClick={() => handleProductClick(idx)} className="flex-shrink-0 w-[calc(50%-4px)] snap-start cursor-pointer">
                    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm active:scale-95 transition-transform">
                      <div className="relative aspect-[4/3] bg-slate-100">
                        <img src={img} alt={`Product ${idx + 1}`} className="w-full h-full object-cover" loading="lazy" />
                        {badge && (
                          <div className={`absolute top-1 left-1 px-1.5 py-0.5 rounded-full bg-gradient-to-r ${badge.color} text-white text-[8px] font-bold flex items-center gap-0.5`}>
                            <badge.icon className="w-2 h-2" />
                            {badge.text}
                          </div>
                        )}
                        <button onClick={(e) => toggleLike(e, idx)} className="absolute top-1 right-1 w-6 h-6 rounded-full bg-white/90 flex items-center justify-center shadow-sm">
                          <FaHeart className={`w-3 h-3 ${likedItems.has(idx) ? 'text-rose-500 fill-rose-500' : 'text-slate-400'}`} />
                        </button>
                      </div>
                      <div className="p-2">
                        <div className="flex items-center gap-0.5 mb-0.5">
                          {[...Array(5)].map((_, i) => <FaStar key={i} className={`w-2 h-2 ${i < 4 ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />)}
                          <span className="text-[8px] text-slate-500">(4.8)</span>
                        </div>
                        <h3 className="text-[11px] font-medium text-slate-800 truncate">Machine {idx + 1}</h3>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs font-bold text-slate-900">${(999 + idx * 100).toLocaleString()}</span>
                          <button onClick={(e) => e.stopPropagation()} className="w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center">
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

        {/* Desktop */}
        {!isMobile && (
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-end gap-2 mb-4">
              <button onClick={desktopPrev} disabled={!canScrollDesktop.left} className="w-10 h-10 rounded-full border border-slate-200 text-slate-700 disabled:opacity-30 hover:bg-slate-50 flex items-center justify-center">
                <FaAngleLeft size={18} />
              </button>
              <button onClick={desktopNext} disabled={!canScrollDesktop.right} className="w-10 h-10 rounded-full border border-slate-200 text-slate-700 disabled:opacity-30 hover:bg-slate-50 flex items-center justify-center">
                <FaAngleRight size={18} />
              </button>
            </div>

            <div ref={desktopRef} onScroll={handleDesktopScroll} className="flex overflow-x-hidden scroll-smooth gap-4">
              {images.map((img, idx) => {
                const badge = getBadge(idx);
                return (
                  <div key={idx} onClick={() => handleProductClick(idx)} className="flex-shrink-0 w-64 snap-start cursor-pointer">
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1">
                      <div className="relative h-48 bg-slate-100">
                        <img src={img} alt={`Product ${idx + 1}`} className="w-full h-full object-cover" loading="lazy" />
                        {badge && (
                          <div className={`absolute top-2 left-2 px-2 py-0.5 rounded-full bg-gradient-to-r ${badge.color} text-white text-xs font-bold flex items-center gap-1`}>
                            <badge.icon className="w-3 h-3" />
                            {badge.text}
                          </div>
                        )}
                        <button onClick={(e) => toggleLike(e, idx)} className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center">
                          <FaHeart className={`w-4 h-4 ${likedItems.has(idx) ? 'text-rose-500 fill-rose-500' : 'text-slate-400'}`} />
                        </button>
                      </div>
                      <div className="p-3">
                        <div className="flex items-center gap-0.5 mb-1">
                          {[...Array(5)].map((_, i) => <FaStar key={i} className={`w-3 h-3 ${i < 4 ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />)}
                          <span className="text-xs text-slate-500">(4.8)</span>
                        </div>
                        <h3 className="text-sm font-semibold text-slate-800 mb-1">Machine {idx + 1}</h3>
                        <p className="text-xs text-slate-500 mb-2">High-performance solution.</p>
                        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                          <span className="text-base font-bold text-slate-900">${(999 + idx * 100).toLocaleString()}</span>
                          <button onClick={(e) => e.stopPropagation()} className="px-3 py-1.5 rounded-full bg-slate-800 text-white text-xs flex items-center gap-1">
                            <FaShoppingCart className="w-3 h-3" />
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center gap-2 mt-6">
              {[...Array(maxDesktopIndex + 1)].map((_, idx) => (
                <button key={idx} onClick={() => scrollToIndex(desktopRef, idx, false)} className={`h-1.5 rounded-full transition-all ${desktopIndex === idx ? 'w-6 bg-slate-800' : 'w-1.5 bg-slate-300'}`} />
              ))}
            </div>
          </div>
        )}        
      </section>

      <style>{`.scrollbar-hide::-webkit-scrollbar{display:none}.scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}`}</style>
    </div>
  );
};

export default FeaturedProduct;