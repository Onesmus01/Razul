export default function VideoShowcasePage() {
    const videoSources = [
      '/videos/thresher.mp4',
      '/videos/sheller.mp4',
      '/videos/mill.mp4',
      '/videos/dryer.mp4',
    ]
  
    return (
      <section className="min-h-screen bg-white py-16 px-6 sm:px-12 font-[Raleway,sans-serif]">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-4xl sm:text-5xl font-bold text-center mb-10 text-gray-800"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Machine Video Showcase
          </h2>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {videoSources.map((src, index) => (
              <div
                key={index}
                className="rounded-xl overflow-hidden shadow-lg border border-gray-200"
              >
                <video
                  src={src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-64 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  