// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PopularGames from './components/PopularGames';
import UpcomingTournaments from './components/UpcomingTournaments';
import Features from './components/Features';
import BottomNav from './components/BottomNav';
// import { CarromHome } from './pages/carrom/CarromHome'; // ✅ imported correctly
import ChessDashboard from './components/ChessDashboard';
import CarromDashboard from './components/CarromDashboard';
import LudoDashboard from './components/LudoDashboard';

function HomePage() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 pb-16 md:pb-0">
        <HeroSection />
        <PopularGames />
        <UpcomingTournaments />
        <Features />
      </main>

      <footer className="hidden md:block bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* footer content */}
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} BoostNow Games. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <BottomNav />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        
        <Route path="/dashboard/chess" element={<ChessDashboard />} />
        <Route path="/dashboard/carrom" element={<CarromDashboard />} />
        <Route path="/dashboard/ludo" element={<LudoDashboard />} />
        {/* <Route path="/carrom" element={<CarromHome />} /> ✅ Carrom route */}
      </Routes>
    </Router>
  );
}
