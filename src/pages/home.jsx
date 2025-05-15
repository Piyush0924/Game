import React from 'react';
import HeroSection from "../components/HeroSection";
import PopularGames from "../components/PopularGames";
// import UpcomingTournaments from "../components/UpcomingTournaments";
// import Features from "../components/Features";
import BottomNav from "../components/BottomNav";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <main className="flex-1 pb-16 md:pb-0">
        <HeroSection />
        <PopularGames />
        {/* <UpcomingTournaments /> */}
        {/* <Features /> */}
      </main>
      <BottomNav />
    </div>
  );
} 