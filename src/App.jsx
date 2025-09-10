import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import ContactPage from './pages/ContactPage.jsx';
import VideoGallery from './components/VideoGallery.jsx';
import ExploreMore from './components/ExploreMore.jsx';
import AuthPage from './pages/Login.jsx';
import AboutUs from './pages/AboutUs.jsx';
import Footer from './components/Footer.jsx';

const App = () => {
  return (
    <div className="bg-gray-100 flex flex-col min-h-screen text-[10px] md:text-[12px]">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow px-1 md:px-2 py-1 md:py-2">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact-us" element={<ContactPage />} />
          <Route path="/video-gallery" element={<VideoGallery />} />
          <Route path="/explore" element={<ExploreMore />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer className="py-1 md:py-2 text-[10px] md:text-[12px]" />
    </div>
  );
};

export default App;
