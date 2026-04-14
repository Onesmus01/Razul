import { useState, useRef } from 'react';
import { FaPlay, FaHeart, FaEye, FaClock, FaTimes } from 'react-icons/fa';
import { TrendingUp, Sparkles, Zap, Film } from 'lucide-react';
import videos from '../assets/videos';

const FeaturedVideos = () => {
  const [likedVideos, setLikedVideos] = useState(new Set());
  const [activeVideo, setActiveVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [failedThumbnails, setFailedThumbnails] = useState(new Set());
  const videoRef = useRef(null);

  const videoList = Object.values(videos).map((src, i) => ({
    id: i + 1,
    title: `Tutorial ${i + 1}`,
    description: `Learn advanced techniques and professional workflows.`,
    src,
    // iOS fix: Add #t=0.001 to force thumbnail generation
    thumbnailSrc: `${src}#t=0.001`,
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

  const handleThumbnailError = (id) => {
    setFailedThumbnails(prev => new Set(prev).add(id));
  };

  const getBadge = (idx) => {
    if (idx === 0) return { text: "Featured", icon: TrendingUp, color: "from-amber-500 to-orange-500" };
    if (idx === 1) return { text: "New", icon: Sparkles, color: "from-emerald-500 to-teal-500" };
    if (idx % 4 === 0) return { text: "Popular", icon: Zap, color: "from-rose-500 to-pink-500" };
    return null;
  };

  return (
    <div className="bg-slate-950">
      {/* Header - Compact */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-8 md:py-12 px-4 text-center border-b border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-3">
            <Film className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-slate-300 text-xs font-medium">Video Library</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">
            Featured<span className="text-blue-400"> Tutorials</span>
          </h1>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Master new skills with our curated video content
          </p>
        </div>
      </section>

      {/* Video Grid - Background fits content exactly */}
      <section className="bg-slate-900/50 px-3 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5 max-w-7xl mx-auto">
          {videoList.map((video, idx) => {
            const badge = getBadge(idx);
            const hasFailed = failedThumbnails.has(video.id);
            
            return (
              <div
                key={video.id}
                onClick={() => openVideo(video)}
                className="group cursor-pointer bg-slate-800/50 rounded-xl overflow-hidden border border-white/5 hover:border-blue-500/30 hover:bg-slate-800 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Thumbnail - iOS Compatible */}
                <div className="relative aspect-video overflow-hidden bg-slate-900">
                  {/* Fallback gradient background if video thumbnail fails */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
                  
                  {/* Video element with iOS fix #t=0.001 */}
                  <video
                    src={video.thumbnailSrc}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                      hasFailed ? 'opacity-0' : 'opacity-80 group-hover:opacity-100 group-hover:scale-105'
                    }`}
                    preload="metadata"
                    muted
                    playsInline
                    onError={() => handleThumbnailError(video.id)}
                  />
                  
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-all">
                    <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/20 backdrop-blur group-hover:bg-blue-600/80 group-hover:scale-110 transition-all duration-300">
                      <FaPlay className="w-3 h-3 md:w-4 md:h-4 text-white fill-white ml-0.5" />
                    </div>
                  </div>
                  
                  {/* Duration badge */}
                  <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/60 text-slate-200 text-[10px] font-medium">
                    {video.duration}
                  </div>
                  
                  {/* Badge */}
                  {badge && (
                    <div className={`absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r ${badge.color} text-white text-[9px] font-bold shadow-lg`}>
                      <badge.icon className="w-2.5 h-2.5" />
                      {badge.text}
                    </div>
                  )}
                  
                  {/* Like button */}
                  <button
                    onClick={(e) => toggleLike(video.id, e)}
                    className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-all active:scale-90"
                  >
                    <FaHeart className={`w-3 h-3 ${likedVideos.has(video.id) ? 'text-rose-500 fill-rose-500' : 'text-white/70'}`} />
                  </button>
                </div>

                {/* Content */}
                <div className="p-3">
                  <h3 className="text-xs md:text-sm font-semibold text-slate-200 mb-1 line-clamp-1 md:line-clamp-2 group-hover:text-blue-400 transition-colors">
                    {video.title}
                  </h3>
                  <p className="hidden md:block text-xs text-slate-500 mb-2 line-clamp-2">
                    {video.description}
                  </p>
                  <div className="flex items-center justify-between text-slate-500 text-[10px] md:text-xs">
                    <span className="flex items-center gap-1">
                      <FaEye className="w-3 h-3" />
                      {video.views}
                    </span>
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur"
          onClick={closeVideo}
        >
          <div 
            className="relative w-full max-w-4xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeVideo}
              className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-white/20 transition-colors"
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
              />
            </div>

            <div className="p-4 md:p-6 bg-slate-900 border-t border-white/5">
              <div className="flex items-start justify-between mb-2">
                <h2 className="text-lg md:text-xl font-bold text-white">{activeVideo.title}</h2>
                <button
                  onClick={(e) => toggleLike(activeVideo.id, e)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 text-white hover:bg-white/10 transition-colors border border-white/10"
                >
                  <FaHeart className={`w-4 h-4 ${likedVideos.has(activeVideo.id) ? 'text-rose-500 fill-rose-500' : ''}`} />
                  <span className="text-xs">Like</span>
                </button>
              </div>
              <p className="text-sm text-slate-400 mb-3">{activeVideo.description}</p>
              <div className="flex items-center gap-4 text-xs text-slate-500">
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