import React, { useState } from "react";
import { FaWhatsapp, FaPhoneAlt, FaTimes, FaPhone } from "react-icons/fa";

const ContactFloatButton = () => {
  const [open, setOpen] = useState(false);

  // Your phone number (with country code)
  const phoneNumber = "254110358002";
  const message = "Hello, I would like to inquire about your services";

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;
  const callLink = `tel:${phoneNumber}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Expanded buttons (visible when toggle is open) */}
      {open && (
        <div className="flex flex-col items-end gap-3">
          {/* WhatsApp Button */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition transform hover:scale-110 duration-300"
            title="Chat with us on WhatsApp"
            aria-label="Chat on WhatsApp"
          >
            <FaWhatsapp size={26} />
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Chat on WhatsApp
            </span>
          </a>

          {/* Call Button */}
          <a
            href={callLink}
            className="group relative bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg transition transform hover:scale-110 duration-300"
            title="Call us"
            aria-label="Call us"
          >
            <FaPhoneAlt size={24} />
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Call us
            </span>
          </a>
        </div>
      )}

      {/* Main Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition transform hover:scale-110 duration-300"
        aria-label="Open contact options"
        title="Open contact options"
      >
        {/* Switch icon based on toggle state */}
        {open ? <FaTimes size={28} /> : <FaPhone size={28} />}
      </button>
    </div>
  );
};

export default ContactFloatButton;
