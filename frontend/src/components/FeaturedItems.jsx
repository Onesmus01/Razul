import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const FeaturedProducts = () => {
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 3;

  const products = [
    {
      id: 1,
      name: 'High-Capacity Grain Silo',
      description: 'Store thousands of tons efficiently with premium durability.',
      image: '/images/silo1.jpg',
      badge: 'Top Rated',
    },
    {
      id: 2,
      name: 'Automated Packaging Machine',
      description: 'Seamless packaging with speed and precision.',
      image: '/images/packaging1.jpg',
      badge: 'New',
    },
    {
      id: 3,
      name: 'Industrial Mixer 3000X',
      description: 'Perfect mix for industrial-level productions.',
      image: '/images/mixer1.jpg',
      badge: '',
    },
    {
      id: 4,
      name: 'Silo Temperature Control System',
      description: 'Smart monitoring for maximum safety.',
      image: '/images/control1.jpg',
      badge: 'Top Rated',
    },
    {
      id: 5,
      name: 'Heavy-Duty Installation Kit',
      description: 'Everything you need for quick setup.',
      image: '/images/installation1.jpg',
      badge: 'New',
    },
    {
      id: 6,
      name: 'Precision Conveyor Belt',
      description: 'Smooth transport of materials at industrial scales.',
      image: '/images/conveyor1.jpg',
      badge: '',
    },
  ];

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="overflow-x-hidden">
      {/* Header */}
      <section className="relative flex flex-col items-center justify-center py-24 px-6 text-center bg-gradient-to-r from-blue-0 via-blue800 toblue-900 text-black overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center opacity-30"></div>
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 z-10 drop-shadow-lg animate-pulse">🌟 Featured Products</h1>
        <p className="max-w-2xl text-lg md:text-2xl z-10 text-gray-100 drop-shadow-md animate-fade-in-up">
          Explore our best machines and innovative installations.
        </p>
      </section>

      {/* Products Grid */}
      <section className="py-20 px-6 md:px-20 bg-gray-50 min-h-[90vh]">
        <div className="grid md:grid-cols-3 gap-10">
          {currentProducts.map((product, idx) => (
            <div
              key={product.id}
              data-aos="fade-up"
              data-aos-delay={idx * 150}
              className="bg-white rounded-lg shadow-md hover:shadow-2xl transition-all overflow-hidden relative group"
            >
              <div
                onClick={() => setSelectedProduct(product)}
                className="cursor-pointer"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-60 object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Badge */}
              {product.badge && (
                <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  {product.badge}
                </div>
              )}
              {/* Content */}
              <div className="p-6 flex flex-col h-full">
                <h2 className="text-xl font-semibold mb-2 text-blue-800">{product.name}</h2>
                <p className="text-gray-600 mb-6">{product.description}</p>
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="mt-auto inline-block bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full transition duration-300"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12 space-x-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-full font-semibold ${
              currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-800 text-white'
            } transition-all`}
          >
            Previous
          </button>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-full font-semibold ${
              currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-800 text-white'
            } transition-all`}
          >
            Next
          </button>
        </div>
      </section>

      {/* Modal Popup */}
      {selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 backdrop-blur-sm p-6">
          <div className="bg-white rounded-lg overflow-hidden max-w-lg w-full relative shadow-2xl animate-fade-in-up">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-3 right-3 text-gray-700 hover:text-gray-900 text-3xl font-bold"
            >
              &times;
            </button>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-4 text-blue-800">{selectedProduct.name}</h2>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">{selectedProduct.description}</p>
              <button
                onClick={() => setSelectedProduct(null)}
                className="block bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-8 rounded-full mx-auto transition duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer
      <footer className="py-10 px-6 text-center bg-gradient-to-r from-blue-800 to-blue-900 text-gray-200">
        <p className="text-lg">© 2025 Installation Co. | Built with 💙</p>
      </footer> */}
    </div>
  );
};

export default FeaturedProducts;
