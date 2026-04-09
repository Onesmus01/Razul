import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { 
  Menu, X, Home, Info, Phone, LogIn, ChevronRight, 
  ShoppingCart, Search, User, Heart 
} from 'lucide-react';
import logo from '../assets/logo.jpg';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [open]);

  const toggleMenu = () => setOpen(!open);

  const navItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/about", label: "About Us", icon: Info },
    { to: "/contact-us", label: "Contact", icon: Phone },
    { to: "/auth", label: "Login", icon: LogIn },
  ];

  // Quick actions for mobile - no API dependencies
  const mobileActions = [
    { 
      icon: Search, 
      onClick: () => setSearchOpen(!searchOpen), 
      label: "Search"
    },
    { 
      icon: Heart, 
      onClick: () => navigate('/wishlist'), 
      label: "Wishlist"
    },
    { 
      icon: ShoppingCart, 
      onClick: () => navigate('/cart'), 
      label: "Cart"
    },
  ];

  return (
    <>
      {/* Main Navbar */}
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-md py-2' 
            : 'bg-white/80 backdrop-blur-md py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* Logo Section - ENLARGED SQUARE & NOT ROUNDED */}
            <div
              onClick={() => navigate('/')}
              className="flex items-center cursor-pointer group"
            >
              <div className="relative">
                {/* Logo container - square, enlarged, no rounding */}
                <div className=" shadow-sm group-hover:shadow-md transition-all duration-300">
                  <img
                    src={logo}
                    alt="Razul Logo"
                    className="w-16 h-16 sm:w-20 sm:h-12 md:h-12 md:w-20 brightness-150 rounded-lg  object-cover"
                  />
                </div>
                {/* Yellow accent on hover */}
                <div className="absolute -inset-1 bg-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </div>
            </div>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <NavItemDesktop key={item.to} {...item} />
              ))}
            </ul>

            {/* Mobile Actions + Menu Button */}
            <div className="flex items-center gap-0.5 md:hidden">
              {mobileActions.map((action, idx) => (
                <button
                  key={idx}
                  onClick={action.onClick}
                  className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-yellow-50 transition-all duration-300 active:scale-95"
                  aria-label={action.label}
                >
                  <action.icon className="w-5 h-5 text-gray-700" />
                </button>
              ))}
              
              {/* Hamburger Menu Button */}
              <button
                onClick={toggleMenu}
                aria-label={open ? "Close Menu" : "Open Menu"}
                className="relative w-10 h-10 flex items-center justify-center rounded-full bg-yellow-50 hover:bg-yellow-100 transition-all duration-300 active:scale-95 ml-0.5"
              >
                <div className="relative w-5 h-5">
                  <Menu 
                    className={`w-5 h-5 text-yellow-600 absolute transition-all duration-300 ${
                      open ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
                    }`} 
                  />
                  <X 
                    className={`w-5 h-5 text-yellow-600 absolute transition-all duration-300 ${
                      open ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
                    }`} 
                  />
                </div>
              </button>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              <button 
                onClick={() => navigate('/cart')}
                className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-yellow-50 transition-all duration-300"
              >
                <ShoppingCart className="w-5 h-5 text-gray-700" />
              </button>
              <button 
                onClick={() => navigate('/auth')}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-yellow-50 transition-all duration-300"
              >
                <User className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar - Expandable */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${searchOpen ? 'max-h-16 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-9 pr-4 py-2 rounded-full border border-gray-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 outline-none text-sm"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    navigate(`/search?q=${e.target.value}`);
                    setSearchOpen(false);
                  }
                }}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-500 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-[280px] max-w-[85vw] bg-white z-50 md:hidden shadow-2xl transition-transform duration-500 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header with ENLARGED Logo */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-yellow-50 to-white">
          <div className="flex items-center">
            {/* Logo in drawer - also enlarged square */}
            <div className="bg-white shadow-sm">
              <img
                src={logo}
                alt="Razul Logo"
                className="w-16 h-16 object-contain"
              />
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Quick Stats in Drawer */}
        <div className="grid grid-cols-3 gap-2 p-3 border-b border-gray-100">
          <div className="text-center py-1">
            <div className="text-xs text-gray-500">Cart</div>
            <div className="font-bold text-yellow-600 text-sm">0</div>
          </div>
          <div className="text-center py-1 border-x border-gray-100">
            <div className="text-xs text-gray-500">Wishlist</div>
            <div className="font-bold text-yellow-600 text-sm">0</div>
          </div>
          <div className="text-center py-1">
            <div className="text-xs text-gray-500">Orders</div>
            <div className="font-bold text-yellow-600 text-sm">0</div>
          </div>
        </div>

        {/* Drawer Navigation */}
        <div className="p-3">
          <ul className="space-y-1">
            {navItems.map((item, index) => (
              <NavItemMobile 
                key={item.to} 
                {...item} 
                index={index}
                isOpen={open}
              />
            ))}
          </ul>
        </div>

        {/* Drawer Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-50 to-white border-t border-gray-100">
          <p className="text-xs text-gray-400 text-center">
            © 2026 Razul. All rights reserved.
          </p>
        </div>
      </div>

      {/* Spacer - adjusted for larger square logo */}
      <div className={`transition-all duration-300 ${scrolled ? 'h-20' : 'h-24'} ${searchOpen ? 'h-32' : ''}`} />
    </>
  );
}

// Desktop Nav Item
function NavItemDesktop({ to, label, icon: Icon }) {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `relative flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold tracking-wide rounded-full transition-all duration-300 group ${
            isActive
              ? 'text-yellow-600 bg-yellow-50'
              : 'text-gray-600 hover:text-yellow-600 hover:bg-yellow-50/50'
          }`
        }
        style={{ fontFamily: `'Raleway', sans-serif` }}
      >
        <Icon className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" />
        <span>{label}</span>
        {({ isActive }) => isActive && (
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-yellow-500 rounded-full" />
        )}
      </NavLink>
    </li>
  );
}

// Mobile Nav Item
function NavItemMobile({ to, label, icon: Icon, index, isOpen }) {
  return (
    <li 
      className={`transform transition-all duration-500 ${
        isOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
      }`}
      style={{ transitionDelay: isOpen ? `${index * 75}ms` : '0ms' }}
    >
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${
            isActive
              ? 'bg-yellow-50 text-yellow-600 shadow-sm border border-yellow-100'
              : 'text-gray-600 hover:bg-gray-50 hover:text-yellow-600'
          }`
        }
        style={{ fontFamily: `'Raleway', sans-serif` }}
      >
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg ${
            ({ isActive }) => isActive ? 'bg-yellow-100' : 'bg-gray-100'
          }`}>
            <Icon className="w-4 h-4" />
          </div>
          <span className="font-semibold text-sm">{label}</span>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </NavLink>
    </li>
  );
}