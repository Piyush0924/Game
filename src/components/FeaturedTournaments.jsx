import React, { useState, useEffect } from 'react';
import { Calendar, Users, IndianRupee, Clock, Trophy, Flame, ArrowRight, Star, Target, Crown } from 'lucide-react';

const tournaments = [
  {
    id: 1,
    name: 'PUBG Mobile Championship',
    game: 'PUBG Mobile',
    prize: '₹1,00,000',
    date: '2024-04-15T10:00:00',
    participants: 256,
    entryFee: '₹500',
    color: 'from-orange-500 to-red-700',
  },
  {
    id: 2,
    name: 'Free Fire Masters',
    game: 'Free Fire',
    prize: '₹75,000',
    date: '2024-04-20T15:00:00',
    participants: 128,
    entryFee: '₹300',
    color: 'from-yellow-500 to-orange-700',
  },
  {
    id: 3,
    name: 'Chess Grandmaster Cup',
    game: 'Chess',
    prize: '₹50,000',
    date: '2024-04-25T12:00:00',
    participants: 64,
    entryFee: '₹200',
    color: 'from-blue-500 to-blue-700',
  },
];

function CountdownTimer({ date }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = new Date(date) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [date]);

  return (
    <div className="flex space-x-2">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div 
          key={unit} 
          className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 min-w-[60px] text-center"
          style={{
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <span className="text-white text-lg font-bold block">{value}</span>
          <span className="text-white/60 text-xs uppercase tracking-wider">{unit}</span>
        </div>
      ))}
    </div>
  );
}

export default function FeaturedTournaments() {
  return (
    <section className="relative py-16 overflow-hidden bg-[#0a0a1a]">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0" style={{
        background: `
          radial-gradient(circle at 20% 20%, rgba(162, 89, 255, 0.25) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(58, 242, 255, 0.2) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(255, 75, 145, 0.15) 0%, transparent 70%),
          linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)
        `,
        backgroundBlendMode: 'screen'
      }} />

      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full animate-float"
            style={{
              background: `radial-gradient(circle at center, ${
                i % 3 === 0 ? 'rgba(162, 89, 255, 0.6)' : 
                i % 3 === 1 ? 'rgba(58, 242, 255, 0.6)' : 
                'rgba(255, 75, 145, 0.6)'
              } 0%, transparent 70%)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
              boxShadow: `0 0 ${Math.random() * 20 + 10}px ${
                i % 3 === 0 ? 'rgba(162, 89, 255, 0.3)' : 
                i % 3 === 1 ? 'rgba(58, 242, 255, 0.3)' : 
                'rgba(255, 75, 145, 0.3)'
              }`
            }}
          />
        ))}
      </div>

      {/* Glowing Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse-slow"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              background: `radial-gradient(circle at center, ${
                i === 0 ? 'rgba(162, 89, 255, 0.1)' : 
                i === 1 ? 'rgba(58, 242, 255, 0.1)' : 
                'rgba(255, 75, 145, 0.1)'
              } 0%, transparent 70%)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(40px)',
              animationDelay: `${i * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with enhanced styling */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold mb-3 tracking-tight">
            <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent animate-gradient-x relative">
              Featured Tournaments
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/20 via-pink-500/20 to-purple-600/20 blur-xl -z-10" />
            </span>
          </h2>
          <p className="text-lg text-white/90 max-w-xl mx-auto">
            Join our biggest tournaments and win massive prizes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tournaments.map((tournament) => (
            <div
              key={tournament.id}
              className="group relative rounded-3xl overflow-hidden transform hover:scale-105 transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(255, 255, 255, 0.18)'
              }}
            >
              {/* Tournament Header */}
              <div className={`h-2 bg-gradient-to-r ${tournament.color}`} />
              
              <div className="p-6">
                {/* Game & Featured Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Target className="h-4 w-4 mr-1 text-purple-400" />
                    <span className="text-white/80 text-sm font-medium">{tournament.game}</span>
                  </div>
                  <div className="flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 px-3 py-1 rounded-full">
                    <Crown className="h-4 w-4 mr-1 text-white" />
                    <span className="text-white text-sm font-bold">Featured</span>
                  </div>
                </div>

                {/* Tournament Name */}
                <h3 className="text-2xl font-bold text-white mb-4">{tournament.name}</h3>
                
                {/* Date & Countdown */}
                <div className="mb-6">
                  <div className="flex items-center text-white/60 text-sm mb-3">
                    <Calendar className="h-4 w-4 mr-2 text-purple-400" />
                    <span>{new Date(tournament.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  </div>
                  <div className="mb-2 text-white/80 text-sm font-medium">Tournament starts in:</div>
                  <CountdownTimer date={tournament.date} />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                    <div className="flex items-center text-white/60 text-sm mb-1">
                      <Users className="h-4 w-4 mr-1 text-purple-400" />
                      <span>Players</span>
                    </div>
                    <div className="text-white text-lg font-bold">{tournament.participants}</div>
                  </div>
                  <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-xl p-3">
                    <div className="flex items-center text-white/60 text-sm mb-1">
                      <Trophy className="h-4 w-4 mr-1 text-yellow-400" />
                      <span>Prize Pool</span>
                    </div>
                    <div className="text-white text-lg font-bold">{tournament.prize}</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 px-4 rounded-xl hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center gap-2 group">
                    Register Now
                    <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="flex-1 bg-white/10 backdrop-blur-sm text-white font-bold py-3 px-4 rounded-xl hover:bg-white/20 transform hover:scale-105 transition-all duration-200">
                    Details
                  </button>
                </div>
              </div>

              {/* Hot Badge for High Prize Tournaments */}
              {parseInt(tournament.prize.replace(/[^0-9]/g, '')) >= 50000 && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-yellow-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse flex items-center">
                  <Flame className="h-3 w-3 mr-1" />
                  MEGA PRIZE
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        .animate-gradient-x {
          background-size: 200% auto;
          animation: gradient-x 8s linear infinite;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
} 