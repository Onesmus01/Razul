import { useState, useEffect } from "react";
import { 
  FaStar, FaHeart, FaShoppingCart, FaShareAlt, FaShieldAlt, 
  FaTruck, FaUndo, FaCheck, FaMinus, FaPlus, FaAngleLeft, FaAngleRight 
} from "react-icons/fa";
import { Sparkles, Zap, TrendingUp, ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import asset from "../assets/assets.js";

// ✅ DEBUG: Check asset import immediately
console.log('=== ASSET DEBUG ===');
console.log('Raw asset object:', asset);
console.log('Asset keys:', Object.keys(asset));
console.log('Asset values:', Object.values(asset));
console.log('Asset length:', Object.values(asset).length);

// ✅ GENERATE ALL 72 PRODUCTS DYNAMICALLY
const generateProducts = () => {
  const products = {};
  const assetImages = Object.values(asset);
  const totalImages = assetImages.length;
  
  console.log('Generating products for', totalImages, 'images');
  
  const categories = ["Industrial Machines", "Compact Units", "Heavy Duty", "Smart Units", "Precision Tools"];
  const badges = ["Best", "New", "Hot", null, null];
  const adjectives = ["Industrial", "Pro", "Smart", "Heavy Duty", "Compact", "Precision", "Advanced", "Ultimate"];
  const nouns = ["Machine", "Unit", "System", "Equipment", "Tool", "Device"];
  
  for (let i = 0; i < totalImages; i++) {
    const id = i + 1;
    const category = categories[i % categories.length];
    const badge = badges[i % badges.length];
    const adj = adjectives[i % adjectives.length];
    const noun = nouns[i % nouns.length];
    
    products[id] = {
      id: id,
      name: `${adj} ${noun} ${id}`,
      subtitle: `Professional Grade ${category}`,
      price: 899 + (i * 50),
      originalPrice: 1099 + (i * 50),
      discount: [10, 15, 18, 20, 25][i % 5],
      rating: (4.0 + (i % 10) / 10).toFixed(1),
      reviews: 50 + (i * 3),
      stock: 5 + (i % 20),
      sku: `SKU-${id.toString().padStart(4, '0')}-2024`,
      category: category,
      description: `Experience top-tier performance with our ${adj} ${noun} ${id}. Designed for professionals who demand excellence in ${category.toLowerCase()}.`,
      features: [
        "Premium Build Quality",
        "Energy Efficient Design",
        "User-Friendly Interface",
        "Safety Certified",
        "2-Year Warranty",
        "24/7 Support"
      ],
      specifications: {
        "Model": `${adj}-${id}`,
        "Category": category,
        "Power": `${1500 + (i * 50)}W`,
        "Voltage": "220V/110V",
        "Weight": `${25 + (i % 30)}kg`,
        "Dimensions": `${40 + (i % 20)}x${35 + (i % 15)}x${40 + (i % 10)}cm`,
        "Material": ["Stainless Steel", "Aluminum", "Carbon Steel", "Titanium"][i % 4],
        "Warranty": "2 Years"
      },
      imageIndex: i,
      badge: badge
    };
  }
  
  return products;
};

const allProductsData = generateProducts();

const getRelatedProducts = (currentId) => {
  const allProducts = Object.values(allProductsData);
  const current = parseInt(currentId);
  
  return allProducts
    .filter(p => p.id !== current)
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);
};

const getReviews = (productId) => {
  const reviewTemplates = [
    { user: "John M.", rating: 5, date: "2 days ago", comment: "Exceptional build quality!" },
    { user: "Sarah K.", rating: 4, date: "1 week ago", comment: "Great machine, easy setup." },
    { user: "Mike R.", rating: 5, date: "2 weeks ago", comment: "Best investment!" },
    { user: "Lisa T.", rating: 5, date: "3 days ago", comment: "Works perfectly." },
    { user: "David Chen", rating: 4, date: "5 days ago", comment: "Good value." }
  ];
  
  const startIndex = (productId - 1) % reviewTemplates.length;
  return [
    reviewTemplates[startIndex],
    reviewTemplates[(startIndex + 1) % reviewTemplates.length],
    reviewTemplates[(startIndex + 2) % reviewTemplates.length]
  ].map((r, i) => ({ ...r, id: i + 1 }));
};

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [imageLoadErrors, setImageLoadErrors] = useState({});
  
  // ✅ DEBUG LOGGING
  useEffect(() => {
    console.log('=== PRODUCT DETAILS DEBUG ===');
    console.log('URL ID param:', id);
    console.log('Product found:', allProductsData[id]);
    console.log('Asset images count:', Object.values(asset).length);
    console.log('First image:', Object.values(asset)[0]);
    console.log('Image for this product:', Object.values(asset)[(id - 1) % Object.values(asset).length]);
  }, [id]);

  const product = allProductsData[id];
  
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Product Not Found</h1>
          <p className="text-slate-600 mb-4">Product #{id} doesn't exist</p>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-slate-800 text-white rounded-full hover:bg-slate-700"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }
  
  const relatedProducts = getRelatedProducts(id);
  const reviews = getReviews(product.id);
  
  const assetImages = Object.values(asset);
  const productImages = [
    assetImages[product.imageIndex % assetImages.length],
    assetImages[(product.imageIndex + 1) % assetImages.length],
    assetImages[(product.imageIndex + 2) % assetImages.length],
    assetImages[(product.imageIndex + 3) % assetImages.length],
    assetImages[(product.imageIndex + 4) % assetImages.length]
  ];

  const handleImageError = (imgIndex, imgSrc) => {
    console.error(`❌ Image ${imgIndex} failed to load:`, imgSrc);
    setImageLoadErrors(prev => ({ ...prev, [imgIndex]: true }));
  };

  const decreaseQuantity = () => setQuantity(prev => Math.max(1, prev - 1));
  const increaseQuantity = () => setQuantity(prev => Math.min(product.stock, prev + 1));
  const nextImage = () => setSelectedImage(prev => (prev + 1) % productImages.length);
  const prevImage = () => setSelectedImage(prev => (prev - 1 + productImages.length) % productImages.length);

  const getBadge = (badgeType) => {
    switch(badgeType) {
      case 'Best': return { icon: TrendingUp, color: "from-amber-500 to-orange-500" };
      case 'New': return { icon: Sparkles, color: "from-emerald-500 to-teal-500" };
      case 'Hot': return { icon: Zap, color: "from-rose-500 to-pink-500" };
      default: return null;
    }
  };

  const currentBadge = getBadge(product.badge);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Navigation Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline text-sm font-medium">Back</span>
          </button>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-medium">SKU: {product.sku}</span>
            <button className="p-2 rounded-full hover:bg-slate-100 transition-colors">
              <FaShareAlt className="w-4 h-4 text-slate-600" />
            </button>
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className="p-2 rounded-full hover:bg-slate-100 transition-colors"
            >
              <FaHeart className={`w-4 h-4 ${isLiked ? 'text-rose-500 fill-rose-500' : 'text-slate-600'}`} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <span className="hover:text-slate-700 cursor-pointer" onClick={() => navigate('/')}>Home</span>
          <span>/</span>
          <span className="hover:text-slate-700 cursor-pointer">{product.category}</span>
          <span>/</span>
          <span className="text-slate-900 font-medium truncate max-w-[200px]">{product.name}</span>
        </div>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Image Gallery - WITH ERROR HANDLING */}
          <div className="space-y-4">
            <div className="relative bg-white rounded-2xl border border-slate-200 overflow-hidden aspect-square group">
              {product.discount > 0 && (
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-rose-500 text-white text-xs font-bold z-10">
                  -{product.discount}%
                </div>
              )}
              
              {currentBadge && (
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r ${currentBadge.color} text-white text-xs font-bold flex items-center gap-1 z-10`}>
                  <currentBadge.icon className="w-3 h-3" />
                  {product.badge}
                </div>
              )}
              
              {/* ✅ MAIN IMAGE WITH ERROR HANDLING */}
              {productImages[selectedImage] && !imageLoadErrors[selectedImage] ? (
                <img 
                  src={productImages[selectedImage]} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={() => handleImageError(selectedImage, productImages[selectedImage])}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                  <div className="text-center">
                    <p className="text-4xl mb-2">🖼️</p>
                    <p className="text-sm">Image not found</p>
                    <p className="text-xs mt-1">Path: {productImages[selectedImage] || 'undefined'}</p>
                  </div>
                </div>
              )}
              
              <button 
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <FaAngleLeft className="text-slate-700" />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <FaAngleRight className="text-slate-700" />
              </button>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden transition-all ${
                    selectedImage === idx ? 'border-slate-800' : 'border-slate-200'
                  }`}
                >
                  {img && !imageLoadErrors[idx] ? (
                    <img 
                      src={img} 
                      alt="" 
                      className="w-full h-full object-cover"
                      onError={() => handleImageError(idx, img)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400 text-xs">
                      No img
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                  ID: {product.id}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                  {product.sku}
                </span>
                {product.stock < 10 && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-medium flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    Only {product.stock} left
                  </span>
                )}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">
                {product.name}
              </h1>
              <p className="text-slate-500">{product.subtitle}</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar 
                    key={i} 
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} 
                  />
                ))}
                <span className="ml-2 text-sm font-medium text-slate-900">{product.rating}</span>
              </div>
              <span className="text-slate-400">|</span>
              <span className="text-sm text-slate-600 underline cursor-pointer">
                {product.reviews} reviews
              </span>
            </div>

            <div className="space-y-2">
              {product.features.slice(0, 4).map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                  <FaCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* Price & Add to Cart */}
            <div className="pt-4 border-t border-slate-200">
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-3xl font-bold text-slate-900">${product.price.toLocaleString()}</span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-lg text-slate-400 line-through">${product.originalPrice.toLocaleString()}</span>
                    <span className="px-2 py-1 rounded-full bg-rose-100 text-rose-700 text-sm font-medium">
                      Save ${(product.originalPrice - product.price).toLocaleString()}
                    </span>
                  </>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center border border-slate-300 rounded-full px-1">
                  <button 
                    onClick={decreaseQuantity}
                    className="w-10 h-10 flex items-center justify-center text-slate-600 hover:text-slate-900"
                  >
                    <FaMinus className="w-3 h-3" />
                  </button>
                  <span className="w-12 text-center font-semibold text-slate-900">{quantity}</span>
                  <button 
                    onClick={increaseQuantity}
                    className="w-10 h-10 flex items-center justify-center text-slate-600 hover:text-slate-900"
                  >
                    <FaPlus className="w-3 h-3" />
                  </button>
                </div>

                <button className="flex-1 bg-slate-800 text-white rounded-full py-3 px-6 font-semibold hover:bg-slate-700 transition-colors flex items-center justify-center gap-2">
                  <FaShoppingCart className="w-4 h-4" />
                  Add to Cart - ${(product.price * quantity).toLocaleString()}
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                  <FaTruck className="w-5 h-5 text-slate-600" />
                </div>
                <span className="text-xs text-slate-600">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                  <FaShieldAlt className="w-5 h-5 text-slate-600" />
                </div>
                <span className="text-xs text-slate-600">Secure Payment</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                  <FaUndo className="w-5 h-5 text-slate-600" />
                </div>
                <span className="text-xs text-slate-600">30-Day Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden mb-12">
          <div className="flex border-b border-slate-200">
            {['description', 'specifications', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 text-sm font-medium capitalize transition-colors ${
                  activeTab === tab 
                    ? 'text-slate-900 border-b-2 border-slate-800' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'description' && (
              <div className="space-y-4">
                <p className="text-slate-600 leading-relaxed">{product.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <FaCheck className="w-3 h-3 text-emerald-600" />
                      </div>
                      <span className="text-sm text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="space-y-2">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-3 border-b border-slate-100 last:border-0">
                    <span className="text-slate-600">{key}</span>
                    <span className="font-medium text-slate-900">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-6 border-b border-slate-200">
                  <div>
                    <div className="text-4xl font-bold text-slate-900 mb-1">{product.rating}</div>
                    <div className="flex gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} 
                        />
                      ))}
                    </div>
                    <div className="text-sm text-slate-500">Based on {product.reviews} reviews</div>
                  </div>
                </div>

                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-slate-100 last:border-0 pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-sm font-bold text-slate-600">
                            {review.user[0]}
                          </div>
                          <span className="font-medium text-slate-900">{review.user}</span>
                        </div>
                        <span className="text-xs text-slate-400">{review.date}</span>
                      </div>
                      <div className="flex gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <FaStar 
                            key={i} 
                            className={`w-3 h-3 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} 
                          />
                        ))}
                      </div>
                      <p className="text-sm text-slate-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((prod) => {
              const badge = getBadge(prod.badge);
              const prodImage = assetImages[prod.imageIndex];
              
              return (
                <div 
                  key={prod.id} 
                  onClick={() => {
                    navigate(`/product/${prod.id}`);
                    window.scrollTo(0, 0);
                  }}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer"
                >
                  <div className="relative aspect-[4/3] bg-slate-100">
                    {prodImage && !imageLoadErrors[`related-${prod.id}`] ? (
                      <img 
                        src={prodImage} 
                        alt={prod.name} 
                        className="w-full h-full object-cover"
                        onError={() => {
                          console.error(`Related product ${prod.id} image failed`);
                          setImageLoadErrors(prev => ({ ...prev, [`related-${prod.id}`]: true }));
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                        No Image
                      </div>
                    )}
                    {badge && (
                      <div className={`absolute top-2 left-2 px-2 py-0.5 rounded-full bg-gradient-to-r ${badge.color} text-white text-xs font-bold flex items-center gap-1`}>
                        <badge.icon className="w-3 h-3" />
                        {prod.badge}
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-semibold text-slate-800 mb-1 truncate">{prod.name}</h3>
                    <p className="text-xs text-slate-500 mb-2">${prod.price.toLocaleString()}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`.scrollbar-hide::-webkit-scrollbar{display:none}.scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}`}</style>
    </div>
  );
};

export default ProductDetailsPage;