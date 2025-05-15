// src/App.jsx

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home';
import Navbar  from './components/Navbar';
import Wallet from './components/wallet';
import ProfilePage  from './components/ProfilePage';
import Rewards from './components/rewards';
import History from './components/History';

import TournamentsPage from './components/UpcomingTournaments';
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
        <Route path="/navbar" element={<Navbar/>} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/profile" element={<ProfilePage />} /> 

        <Route path="/history" element={<History />} /> 
        <Route path="/rewards" element={<Rewards />} />
  <Route path="/tournaments" element={<TournamentsPage />} />
  
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}
