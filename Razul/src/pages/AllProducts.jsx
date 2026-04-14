import { useState, useEffect } from "react";
import { FaStar, FaHeart, FaShoppingCart, FaFilter, FaSort, FaSearch } from "react-icons/fa";
import { Sparkles, Zap, TrendingUp, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import asset from "../assets/assets.js";

// Generate all 72 products (same logic as ProductDetailsPage)
const generateProducts = () => {
  const products = [];
  const assetImages = Object.values(asset);
  
  const categories = ["Industrial Machines", "Compact Units", "Heavy Duty", "Smart Units", "Precision Tools"];
  const badges = ["Best", "New", "Hot", null, null, null, null];
  const adjectives = ["Industrial", "Pro", "Smart", "Heavy Duty", "Compact", "Precision", "Advanced", "Ultimate", "Elite", "Master"];
  const nouns = ["Machine", "Unit", "System", "Equipment", "Tool", "Device", "Station", "Center"];
  
  for (let i = 0; i < assetImages.length; i++) {
    const id = i + 1;
    
    products.push({
      id: id,
      name: `${adjectives[i % adjectives.length]} ${nouns[i % nouns.length]} ${id}`,
      subtitle: `Professional Grade ${categories[i % categories.length]}`,
      price: 899 + (i * 50),
      originalPrice: 1099 + (i * 50),
      discount: [10, 15, 18, 20, 25, 5, 12][i % 7],
      rating: (4.0 + (i % 10) / 10).toFixed(1),
      reviews: 50 + (i * 3),
      stock: 5 + (i % 20),
      category: categories[i % categories.length],
      image: assetImages[i],
      badge: badges[i % badges.length]
    });
  }
  
  return products;
};

const allProducts = generateProducts();

const AllProducts = () => {
  const navigate = useNavigate();
  const [likedItems, setLikedItems] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [showFilters, setShowFilters] = useState(false);

  // Get unique categories
  const categories = ["All", ...new Set(allProducts.map(p => p.category))];

  // Filter and sort products
  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch(sortBy) {
      case "price-low": return a.price - b.price;
      case "price-high": return b.price - a.price;
      case "rating": return b.rating - a.rating;
      case "newest": return b.id - a.id;
      default: return a.id - b.id;
    }
  });

  const toggleLike = (e, id) => {
    e.stopPropagation();
    setLikedItems(prev => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
    window.scrollTo(0, 0);
  };

  const getBadge = (badgeType) => {
    switch(badgeType) {
      case 'Best': return { icon: TrendingUp, color: "from-amber-500 to-orange-500" };
      case 'New': return { icon: Sparkles, color: "from-emerald-500 to-teal-500" };
      case 'Hot': return { icon: Zap, color: "from-rose-500 to-pink-500" };
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 py-3">
          {/* Top Row */}
          <div className="flex items-center justify-between mb-3">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium hidden sm:inline">Back</span>
            </button>
            <h1 className="text-lg font-bold text-slate-900">All Products</h1>
            <div className="w-10" /> {/* Spacer for alignment */}
          </div>

          {/* Search Bar */}
          <div className="relative mb-3">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-slate-400 focus:outline-none text-sm"
            />
          </div>

          {/* Filter & Sort Row */}
          <div className="flex gap-2">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                showFilters ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-700 border-slate-200'
              }`}
            >
              <FaFilter className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Filter</span>
            </button>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:border-slate-400"
            >
              <option value="default">Sort by: Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest First</option>
            </select>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <div className="mt-3 pt-3 border-t border-slate-200">
              <p className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">Categories</p>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      selectedCategory === cat 
                        ? 'bg-slate-800 text-white' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="max-w-7xl mx-auto px-3 py-3">
        <p className="text-sm text-slate-500">
          Showing <span className="font-medium text-slate-900">{filteredProducts.length}</span> of {allProducts.length} products
        </p>
      </div>

      {/* Products Grid - 3 per row on mobile, more on larger screens */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
          {filteredProducts.map((product) => {
            const badge = getBadge(product.badge);
            
            return (
              <div 
                key={product.id}
                onClick={() => handleProductClick(product.id)}
                className="bg-white rounded-lg sm:rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-all active:scale-95 sm:active:scale-100 sm:hover:-translate-y-1 cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative aspect-square bg-slate-100">
                  {product.image ? (
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  {/* Fallback */}
                  <div 
                    className="absolute inset-0 hidden items-center justify-center bg-slate-100 text-slate-400"
                    style={{ display: product.image ? 'none' : 'flex' }}
                  >
                    <span className="text-2xl">📷</span>
                  </div>
                  
                  {/* Badge */}
                  {badge && (
                    <div className={`absolute top-1 left-1 sm:top-2 sm:left-2 px-1 sm:px-2 py-0.5 rounded-full bg-gradient-to-r ${badge.color} text-white text-[8px] sm:text-xs font-bold flex items-center gap-0.5`}>
                      <badge.icon className="w-2 h-2 sm:w-3 sm:h-3" />
                      <span className="hidden sm:inline">{badge.text}</span>
                    </div>
                  )}
                  
                  {/* Discount Badge */}
                  {product.discount > 0 && (
                    <div className="absolute top-1 right-1 sm:top-2 sm:right-2 px-1 sm:px-2 py-0.5 rounded-full bg-rose-500 text-white text-[8px] sm:text-xs font-bold">
                      -{product.discount}%
                    </div>
                  )}
                  
                  {/* Like Button */}
                  <button 
                    onClick={(e) => toggleLike(e, product.id)}
                    className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/90 shadow-sm flex items-center justify-center"
                  >
                    <FaHeart className={`w-3 h-3 sm:w-4 sm:h-4 ${likedItems.has(product.id) ? 'text-rose-500 fill-rose-500' : 'text-slate-400'}`} />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-1.5 sm:p-3">
                  {/* Rating */}
                  <div className="flex items-center gap-0.5 mb-0.5 sm:mb-1">
                    <FaStar className="w-2 h-2 sm:w-3 sm:h-3 text-amber-400 fill-amber-400" />
                    <span className="text-[8px] sm:text-xs font-medium text-slate-700">{product.rating}</span>
                    <span className="text-[6px] sm:text-[10px] text-slate-400">({product.reviews})</span>
                  </div>
                  
                  {/* Name */}
                  <h3 className="text-[9px] sm:text-sm font-medium text-slate-800 truncate leading-tight mb-0.5 sm:mb-1">
                    {product.name}
                  </h3>
                  
                  {/* Category */}
                  <p className="text-[7px] sm:text-xs text-slate-500 truncate mb-1 sm:mb-2 hidden sm:block">
                    {product.category}
                  </p>
                  
                  {/* Price & Cart */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] sm:text-sm font-bold text-slate-900">
                        ${product.price.toLocaleString()}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-[7px] sm:text-xs text-slate-400 line-through">
                          ${product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    
                    <button 
                      onClick={(e) => e.stopPropagation()}
                      className="w-5 h-5 sm:w-8 sm:h-8 rounded-full bg-slate-800 text-white flex items-center justify-center hover:bg-slate-700"
                    >
                      <FaShoppingCart className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="text-lg font-medium text-slate-900 mb-1">No products found</h3>
            <p className="text-sm text-slate-500 mb-4">Try adjusting your search or filters</p>
            <button 
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="px-4 py-2 bg-slate-800 text-white rounded-full text-sm"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Load More / End */}
      {filteredProducts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <p className="text-sm text-slate-400">
            Showing all {filteredProducts.length} products
          </p>
        </div>
      )}
    </div>
  );
};

export default AllProducts;