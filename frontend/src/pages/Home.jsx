import React from 'react';
import Hero from '../components/Hero.jsx';
import Features from '../components/Features.jsx';
import homeImage from '../assets/homeImage.jpg'; // 🔥 Import your image here
import Categories from '../components/Categories.jsx'
import CallToAction from '../components/CallToAction.jsx'
import VideoShowCasePage from '../components/VideoUploadPage.jsx'
import FeaturedItems from '../components/FeaturedItems.jsx'
import OurProcess from '../components/OurProcess.jsx'
import About from '../pages/About.jsx'
import Services from '../components/Services.jsx'
import VideoGallery from '../components/VideoGallery.jsx'
const Home = () => {
  return (
    <div
      className="min-h-screen bg-gray-300 bg-center bg-no-repeat text-white"
      
    >
      {/* Optional semi-transparent overlay */}
      <div className=" min-h-screen px-4">
        {/* Space before Hero */}
        <div className="my-4">
          <hr className="border-t-2 border-gray-300 w-1/4 mx-auto" />
        </div>

        <Hero />
        <FeaturedItems />
        <OurProcess />
        <Services />
        {/* <VideoGallery /> */}
        <About />

        {/* Space between Hero and Features */}



        <div className="my-4">
          <hr className="border-t-2 border-gray-300 w-1/4 mx-auto" />
        </div>

        <CallToAction />

        <div className="my-4">
          <hr className="border-t-2 border-gray-300 w-1/4 mx-auto" />
        </div>

        
        <div className="my-4">
          <hr className="border-t-2 border-gray-300 w-1/4 mx-auto" />
        </div>

      </div>
    </div>
  );
};

export default Home;
