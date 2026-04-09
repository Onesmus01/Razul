import { useState, useEffect } from "react";
import { 
  FaStar, FaHeart, FaShoppingCart, FaShareAlt, FaShieldAlt, 
  FaTruck, FaUndo, FaCheck, FaMinus, FaPlus, FaAngleLeft, FaAngleRight 
} from "react-icons/fa";
import { Sparkles, Zap, TrendingUp, ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import asset from "../assets/assets.js";

// MULTIPLE DUMMY PRODUCTS - Each ID has different data
const allProductsData = {
  1: {
    id: 1,
    name: "Industrial Precision Machine X1",
    subtitle: "Professional Grade Equipment",
    price: 1299,
    originalPrice: 1599,
    discount: 18,
    rating: 4.8,
    reviews: 124,
    stock: 15,
    sku: "MACH-X1-2024",
    category: "Industrial Machines",
    description: "Experience unmatched precision with the X1 series. Built for professionals who demand excellence, this machine combines cutting-edge technology with robust construction.",
    features: [
      "CNC Precision Control System",
      "24/7 Operation Capability",
      "Energy Efficient Motor",
      "Digital Display Interface",
      "Safety Lock Mechanism",
      "2-Year Warranty Included"
    ],
    specifications: {
      "Power": "2200W",
      "Voltage": "220V/110V",
      "Weight": "45kg",
      "Dimensions": "60x40x50cm",
      "Material": "Stainless Steel",
      "Warranty": "2 Years"
    },
    imageIndex: 0, // Uses asset[0]
    badge: "Best"
  },
  2: {
    id: 2,
    name: "Machine Pro V2",
    subtitle: "Advanced Automation System",
    price: 1499,
    originalPrice: 1899,
    discount: 21,
    rating: 4.9,
    reviews: 89,
    stock: 8,
    sku: "PRO-V2-2024",
    category: "Industrial Machines",
    description: "The Pro V2 brings advanced automation to your workshop. Featuring AI-assisted calibration and remote monitoring capabilities.",
    features: [
      "AI-Assisted Calibration",
      "Remote Monitoring App",
      "Auto-Shutoff Safety",
      "Precision Laser Guide",
      "Extended 3-Year Warranty",
      "Cloud Sync Capability"
    ],
    specifications: {
      "Power": "2800W",
      "Voltage": "220V/380V",
      "Weight": "52kg",
      "Dimensions": "65x45x55cm",
      "Material": "Industrial Aluminum",
      "Warranty": "3 Years"
    },
    imageIndex: 1, // Uses asset[1]
    badge: "New"
  },
  3: {
    id: 3,
    name: "Compact Unit C3",
    subtitle: "Space-Saving Powerhouse",
    price: 899,
    originalPrice: 1099,
    discount: 18,
    rating: 4.6,
    reviews: 256,
    stock: 42,
    sku: "COMP-C3-2024",
    category: "Compact Units",
    description: "Don't let the size fool you. The C3 delivers professional-grade performance in a compact footprint perfect for small workshops.",
    features: [
      "Compact 40cm Footprint",
      "Quick-Change Attachments",
      "Quiet Operation Mode",
      "LED Work Lighting",
      "Portable Design",
      "1-Year Warranty"
    ],
    specifications: {
      "Power": "1500W",
      "Voltage": "110V/220V",
      "Weight": "28kg",
      "Dimensions": "40x35x40cm",
      "Material": "Carbon Steel",
      "Warranty": "1 Year"
    },
    imageIndex: 2, // Uses asset[2]
    badge: "Hot"
  },
  4: {
    id: 4,
    name: "Heavy Duty H1",
    subtitle: "Industrial Strength Beast",
    price: 1899,
    originalPrice: 2299,
    discount: 17,
    rating: 4.7,
    reviews: 67,
    stock: 5,
    sku: "HEAVY-H1-2024",
    category: "Heavy Duty",
    description: "Built for the toughest jobs. The H1 handles extreme workloads with ease. Reinforced frame and heavy-duty components ensure longevity.",
    features: [
      "5-Ton Capacity",
      "Reinforced Steel Frame",
      "Hydraulic Assist",
      "Thermal Protection",
      "Industrial Grade Motor",
      "5-Year Warranty"
    ],
    specifications: {
      "Power": "3500W",
      "Voltage": "380V Three-Phase",
      "Weight": "85kg",
      "Dimensions": "80x60x70cm",
      "Material": "Reinforced Steel",
      "Warranty": "5 Years"
    },
    imageIndex: 3, // Uses asset[3]
    badge: null
  },
  5: {
    id: 5,
    name: "Smart Unit S4",
    subtitle: "IoT Enabled Smart Machine",
    price: 1199,
    originalPrice: 1399,
    discount: 14,
    rating: 4.5,
    reviews: 198,
    stock: 23,
    sku: "SMART-S4-2024",
    category: "Smart Units",
    description: "The future of machining is here. Full IoT integration allows you to monitor and control operations from anywhere via the mobile app.",
    features: [
      "Full IoT Integration",
      "Mobile App Control",
      "Predictive Maintenance",
      "Energy Usage Analytics",
      "Voice Command Ready",
      "2-Year Warranty"
    ],
    specifications: {
      "Power": "2000W",
      "Voltage": "220V",
      "Weight": "38kg",
      "Dimensions": "55x40x45cm",
      "Material": "Composite Alloy",
      "Warranty": "2 Years"
    },
    imageIndex: 4, // Uses asset[4]
    badge: "New"
  }
};

// Get related products (excluding current)
const getRelatedProducts = (currentId) => {
  return Object.values(allProductsData)
    .filter(p => p.id !== parseInt(currentId))
    .slice(0, 4);
};

// Reviews generator based on product ID
const getReviews = (productId) => {
  const reviewTemplates = [
    { user: "John M.", rating: 5, date: "2 days ago", comment: "Exceptional build quality. Exceeded expectations!" },
    { user: "Sarah K.", rating: 4, date: "1 week ago", comment: "Great machine, but setup took longer than expected." },
    { user: "Mike R.", rating: 5, date: "2 weeks ago", comment: "Best investment for my workshop. Highly recommend." },
    { user: "Lisa T.", rating: 5, date: "3 days ago", comment: "Works perfectly. Customer service was excellent." },
    { user: "David Chen", rating: 4, date: "5 days ago", comment: "Good value for money. Would buy again." }
  ];
  
  // Return different reviews based on product ID
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
  
  // Get product data based on ID from URL
  const product = allProductsData[id] || allProductsData[1]; // Fallback to product 1 if not found
  const relatedProducts = getRelatedProducts(id);
  const reviews = getReviews(product.id);
  
  // Get available images for this product (current + next 4 images)
  const assetImages = Object.values(asset);
  const productImages = [
    assetImages[product.imageIndex],
    assetImages[(product.imageIndex + 1) % assetImages.length],
    assetImages[(product.imageIndex + 2) % assetImages.length],
    assetImages[(product.imageIndex + 3) % assetImages.length],
    assetImages[(product.imageIndex + 4) % assetImages.length]
  ];

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
          
          {/* Image Gallery */}
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
              
              <img 
                src={productImages[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
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

            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden transition-all ${
                    selectedImage === idx ? 'border-slate-800' : 'border-slate-200'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
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

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-200">
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
                Add to Cart
              </button>
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
                <div className="flex flex-col md:flex-row gap-8 pb-6 border-b border-slate-200">
                  <div className="text-center md:text-left">
                    <div className="text-4xl font-bold text-slate-900 mb-1">{product.rating}</div>
                    <div className="flex justify-center md:justify-start gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} 
                        />
                      ))}
                    </div>
                    <div className="text-sm text-slate-500">Based on {product.reviews} reviews</div>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <div key={stars} className="flex items-center gap-3">
                        <span className="text-sm text-slate-600 w-8">{stars} star</span>
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-amber-400 rounded-full" 
                            style={{ width: `${stars === 5 ? 70 : stars === 4 ? 20 : 10}%` }}
                          />
                        </div>
                      </div>
                    ))}
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
              const prodImage = Object.values(asset)[prod.imageIndex];
              
              return (
                <div 
                  key={prod.id} 
                  onClick={() => {
                    navigate(`/product/${prod.id}`);
                    window.scrollTo(0, 0);
                  }}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group"
                >
                  <div className="relative aspect-[4/3] bg-slate-100">
                    <img src={prodImage} alt={prod.name} className="w-full h-full object-cover" />
                    {badge && (
                      <div className={`absolute top-2 left-2 px-2 py-0.5 rounded-full bg-gradient-to-r ${badge.color} text-white text-xs font-bold flex items-center gap-1`}>
                        <badge.icon className="w-3 h-3" />
                        {prod.badge}
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <div className="flex items-center gap-0.5 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar 
                          key={i} 
                          className={`w-3 h-3 ${i < Math.floor(prod.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} 
                        />
                      ))}
                      <span className="text-xs text-slate-500 ml-1">({prod.rating})</span>
                    </div>
                    <h3 className="text-sm font-semibold text-slate-800 mb-1 truncate">{prod.name}</h3>
                    <p className="text-xs text-slate-500 mb-2 line-clamp-1">{prod.subtitle}</p>
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