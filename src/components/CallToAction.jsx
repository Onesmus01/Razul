import { PhoneCall } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CallToAction() {
  const navigate = useNavigate();

  const handleFormClick = () => {
    navigate('/request-form');
  };

  const whatsappLink =
    'https://wa.me/254712345678?text=Hello%20Razul%20Team,%20I%20need%20a%20custom%20machine%20setup.';

  return (
    <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-24 px-6 sm:px-12 text-center relative overflow-hidden">
      {/* Decorative SVG or Blob Background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-cover bg-center bg-no-repeat pointer-events-none" style={{ backgroundImage: "url('/assets/logo.jpg')" }}></div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        <h2
          className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-yellow-300 via-emerald-400 to-teal-300 bg-clip-text text-transparent animate-pulse"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Need a Custom Setup?
        </h2>

        <p className="text-lg sm:text-xl text-slate-300">
          Speak to our machine installation experts and get the best solutions tailored for your grain processing or agricultural needs.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6 pt-6">
          <button
            onClick={handleFormClick}
            className="bg-white text-slate-900 px-8 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-yellow-100 transition transform hover:scale-105"
          >
            Request Setup Form
          </button>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white text-lg font-semibold rounded-full shadow-md transition transform hover:scale-105"
          >
            <PhoneCall className="w-5 h-5" />
            Chat via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
