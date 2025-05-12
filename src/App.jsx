import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PopularGames from './components/PopularGames';
import UpcomingTournaments from './components/UpcomingTournaments';
import Features from './components/Features';
import Wallet from './components/wallet'; // ✅ Make sure W is capital

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <HeroSection />
        <PopularGames />
        <UpcomingTournaments />
        <Features />
      </main>
    </div>
  );
}

export default function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/wallet" element={<Wallet />} />
      </Routes>
    </Router>
  );
}
