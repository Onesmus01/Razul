import React from 'react';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer.jsx'
import ContactPage from './pages/ContactPage.jsx'
import VideoGallery from './components/VideoGallery.jsx'
import ExploreMore from './components/ExploreMore.jsx'

const App = () => {
  return (
    <div className="bg-gray-300 min-h-screen flex flex-col">
      {/* Navbar component stays on top */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/contact-us' element={<ContactPage />} />
          <Route path='video-gallery' element={<VideoGallery />} />
          <Route path='explore' element={<ExploreMore />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
