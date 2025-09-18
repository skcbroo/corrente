import React from 'react';
import HeroSection from './components/HeroSection';
import DonorsTable from './components/DonorsTable';
import PhotoGallery from './components/PhotoGallery';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <DonorsTable />
      <PhotoGallery />
      <Footer />
    </div>
  );
}

export default App;