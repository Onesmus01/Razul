export default function GalleryShowcase() {
    const images = [
      '/images/farm1.jpg',
      '/images/farm2.jpg',
      '/images/equipment.jpg',
      '/images/tractor.jpg',
      '/images/harvest.jpg',
      '/images/market.jpg'
    ];
  
    return (
      <section className="bg-white py-20 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2
            className="text-4xl sm:text-5xl font-bold text-gray-900"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Our Visual Story
          </h2>
          <p
            className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: 'Raleway, sans-serif' }}
          >
            Explore the moments that define us — from modern farms to cutting-edge agri-tech in motion.
          </p>
          <div className="mt-6 w-24 h-1 bg-orange-500 mx-auto rounded-full shadow-md" />
        </div>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {images.map((src, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-2xl shadow-lg group"
            >
              <img
                src={src}
                alt={`Gallery ${index + 1}`}
                className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center text-white text-lg font-semibold backdrop-blur-sm">
                View Image
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  