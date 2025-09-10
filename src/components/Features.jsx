// import homeImage from '../assets/homeImage.jpg'
import greebGrass from '../assets/greebGrass.jpg' // Add this background image
import { CheckCircle } from 'lucide-react'

export default function AboutSection() {
  return (
    <section
      className="relative text-gray-800 py-20 px-6 sm:px-12 font-[Raleway,sans-serif]"
      style={{
        backgroundImage: `url(${greebGrass})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backdropFilter: 'blur(2px)',
      }}
    >
      {/* Overlay for clarity */}
      <div className="absolute inset-0 bg-whit backdrop-blur- z-0" />

      <div className="relative z-10">
        {/* Hero Banner */}
        <div className="relative w-full max-h-[500px] rounded-3xl overflow-hidden sm:brightness-110 shadow-2xl mb-24">
          <img
            src={homeImage}
            alt="About Us Banner"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center px-4 bg-black/20">
            <h2
              className="text-5xl sm:text-6xl font-extrabold mb-4 text-blue-900"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Get to Know Us
            </h2>
            <p className="text-lg text-gray-100 max-w-2xl">
              We are on a mission to revolutionize agriculture and distribution with technology. Here's our story.
            </p>
            <div className="mt-6 w-24 h-1 bg-orange-500 rounded-full shadow-lg" />
          </div>
        </div>

        {/* Flex Row: Who We Are + Mission & Vision */}
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 mb-28">
          {/* Who We Are */}
          <div className="flex-1 space-y-6">
            <h3
              className="text-4xl text-center sm:text-5xl font-bold text-gray-900"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Who We Are
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              <span className="font-bold text-orange-500">Razul</span> delivers smart and scalable agricultural solutions...
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                'Smart Grain Distribution',
                'Automated Farming Insights',
                'Trusted Market Access',
                'Machine Rentals & Purchase',
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-orange-50 border border-orange-200 rounded-xl shadow-sm hover:shadow-md transition-transform duration-300 hover:scale-105"
                >
                  <CheckCircle className="text-orange-500 mt-1 w-5 h-5" />
                  <span className="text-gray-800 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="flex-1 space-y-6">
            <h3
              className="text-3xl sm:text-4xl font-bold text-gray-900"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Our Mission & Vision
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              We strive to create a future where technology empowers farmers...
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              {[
                {
                  title: 'Mission',
                  content: 'To simplify grain distribution...',
                },
                {
                  title: 'Vision',
                  content: 'To be the most trusted agri-tech enabler...',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-orange-50 rounded-2xl shadow-sm border border-orange-200 w-full"
                >
                  <h4 className="text-xl font-semibold mb-2 text-orange-600">{item.title}</h4>
                  <p className="text-gray-700">{item.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quote */}
        <div className="max-w-3xl mx-auto text-center px-4">
          <blockquote className="text-xl italic font-medium text-orange-600 border-l-4 border-orange-400 pl-6">
            "We believe that true impact comes from empowering the roots..."
          </blockquote>
          <p className="mt-4 text-orange-700 font-semibold">— Razul Group</p>
        </div>
      </div>
    </section>
  )
}
