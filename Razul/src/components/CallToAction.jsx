import { PhoneCall } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CallToAction() {
  const navigate = useNavigate();

  const handleFormClick = () => {
    navigate("/request-form");
  };

  // ❗ Leave WhatsApp link untouched
  const whatsappLink =
    "https://wa.me/254110358002?text=Hello%20Razul%20Team,%20I%20need%20a%20custom%20machine%20setup.";

  return (
    <section className="relative overflow-hidden py-28 px-6 sm:px-12 text-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      
      {/* Soft Glow Background */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"></div>

      {/* Logo Watermark */}
      <div
        className="absolute inset-0 opacity-[0.06] bg-center bg-no-repeat bg-contain pointer-events-none"
        style={{ backgroundImage: "url('/assets/logo.jpg')" }}
      ></div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        
        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Need a Custom Machine Setup?
          </span>
        </h2>

        {/* Description */}
        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">
          Talk to our professional installation team and get precision-built
          solutions tailored for your grain processing and agricultural needs.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
          <button
            onClick={handleFormClick}
            className="px-9 py-3 rounded-full bg-white text-slate-900 text-lg font-semibold shadow-lg hover:bg-slate-100 transition-all duration-300 hover:scale-105"
          >
            Request Setup Form
          </button>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-9 py-3 rounded-full bg-emerald-500 text-white text-lg font-semibold shadow-lg hover:bg-emerald-600 transition-all duration-300 hover:scale-105"
          >
            <PhoneCall className="w-5 h-5" />
            Chat via WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
}
