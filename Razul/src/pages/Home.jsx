import React from 'react';
import Hero from '../components/Hero.jsx';
import Features from '../components/Features.jsx';
import Categories from '../components/Categories.jsx'
import CallToAction from '../components/CallToAction.jsx'
import VideoShowCasePage from '../components/VideoUploadPage.jsx'
import FeaturedItems from '../components/FeaturedItems.jsx'
import FeaturedProducts from '../components/FeaturedProducts.jsx'

import OurProcess from '../components/OurProcess.jsx'
import About from '../pages/About.jsx'
import Services from '../components/Services.jsx'
import VideoGallery from '../components/VideoGallery.jsx'
import Testimonials from '../components/Testimonials.jsx'
import ThreeVideos from '../components/ThreeVideos.jsx'

const Home = () => {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - Full width, no padding */}
      <Hero />
      
      {/* Content sections with consistent spacing */}
      <div className="space-y-0">
        <FeaturedItems />
        <ThreeVideos />
        <OurProcess />
        <Services />
        <About />
        <Testimonials />
        <CallToAction />
      </div>
    </main>
  );
};

export default Home;