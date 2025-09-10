import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import CountUp from 'react-countup'
import asset from '../assets/assets.js'


const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  return (
    <div className="overflow-x-hidden py-20">
            <hr className="border-t-2 border-gray-300 mb-8" />


      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center py-14 px-6 text-center bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 text-white overflow-hidden">

        <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center opacity-30"></div>
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 z-10 drop-shadow-lg">About Us</h1>
        <p className="max-w-2xl text-lg md:text-2xl z-10 text-gray-100 drop-shadow-md">
          Building the future with precision, innovation, and heart.
        </p>
      </section>

      {/* Our Journey Timeline */}
      <section className="py-20 px-6 md:px-20 bg-gray-50 relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-transparent animate-growline"></div>

        <h2 className="text-3xl font-bold text-center mb-16 text-blue-800" data-aos="fade-down">Our Journey</h2>

        <div className="relative space-y-24">
          {[
            { step: 'Planning', desc: 'We map every detail to meet your vision.', icon: '🧠' },
            { step: 'Designing', desc: 'Turning ideas into breathtaking blueprints.', icon: '✏️' },
            { step: 'Installation', desc: 'Delivering with surgical precision.', icon: '🏗️' },
            { step: 'Testing', desc: 'Perfection through rigorous testing.', icon: '✅' },
            { step: 'Support', desc: 'Standing by you even after installation.', icon: '🤝' },
          ].map((item, idx) => (
            <div key={idx} data-aos="fade-up" data-aos-delay={idx * 150} className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0 bg-white p-6 rounded-full shadow-md text-3xl">{item.icon}</div>
              <div>
                <h3 className="text-2xl font-semibold mb-2 text-blue-700">{item.step}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Vision and Mission */}
      <section className="py-20 px-6 md:px-20 bg-white">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div data-aos="fade-right">
            <h2 className="text-4xl font-bold mb-4 text-blue-800">Our Vision</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              To revolutionize the industry with groundbreaking technologies and unparalleled service.
            </p>
          </div>
          <div data-aos="fade-left">
            <h2 className="text-4xl font-bold mb-4 text-blue-800">Our Mission</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Delivering excellence through commitment, craftsmanship, and innovation to empower every client’s success.
            </p>
          </div>
        </div>
      </section>

      {/* Parallax Section */}

      {/* Achievements */}
      <section className="py-20 px-6 md:px-20 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-16 text-blue-800" data-aos="fade-down">Our Achievements</h2>
      <div className="grid md:grid-cols-4 gap-10 text-center">
        {[
          { number: 500, label: 'Installations' },
          { number: 20, label: 'Years of Experience' },
          { number: 100, label: 'Client Satisfaction' },
          { number: 50, label: 'Expert Engineers' },
        ].map((stat, idx) => (
          <div
            key={idx}
            data-aos="zoom-in"
            data-aos-delay={idx * 100}
            className="flex flex-col items-center"
          >
            <div className="text-5xl font-extrabold text-blue-700">
              <CountUp
                start={0}
                end={stat.number}
                duration={20} // Controls the speed of the count
                separator=","
              />
              {stat.number === 100 ? '%' : '+'} {/* Add symbol for percentages and plus */}
            </div>
            <div className="mt-2 text-gray-600 text-lg">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>

      {/* Core Values Section */}
      <section className="py-20 px-6 md:px-20 bg-white">
        <h2 className="text-3xl font-bold text-center mb-16 text-blue-800" data-aos="fade-up">Our Core Values</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            { title: 'Integrity', desc: 'We uphold the highest standards of honesty and transparency.' },
            { title: 'Innovation', desc: 'We push boundaries to deliver creative solutions.' },
            { title: 'Customer Focus', desc: 'Your success is our mission.' },
          ].map((value, idx) => (
            <div key={idx} data-aos="fade-up" data-aos-delay={idx * 100} className="p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-all">
              <h3 className="text-2xl font-semibold mb-2 text-blue-700">{value.title}</h3>
              <p className="text-gray-600">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Meet the Team */}
      <section className="relative py-28 px-6 md:px-20 bg-gradient-to-br from-gray-100 via-white to-blue-50 overflow-hidden">
  {/* Soft background glow */}
  <div className="absolute top-0 left-1/2 w-[60rem] h-[60rem] -translate-x-1/2 -translate-y-1/2 bg-blue-100 opacity-30 rounded-full blur-3xl"></div>

  <h2
    className="text-5xl font-extrabold text-center mb-20 text-blue-900 drop-shadow-lg tracking-wide"
    data-aos="fade-down"
  >
    Our Power Team
  </h2>

  <div className="grid md:grid-cols-3 gap-14 relative z-10">
    {[
      { img: `${asset.img1}`, name: 'Alex Johnson', role: 'Chief Executive Officer' },
      { img: `${asset.img2}`, name: 'Samantha Lee', role: 'Lead Software Engineer' },
      { img: `${asset.img3}`, name: 'Michael Smith', role: 'Project & Strategy Manager' },
    ].map((member, idx) => (
      <div
        key={idx}
        data-aos="zoom-in-up"
        data-aos-delay={idx * 200}
        className="bg-white/80 backdrop-blur-lg border border-blue-100 rounded-3xl shadow-2xl overflow-hidden transition transform hover:-translate-y-3 hover:shadow-blue-200 group"
      >
        <div className="relative w-full h-64 overflow-hidden">
          <img
            src={member.img}
            alt={member.name}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60 group-hover:opacity-70 transition"></div>
        </div>
        <div className="p-8 text-center">
          <h3 className="text-2xl font-bold text-blue-800 mb-2 group-hover:text-blue-900 transition">
            {member.name}
          </h3>
          <p className="text-gray-600 italic mb-6">{member.role}</p>
          <div className="flex justify-center gap-5 text-blue-700">
            <a
              href="#"
              className="hover:text-blue-900 transition transform hover:scale-125"
              title="LinkedIn"
            >
              <i className="fab fa-linkedin-in text-xl"></i>
            </a>
            <a
              href="#"
              className="hover:text-blue-900 transition transform hover:scale-125"
              title="Twitter"
            >
              <i className="fab fa-twitter text-xl"></i>
            </a>
            <a
              href="#"
              className="hover:text-blue-900 transition transform hover:scale-125"
              title="GitHub"
            >
              <i className="fab fa-github text-xl"></i>
            </a>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>



    </div>
  );
};

export default About;
