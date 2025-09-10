import { PhoneCall } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function CallToAction() {
  const navigate = useNavigate()

  const handleFormClick = () => {
    navigate('/request-form')
  }

  const whatsappLink =
    'https://wa.me/254712345678?text=Hello%20Razul%20Team,%20I%20need%20a%20custom%20machine%20setup.'

  return (
    <section className="bg-slate-100 text-slate-800 py-20 px-6 sm:px-12 text-center font-[Raleway,sans-serif]">
      <div className="max-w-4xl mx-auto space-y-6">
        <h2
          className="text-4xl sm:text-5xl font-extrabold text-slate-900"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Need a Custom Setup?
        </h2>
        <p className="text-lg sm:text-xl text-slate-600">
          Talk to our experts and get personalized recommendations tailored to your agricultural operations.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6 pt-6">
          <button
            onClick={handleFormClick}
            className="bg-white text-slate-800 px-6 py-3 rounded-full text-lg font-semibold shadow hover:bg-slate-200 transition"
          >
            Request a Setup Form
          </button>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white text-lg font-semibold rounded-full transition"
          >
            <PhoneCall className="w-5 h-5" />
            Chat via WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
