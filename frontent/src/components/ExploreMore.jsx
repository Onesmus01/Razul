import React, { useState } from 'react';

const categories = ['All', 'Machines', 'Silos', 'Installations'];

const items = [
  { id: 1, name: 'Heavy Duty Machine', category: 'Machines', image: '/images/machine1.jpg' },
  { id: 2, name: 'High Capacity Silo', category: 'Silos', image: '/images/silo1.jpg' },
  { id: 3, name: 'Factory Installation', category: 'Installations', image: '/images/install1.jpg' },
  { id: 4, name: 'Precision Machine', category: 'Machines', image: '/images/machine2.jpg' },
  { id: 5, name: 'Grain Storage Silo', category: 'Silos', image: '/images/silo2.jpg' },
  { id: 6, name: 'Industrial Setup', category: 'Installations', image: '/images/install2.jpg' },
];

const ExploreMore = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredItems = selectedCategory === 'All'
    ? items
    : items.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Explore More</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Discover our top-notch machines, high-capacity silos, and industrial installation services.
        </p>
      </header>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 my-8 px-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-semibold shadow-md transition-all ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white'
                : 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6 md:px-12 mb-16">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transform transition-transform duration-300"
          >
            <img src={item.image} alt={item.name} className="w-full h-52 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
              <p className="text-gray-500">{item.category}</p>
            </div>
          </div>
        ))}
      </div>

      {/* About Section */}
      <section className="bg-white py-16 px-6 md:px-24 text-center">
        <h2 className="text-3xl font-bold mb-6 text-blue-700">About Our Company</h2>
        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
          We specialize in heavy machine installation, agricultural silo construction,
          and full industrial setups. Our advanced machinery ensures optimal performance
          and long-lasting durability. Trust us with your next big project for guaranteed success.
        </p>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-200 px-6 md:px-24 text-center">
        <h2 className="text-3xl font-bold mb-8 text-blue-700">Why Choose Us?</h2>
        <ul className="space-y-4 text-lg text-gray-700 max-w-xl mx-auto">
          <li>✔️ Over 20 years of industrial experience</li>
          <li>✔️ Superior quality materials and cutting-edge machines</li>
          <li>✔️ Full installation and support services</li>
          <li>✔️ Competitive and transparent pricing</li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-gray-300 py-6 text-center">
        <p>© 2025 Installation Co. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ExploreMore;
