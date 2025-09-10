export default function ContactPage() {
    return (
      <section className="bg-white text-gray-800 py-20 px-6 sm:px-12 font-[Raleway,sans-serif]">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Contact <span className="text-orange-500">Razul Group</span>
          </h2>
          <p className="text-lg text-gray-600">
            We'd love to hear from you! Fill out the form below or use the contact info to reach us directly.
          </p>
          <div className="mt-6 w-24 h-1 bg-orange-500 rounded-full mx-auto shadow-lg" />
        </div>
  
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <form className="space-y-6 p-8 bg-gradient-to-br from-orange-100 to-white border border-orange-200 rounded-2xl shadow-lg">
            <div>
              <label className="block mb-2 text-gray-700 font-medium">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-700 font-medium">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-700 font-medium">Message</label>
              <textarea
                rows="5"
                placeholder="Tell us something..."
                className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition resize-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-orange-500 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-orange-600 transition duration-300 w-full"
            >
              Send Message
            </button>
          </form>
  
          {/* Contact Details */}
          <div className="p-8 bg-gray-50 rounded-2xl shadow-lg border border-gray-200 space-y-6">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold text-gray-800">Email</h3>
              <p className="text-gray-600">contact@razulgroup.com</p>
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-semibold text-gray-800">Phone</h3>
              <p className="text-gray-600">+254 700 123 456</p>
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-semibold text-gray-800">Office Address</h3>
              <p className="text-gray-600">
                2nd Floor, Green Towers Plaza<br />
                Nairobi, Kenya
              </p>
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-semibold text-gray-800">Business Hours</h3>
              <p className="text-gray-600">Mon – Fri: 9AM – 5PM</p>
            </div>
          </div>
        </div>
      </section>
    )
  }
  