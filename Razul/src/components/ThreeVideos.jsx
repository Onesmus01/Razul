import { useState, useRef } from 'react';
import { FaPlay, FaHeart, FaEye, FaClock, FaTimes } from 'react-icons/fa';
import { TrendingUp, Sparkles, Zap, Film } from 'lucide-react';
import videos from '../assets/videos';

const FeaturedVideos = () => {
  const [likedVideos, setLikedVideos] = useState(new Set());
  const [activeVideo, setActiveVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const videoList = Object.values(videos).map((src, i) => ({
    id: i + 1,
    title: `Tutorial ${i + 1}`,
    description: `Learn advanced techniques and professional workflows.`,
    src,
    duration: `${(5 + i * 2)}:${(10 + i * 5) % 60}`.padStart(2, '0'),
    views: `${(1.2 + i * 0.3).toFixed(1)}k`,
  }));

  const toggleLike = (id, e) => {
    e.stopPropagation();
    setLikedVideos((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  const openVideo = (video) => {
    setActiveVideo(video);
    setIsPlaying(true);
  };

  const closeVideo = () => {
    setActiveVideo(null);
    setIsPlaying(false);
    videoRef.current?.pause();
  };

  const getBadge = (idx) => {
    if (idx === 0) return { text: "Featured", icon: TrendingUp, color: "from-amber-500 to-orange-500" };
    if (idx === 1) return { text: "New", icon: Sparkles, color: "from-emerald-500 to-teal-500" };
    if (idx % 4 === 0) return { text: "Popular", icon: Zap, color: "from-rose-500 to-pink-500" };
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <section className="relative py-10 md:py-16 px-4 text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/90 via-purple-600/90 to-fuchsia-600/90" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 mb-3">
            <Film className="w-3.5 h-3.5 text-purple-300" />
            <span className="text-white/90 text-xs font-medium">Video Library</span>
          </div>
          <h1 className="text-2xl md:text-5xl font-bold text-white mb-2">
            Featured<span className="block mt-1 bg-gradient-to-r from-yellow-300 to-cyan-300 bg-clip-text text-transparent"> Tutorials</span>
          </h1>
          <p className="text-sm md:text-lg text-purple-100 max-w-xl mx-auto">
            Master new skills with our premium content
          </p>
        </div>
      </section>

      {/* Video Grid - 2 cols mobile, 3 lg, 4 xl */}
      <section className="px-3 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6 max-w-7xl mx-auto">
          {videoList.map((video, idx) => {
            const badge = getBadge(idx);
            return (
              <div
                key={video.id}
                onClick={() => openVideo(video)}
                className="group cursor-pointer bg-white/10 backdrop-blur rounded-xl overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden bg-slate-800">
                  <video
                    src={video.src}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    preload="metadata"
                    muted
                    playsInline
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all">
                    <div className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white/20 backdrop-blur border border-white/30 group-hover:scale-110 transition-all">
                      <FaPlay className="w-3 h-3 md:w-5 md:h-5 text-white fill-white ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/70 text-white text-[10px] font-medium flex items-center gap-1">
                    <FaClock className="w-2.5 h-2.5" />
                    {video.duration}
                  </div>
                  {badge && (
                    <div className={`absolute top-1.5 left-1.5 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-gradient-to-r ${badge.color} text-white text-[9px] font-bold`}>
                      <badge.icon className="w-2.5 h-2.5" />
                      {badge.text}
                    </div>
                  )}
                  <button
                    onClick={(e) => toggleLike(video.id, e)}
                    className="absolute top-1.5 right-1.5 w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-all active:scale-90"
                  >
                    <FaHeart className={`w-3 h-3 md:w-4 md:h-4 ${likedVideos.has(video.id) ? 'text-rose-500 fill-rose-500' : 'text-white/80'}`} />
                  </button>
                </div>

                {/* Content */}
                <div className="p-2.5 md:p-4">
                  <h3 className="text-xs md:text-sm font-bold text-white mb-0.5 md:mb-1 line-clamp-1 md:line-clamp-2 group-hover:text-purple-300 transition-colors">
                    {video.title}
                  </h3>
                  <p className="hidden md:block text-xs text-white/60 mb-2 line-clamp-2">
                    {video.description}
                  </p>
                  <div className="flex items-center justify-between text-white/50 text-[10px] md:text-xs">
                    <span className="flex items-center gap-1">
                      <FaEye className="w-3 h-3" />
                      {video.views}
                    </span>
                    <span className="text-purple-400 font-medium hidden sm:inline">Watch →</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Video Modal */}
      {activeVideo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={closeVideo}
        >
          <div 
            className="relative w-full max-w-4xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeVideo}
              className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <FaTimes className="w-4 h-4" />
            </button>

            <div className="relative aspect-video bg-black">
              <video
                ref={videoRef}
                src={activeVideo.src}
                className="w-full h-full"
                autoPlay
                playsInline
                controls
                onClick={() => setIsPlaying(!isPlaying)}
              />
            </div>

            <div className="p-4 md:p-6 bg-slate-900">
              <div className="flex items-start justify-between mb-2">
                <h2 className="text-lg md:text-xl font-bold text-white">{activeVideo.title}</h2>
                <button
                  onClick={(e) => toggleLike(activeVideo.id, e)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  <FaHeart className={`w-4 h-4 ${likedVideos.has(activeVideo.id) ? 'text-rose-500 fill-rose-500' : ''}`} />
                  <span className="text-xs">Like</span>
                </button>
              </div>
              <p className="text-sm text-white/70 mb-3">{activeVideo.description}</p>
              <div className="flex items-center gap-4 text-xs text-white/50">
                <span className="flex items-center gap-1"><FaEye className="w-3.5 h-3.5" />{activeVideo.views} views</span>
                <span className="flex items-center gap-1"><FaClock className="w-3.5 h-3.5" />{activeVideo.duration}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeaturedVideos;