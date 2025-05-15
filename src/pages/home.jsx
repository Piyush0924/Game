// src/components/HomePage.jsx

import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import PopularGames from '../components/PopularGames';
import UpcomingTournaments from '../components/UpcomingTournaments';
import Features from '../components/Features';
import BottomNav from '../components/BottomNav';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 pb-16 md:pb-0">
        <HeroSection />
        <PopularGames />
        <UpcomingTournaments />
        <Features />
      </main>

      {/* Desktop Footer */}
      <footer className="hidden md:block bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Footer sections (same as before) */}
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} BoostNow Games. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Nav */}
      <BottomNav />
    </div>
  );
}
