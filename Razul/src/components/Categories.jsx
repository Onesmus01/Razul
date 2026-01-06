import { useState } from 'react'

const machineCategories = [
  { id: 1, name: 'Thresher' },
  { id: 2, name: 'Sheller' },
  { id: 3, name: 'Mill' },
  { id: 4, name: 'Dryer' },
  { id: 5, name: 'Combine Harvester' },
  { id: 6, name: 'Plough' },
]

const machines = [
  { id: 1, name: 'Maize Thresher', category: 'Thresher' },
  { id: 2, name: 'Maize Sheller 3000', category: 'Sheller' },
  { id: 3, name: 'Grain Dryer Pro', category: 'Dryer' },
  { id: 4, name: 'Rice Mill Pro', category: 'Mill' },
  { id: 5, name: 'Combine Harvester 6000', category: 'Combine Harvester' },
]

export default function CategoriesFilterPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Filter machines based on the selected category
  const filteredMachines = selectedCategory === 'All' 
    ? machines 
    : machines.filter(machine => machine.category === selectedCategory)

  return (
    <section className="bg-gray-100 text-black py-20 px-6 sm:px-12 font-[Raleway,sans-serif]">
      <div className="text-center mb-16">
        <h2 className="text-5xl sm:text-6xl font-extrabold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
          Filter Machines by Category
        </h2>
        <p className="text-lg text-black max-w-2xl mx-auto">
          Choose the type of machine you're interested in to narrow down your search.
        </p>
        <div className="mt-6 w-24 h-1 bg-orange-500 rounded-full mx-auto shadow-lg" />
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-6 mb-12">
        <button
          onClick={() => setSelectedCategory('All')}
          className={`px-6 py-2 rounded-full ${selectedCategory === 'All' ? 'bg-orange-500' : 'bg-blue-500'} hover:bg-orange-500 text-white transition`}
        >
          All Machines
        </button>
        {machineCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.name)}
            className={`px-6 py-2 rounded-full ${selectedCategory === category.name ? 'bg-orange-500' : 'bg-white/10'} hover:bg-orange-500 text-black transition`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Machine Cards */}
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {filteredMachines.map((machine) => (
          <div key={machine.id} className="bg-white border border-white/20 backdrop-blur-lg rounded-3xl overflow-hidden shadow-lg hover:shadow-orange-500/30 transition duration-300">
            <div className="w-full h-56 bg-gray-100">
              {/* Replace this with actual machine images */}
            </div>
            <div className="p-6 space-y-3">
              <h3 className="text-2xl font-semibold text-orange-400">{machine.name}</h3>
              <p className="text-black">Category: {machine.category}</p>
              <button className="mt-3 inline-block px-5 py-2 rounded-full bg-orange-500 hover:bg-orange-600 transition text-white font-medium">
                Request Install
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
