import { useEffect, useRef, useState, useCallback } from 'react';
import { FaAngleLeft, FaAngleRight, FaPlay, FaHeart, FaEye, FaClock } from 'react-icons/fa';
import { Sparkles, TrendingUp, Zap, Film, ArrowRight } from 'lucide-react';
import videos from '../assets/videos';

const FeaturedVideos = () => {
  const mobileRef = useRef(null);
  const desktopRef = useRef(null);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [desktopIndex, setDesktopIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [likedVideos, setLikedVideos] = useState(new Set());
  const [canScrollMobile, setCanScrollMobile] = useState({ left: false, right: true });
  const [canScrollDesktop, setCanScrollDesktop] = useState({ left: false, right: true });
  const [hoveredVideo, setHoveredVideo] = useState(null);

  const videoList = Object.values(videos).map((src, i) => ({
    id: i + 1,
    title: `Tutorial Video ${i + 1}`,
    description: `Learn advanced techniques and professional workflows in this comprehensive tutorial series.`,
    src,
    duration: `${(5 + i * 2)}:${(10 + i * 5) % 60}`.padStart(2, '0'),
    views: `${(1.2 + i * 0.3).toFixed(1)}k`,
  }));

  const totalItems = videoList.length;
  const maxMobileIndex = Math.ceil(totalItems / 2) - 1;
  const maxDesktopIndex = Math.ceil(totalItems / 3) - 1;

  // Check viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Check scroll position
  const checkScrollPosition = useCallback((ref, setCanScroll) => {
    if (!ref.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = ref.current;
    const maxScroll = scrollWidth - clientWidth;
    setCanScroll({ left: scrollLeft > 10, right: scrollLeft < maxScroll - 10 });
  }, []);

  // Scroll handlers
  const handleMobileScroll = useCallback(() => {
    if (!mobileRef.current) return;
    const { scrollLeft, clientWidth } = mobileRef.current;
    const pageWidth = (clientWidth - 12) / 2 + 6;
    const newIndex = Math.round(scrollLeft / (pageWidth * 2));
    setMobileIndex(Math.min(newIndex, maxMobileIndex));
    checkScrollPosition(mobileRef, setCanScrollMobile);
  }, [maxMobileIndex]);

  const handleDesktopScroll = useCallback(() => {
    if (!desktopRef.current) return;
    const { scrollLeft } = desktopRef.current;
    const newIndex = Math.round(scrollLeft / (400 * 3));
    setDesktopIndex(Math.min(newIndex, maxDesktopIndex));
    checkScrollPosition(desktopRef, setCanScrollDesktop);
  }, [maxDesktopIndex]);

  // Scroll to index
  const scrollToIndex = useCallback((ref, index, isMobileView) => {
    if (!ref.current) return;
    if (isMobileView) {
      const { clientWidth } = ref.current;
      const itemWidth = (clientWidth - 12) / 2;
      const scrollPos = index * (itemWidth + 6) * 2;
      ref.current.scrollTo({ left: scrollPos, behavior: 'smooth' });
    } else {
      const scrollPos = index * 400 * 3;
      ref.current.scrollTo({ left: scrollPos, behavior: 'smooth' });
    }
  }, []);

  // Navigation
  const mobilePrev = () => scrollToIndex(mobileRef, Math.max(0, mobileIndex - 1), true);
  const mobileNext = () => scrollToIndex(mobileRef, Math.min(maxMobileIndex, mobileIndex + 1), true);
  const desktopPrev = () => scrollToIndex(desktopRef, Math.max(0, desktopIndex - 1), false);
  const desktopNext = () => scrollToIndex(desktopRef, Math.min(maxDesktopIndex, desktopIndex + 1), false);

  // Like toggle
  const toggleLike = (id) => {
    setLikedVideos((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  // Badge helper
  const getBadge = (idx) => {
    if (idx === 0) return { text: "Featured", icon: TrendingUp, color: "from-amber-500 to-orange-500" };
    if (idx === 1) return { text: "New", icon: Sparkles, color: "from-emerald-500 to-teal-500" };
    if (idx % 4 === 0) return { text: "Popular", icon: Zap, color: "from-rose-500 to-pink-500" };
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute -bottom-40 right-1/3 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Hero Header */}
      <section className="relative py-12 md:py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/90 via-purple-600/90 to-fuchsia-600/90" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-4 md:mb-6">
            <Film className="w-4 h-4 text-purple-300" />
            <span className="text-white/90 text-sm font-medium">Video Library 2026</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4 tracking-tight">
            Featured
            <span className="block mt-1 md:mt-2 bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent">
              Tutorials
            </span>
          </h1>
          
          <p className="text-base md:text-lg text-purple-100 max-w-xl mx-auto leading-relaxed px-4">
            Master new skills with our curated collection of premium video content
          </p>
        </div>
      </section>

      {/* MOBILE: 2-Column Horizontal Slider */}
      {isMobile && (
        <section className="relative px-2 pb-8">
          {/* Navigation */}
          <div className="flex justify-between items-center px-2 mb-4">
            <button
              onClick={mobilePrev}
              disabled={!canScrollMobile.left}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur border border-white/20 text-white disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-all"
            >
              <FaAngleLeft size={20} />
            </button>
            
            <div className="flex gap-1.5">
              {[...Array(maxMobileIndex + 1)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToIndex(mobileRef, idx, true)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    mobileIndex === idx ? 'w-6 bg-purple-400' : 'w-1.5 bg-white/30'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={mobileNext}
              disabled={!canScrollMobile.right}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur border border-white/20 text-white disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-all"
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
            {videoList.map((video, idx) => {
              const badge = getBadge(idx);
              
              return (
                <div
                  key={video.id}
                  className="flex-shrink-0 w-[calc(50%-6px)] snap-start"
                >
                  <div className="group relative bg-white/10 backdrop-blur-xl rounded-2xl overflow-hidden shadow-xl border border-white/20 h-full flex flex-col">
                    {/* Badge */}
                    {badge && (
                      <div className={`absolute top-2 left-2 z-20 flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r ${badge.color} text-white text-[10px] font-bold shadow-lg`}>
                        <badge.icon className="w-3 h-3" />
                        {badge.text}
                      </div>
                    )}

                    {/* Like */}
                    <button
                      onClick={() => toggleLike(video.id)}
                      className="absolute top-2 right-2 z-20 w-7 h-7 flex items-center justify-center rounded-full bg-black/40 backdrop-blur text-white active:scale-90 transition-transform"
                    >
                      <FaHeart className={`w-3.5 h-3.5 transition-colors ${likedVideos.has(video.id) ? 'text-rose-500 fill-rose-500' : 'text-white/70'}`} />
                    </button>

                    {/* Video Thumbnail with Play Overlay */}
                    <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-purple-900/50 to-slate-900/50">
                      <video
                        src={video.src}
                        className="w-full h-full object-cover opacity-80"
                        preload="metadata"
                      />
                      
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-all duration-300">
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30 group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300">
                          <FaPlay className="w-5 h-5 text-white fill-white ml-0.5" />
                        </div>
                      </div>

                      {/* Duration */}
                      <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/60 text-white text-[10px] font-medium flex items-center gap-1">
                        <FaClock className="w-3 h-3" />
                        {video.duration}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-3 flex-1 flex flex-col">
                      <h3 className="text-xs font-bold text-white leading-tight mb-1 line-clamp-2 flex-1">
                        {video.title}
                      </h3>
                      
                      <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/10">
                        <div className="flex items-center gap-1 text-white/60 text-[10px]">
                          <FaEye className="w-3 h-3" />
                          {video.views}
                        </div>
                        <button className="w-6 h-6 flex items-center justify-center rounded-full bg-purple-500 text-white shadow-lg active:scale-90 transition-transform">
                          <FaPlay className="w-3 h-3" />
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

      {/* DESKTOP: 3-Column Carousel */}
      {!isMobile && (
        <section className="relative py-8 px-4 lg:px-12">
          {/* Navigation Arrows */}
          <button
            onClick={desktopPrev}
            disabled={!canScrollDesktop.left}
            className="absolute left-2 lg:left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <FaAngleLeft size={24} />
          </button>

          <button
            onClick={desktopNext}
            disabled={!canScrollDesktop.right}
            className="absolute right-2 lg:right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <FaAngleRight size={24} />
          </button>

          {/* Carousel Container */}
          <div
            ref={desktopRef}
            onScroll={handleDesktopScroll}
            className="flex overflow-x-hidden scroll-smooth gap-6 px-2"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {videoList.map((video, idx) => {
              const badge = getBadge(idx);
              
              return (
                <div
                  key={video.id}
                  className="flex-shrink-0 w-96 snap-start"
                  onMouseEnter={() => setHoveredVideo(video.id)}
                  onMouseLeave={() => setHoveredVideo(null)}
                >
                  <div className="group relative bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/20 hover:border-white/40 transition-all duration-500 hover:-translate-y-2">
                    {/* Badge */}
                    {badge && (
                      <div className={`absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r ${badge.color} text-white text-xs font-bold shadow-lg animate-pulse`}>
                        <badge.icon className="w-3.5 h-3.5" />
                        {badge.text}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
                      <button
                        onClick={() => toggleLike(video.id)}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-black/40 backdrop-blur text-white hover:bg-black/60 transition-all duration-300 hover:scale-110 active:scale-95"
                      >
                        <FaHeart className={`w-5 h-5 transition-colors ${likedVideos.has(video.id) ? 'text-rose-500 fill-rose-500' : 'text-white/70'}`} />
                      </button>
                    </div>

                    {/* Video Container with Hover Play */}
                    <div className="relative h-56 overflow-hidden bg-gradient-to-br from-purple-900/30 to-slate-900/30">
                      <video
                        src={video.src}
                        className={`w-full h-full object-cover transition-all duration-500 ${hoveredVideo === video.id ? 'opacity-100 scale-105' : 'opacity-80'}`}
                        preload="metadata"
                        muted
                        loop
                        playsInline
                        ref={(el) => {
                          if (el) {
                            if (hoveredVideo === video.id) el.play().catch(() => {});
                            else el.pause();
                          }
                        }}
                      />
                      
                      {/* Play Overlay */}
                      <div className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-300 ${hoveredVideo === video.id ? 'opacity-0' : 'opacity-100'}`}>
                        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border-2 border-white/40 group-hover:scale-110 transition-transform duration-300">
                          <FaPlay className="w-6 h-6 text-white fill-white ml-1" />
                        </div>
                      </div>

                      {/* Duration */}
                      <div className="absolute bottom-3 right-3 px-2 py-1 rounded-lg bg-black/60 backdrop-blur text-white text-xs font-medium flex items-center gap-1.5">
                        <FaClock className="w-3.5 h-3.5" />
                        {video.duration}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                        {video.title}
                      </h3>
                      
                      <p className="text-sm text-white/60 mb-4 line-clamp-2">
                        {video.description}
                      </p>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-white/10">
                        <div className="flex items-center gap-3 text-white/50 text-sm">
                          <span className="flex items-center gap-1">
                            <FaEye className="w-4 h-4" />
                            {video.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <FaClock className="w-4 h-4" />
                            {video.duration}
                          </span>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white text-sm font-semibold shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 hover:scale-105 active:scale-95 transition-all duration-300">
                          <FaPlay className="w-3 h-3" />
                          Watch
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
                  desktopIndex === idx ? 'w-8 bg-purple-400' : 'w-2 bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </section>
      )}

      {/* View All Button */}
      <section className="relative py-8 px-4 text-center">
        <button className="group inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-semibold shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 hover:scale-105 active:scale-95 transition-all duration-300 border border-white/20">
          View All Videos
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

export default FeaturedVideos;