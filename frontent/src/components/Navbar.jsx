import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, Home } from 'lucide-react';
import logo from '../assets/logo.jpg';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => setOpen(!open);

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-md border-b border-gray-200">
        <div className="max-w-[1280px] mx-auto px-6 py-4 flex justify-between items-center transition-all duration-300">

          {/* Logo */}
          <div
            onClick={() => navigate('/')}
            className="flex items-center gap-3 cursor-pointer"
          >
            <img
              src={logo}
              alt="Razul Logo"
              className="w-[120px] h-[70px] object-cover rounded-full shadow-sm"
            />
            <h1 className="text-3xl font-bold text-yellow-400 tracking-wider drop-shadow-sm" style={{ fontFamily: `'Playfair Display', serif` }}>
              Razul
            </h1>
          </div>

          {/* Hamburger */}
          <button
            onClick={toggleMenu}
            aria-label="Toggle Menu"
            className="md:hidden p-2 rounded-md hover:bg-yellow-100 transition"
          >
            {open ? (
              <X className="w-6 h-6 text-yellow-400" />
            ) : (
              <Menu className="w-6 h-6 text-yellow-400" />
            )}
          </button>

          {/* Nav Items */}
          <ul className={`absolute md:static top-[100px] left-0 w-full md:w-auto flex flex-col md:flex-row items-start md:items-center gap-5 px-6 md:px-0 py-6 md:py-0 bg-white/80 md:bg-transparent rounded-b-xl shadow-lg md:shadow-none transition-all duration-300 ease-in-out ${
            open ? 'opacity-100 visible' : 'opacity-0 invisible md:opacity-100 md:visible'
          }`}>
            <NavItem to="/" label="Home" icon={<Home className="mr-2 w-5 h-5" />} />
            <NavItem to="/about" label="About Us" />
            <NavItem to="/contact-us" label="Contact" />
            <NavItem to="/login" label="Login" />
          </ul>
        </div>
      </nav>

      {/* Spacer to prevent content overlap */}
      <div className="pt-[100px]" />
    </>
  );
}

function NavItem({ to, label, icon }) {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center text-[17px] font-semibold py-2 px-4 rounded-md tracking-wide transition-all duration-200 ease-in-out ${
            isActive
              ? 'text-yellow-400 border-b-2 border-yellow-400'
              : 'text-gray-700 hover:text-yellow-400 hover:translate-x-1'
          }`
        }
        style={{ fontFamily: `'Raleway', sans-serif` }}
      >
        {icon}
        {label}
      </NavLink>
    </li>
  );
}
