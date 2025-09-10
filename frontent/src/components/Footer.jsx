import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white pt-12 pb-6 px-6">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* Brand & Summary */}
        <div>
          <h2 className="text-3xl font-bold text-yellow-400 mb-3 tracking-wide" style={{ fontFamily: `'Playfair Display', serif` }}>
            Razul Tech
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            Experts in high-performance machine installation, system integration, and industrial automation. Precision. Power. Perfection.
          </p>
          <div className="flex gap-3">
            <FooterIcon icon={<Facebook size={18} />} />
            <FooterIcon icon={<Twitter size={18} />} />
            <FooterIcon icon={<Instagram size={18} />} />
            <FooterIcon icon={<Mail size={18} />} />
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-300 mb-4">Explore</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><FooterLink to="/">🏠 Home</FooterLink></li>
            <li><FooterLink to="/about">📖 About Us</FooterLink></li>
            <li><FooterLink to="/services">🛠️ Services</FooterLink></li>
            <li><FooterLink to="/contact-us">✉️ Contact</FooterLink></li>
            <li><FooterLink to="/login">🔐 Login</FooterLink></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-300 mb-4">What We Do</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>⚙️ Machine Installation</li>
            <li>🔌 Electrical Systems</li>
            <li>🏭 Industrial Automation</li>
            <li>📐 Custom Engineering</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-300 mb-4">Get in Touch</h3>
          <p className="text-sm text-gray-300">
            📍 Industrial Zone, Nairobi, Kenya<br />
            📞 +254 712 345 678<br />
            ✉️ support@razultech.com
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-gray-500 text-sm border-t border-gray-700 pt-6 mt-12">
        © {new Date().getFullYear()} <span className="text-yellow-400 font-semibold">Razul Tech</span>. All rights reserved.
      </div>
    </footer>
  );
}

function FooterLink({ to, children }) {
  return (
    <Link
      to={to}
      className="hover:text-yellow-400 transition-colors duration-200 font-medium tracking-wide"
      style={{ fontFamily: `'Raleway', sans-serif` }}
    >
      {children}
    </Link>
  );
}

function FooterIcon({ icon }) {
  return (
    <span className="w-9 h-9 flex items-center justify-center rounded-full bg-yellow-400 text-black hover:bg-yellow-500 transition duration-200 cursor-pointer shadow-md">
      {icon}
    </span>
  );
}
