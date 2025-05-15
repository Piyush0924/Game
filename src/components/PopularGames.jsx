import React, { useState, useEffect, useRef } from 'react';
import { Gamepad2, Users, Clock, Coins, IndianRupee, Trophy, Zap, Star, Crown, Target, ArrowRight, Flame, Sparkles } from 'lucide-react';

const games = [
  {
    id: 1,
    name: 'Chess',
    description: 'Challenge players worldwide in the ultimate game of strategy and skill. Win up to 5x your entry fee!',
    image: '/images/chess.jpg',
    players: '2',
    time: '10-30 min',
    color: 'from-blue-500 via-indigo-500 to-purple-600',
    entryFee: { real: 50, practice: 100 },
    winnings: { real: 250, practice: 0 },
    features: ['5x Winnings', '24/7 Tournaments', 'Ranked Matches'],
    popularity: 98,
    activePlayers: 245,
    ongoingMatches: 18,
    topPrize: '₹5,000',
    icon: '♞',
  },
  {
    id: 2,
    name: 'Ludo',
    description: 'Roll the dice and race your tokens to victory in this classic board game. Perfect for family fun!',
    image: '/images/ludo.jpg',
    players: '2-4',
    time: '15-45 min',
    color: 'from-purple-500 via-pink-500 to-red-500',
    entryFee: { real: 30, practice: 50 },
    winnings: { real: 150, practice: 0 },
    features: ['4x Winnings', 'Team Play', 'Daily Rewards'],
    popularity: 95,
    activePlayers: 189,
    ongoingMatches: 25,
    topPrize: '₹3,000',
    icon: '🎲',
  },
  {
    id: 3,
    name: 'Carrom',
    description: 'Test your precision and control in this popular tabletop game. Master the art of striking!',
    image: '/images/carrom.jpg',
    players: '2-4',
    time: '20-40 min',
    color: 'from-green-500 via-emerald-500 to-teal-500',
    entryFee: { real: 40, practice: 75 },
    winnings: { real: 200, practice: 0 },
    features: ['5x Winnings', 'Tournaments', 'Practice Mode'],
    popularity: 92,
    activePlayers: 156,
    ongoingMatches: 12,
    topPrize: '₹4,000',
    icon: '🎯',
  },
  {
    id: 4,
    name: 'PUBG',
    description: 'Battle Royale action with intense combat and strategic gameplay. Squad up and dominate!',
    image: '/images/pubg.jpg',
    players: '1-4',
    time: '20-30 min',
    color: 'from-orange-500 via-red-500 to-pink-500',
    entryFee: { real: 100, practice: 200 },
    winnings: { real: 1000, practice: 0 },
    features: ['10x Winnings', 'Squad Matches', 'Daily Tournaments'],
    popularity: 99,
    activePlayers: 432,
    ongoingMatches: 35,
    topPrize: '₹15,000',
    icon: '🎮',
  },
  {
    id: 5,
    name: 'Free Fire',
    description: 'Fast-paced battle royale with unique characters and abilities. Show your skills!',
    image: '/images/freefire.jpg',
    players: '1-4',
    time: '15-25 min',
    color: 'from-yellow-500 via-orange-500 to-red-500',
    entryFee: { real: 80, practice: 150 },
    winnings: { real: 800, practice: 0 },
    features: ['10x Winnings', 'Squad Play', 'Weekly Events'],
    popularity: 97,
    activePlayers: 389,
    ongoingMatches: 28,
    topPrize: '₹10,000',
    icon: '🎯',
  },

];

export default function PopularGames() {
  const [activeTab, setActiveTab] = useState('real');
  const [hoveredGame, setHoveredGame] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.color = `hsl(${Math.random() * 60 + 200}, 70%, 50%)`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        if (this.opacity > 0.1) this.opacity -= 0.001;
        else this.reset();
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = Array.from({ length: 50 }, () => new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle, i) => {
        particle.update();
        particle.draw();
        particles.slice(i + 1).forEach(p2 => {
          const dx = particle.x - p2.x;
          const dy = particle.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(162, 89, 255, ${0.1 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initParticles();
    animate();

    window.addEventListener('resize', resizeCanvas);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Interactive Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.25 }}
      />
      
      {/* Rich Multi-Color Gradient Overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 0% 0%, rgba(236, 72, 153, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 100% 0%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 100% 100%, rgba(245, 158, 11, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 0% 100%, rgba(139, 92, 246, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.15) 0%, transparent 60%),
            linear-gradient(135deg, 
              rgba(17, 24, 39, 0.95) 0%, 
              rgba(88, 28, 135, 0.95) 20%, 
              rgba(124, 58, 237, 0.95) 40%,
              rgba(59, 130, 246, 0.95) 60%,
              rgba(16, 185, 129, 0.95) 80%,
              rgba(17, 24, 39, 0.95) 100%
            )
          `,
          backgroundBlendMode: 'screen',
          animation: 'gradientShift 20s ease infinite'
        }}
      />

      {/* Dynamic Color Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-pink-500/15 rounded-full blur-[150px] animate-float-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-[800px] h-[800px] bg-blue-500/15 rounded-full blur-[150px] animate-float-slow-delayed" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-purple-500/15 rounded-full blur-[180px] animate-float-slow" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/15 rounded-full blur-[120px] animate-float-slow-delayed" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-500/15 rounded-full blur-[100px] animate-float-slow" />

      {/* Enhanced Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Dynamic Shine Effect */}
      <div 
        className="absolute inset-0 opacity-25"
        style={{
          background: 'linear-gradient(45deg, transparent 0%, rgba(255, 255, 255, 0.08) 50%, transparent 100%)',
          animation: 'shine 10s linear infinite'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold mb-3 tracking-tight">
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-emerald-500 bg-clip-text text-transparent animate-gradient-x">
            Popular Games
            </span>
          </h2>
          <p className="text-lg text-white/90 max-w-xl mx-auto">
            Choose from our selection of exciting multiplayer games and win real cash prizes
          </p>
        </div>

        {/* Game Type Tabs */}
        <div className="flex justify-center space-x-4 mb-12">
          {[
            { id: 'real', label: 'Real Money Games', icon: Crown },
            { id: 'practice', label: 'Practice Games', icon: Target }
          ].map((tab) => (
          <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-emerald-500 text-white shadow-lg shadow-purple-500/40'
                  : 'bg-white/10 text-white/80 hover:bg-white/20 backdrop-blur-md'
            }`}
          >
              <div className="flex items-center gap-2">
                <tab.icon className="h-5 w-5" />
                {tab.label}
              </div>
          </button>
          ))}
        </div>

        {/* Games Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((game) => (
            <div
              key={game.id}
              className="group relative rounded-3xl overflow-hidden transform transition-all duration-500"
              onMouseEnter={() => setHoveredGame(game.id)}
              onMouseLeave={() => setHoveredGame(null)}
              style={{
                transform: hoveredGame === game.id ? 'scale(1.02)' : 'scale(1)',
                boxShadow: hoveredGame === game.id 
                  ? '0 0 40px rgba(162, 89, 255, 0.3), 0 0 80px rgba(58, 242, 255, 0.2)'
                  : '0 0 20px rgba(162, 89, 255, 0.1), 0 0 40px rgba(58, 242, 255, 0.1)'
              }}
            >
              {/* Game Background */}
              <div className="absolute inset-0">
                <img 
                  src={game.image} 
                  alt={game.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
                  style={{
                    transform: hoveredGame === game.id ? 'scale(1.1)' : 'scale(1)',
                    filter: 'brightness(0.3)'
                  }}
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-70 mix-blend-overlay transition-opacity duration-500`}
                  style={{ opacity: hoveredGame === game.id ? 0.8 : 0.6 }}
                />
              </div>

              {/* Game Content */}
              <div className="relative p-8">
                {/* Game Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-lg flex items-center justify-center shadow-xl border border-white/20 transition-transform duration-500"
                      style={{ transform: hoveredGame === game.id ? 'scale(1.1) rotate(5deg)' : 'scale(1)' }}
                    >
                      <span className="text-3xl">{game.icon}</span>
                      </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-1">{game.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-white/80">{game.players} Players</span>
                        <span className="text-white/40">•</span>
                        <span className="text-white/80">{game.time}</span>
                      </div>
                    </div>
                  </div>
                  {/* Popularity Badge */}
                  <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-white text-sm font-bold">{game.popularity}%</span>
                  </div>
                </div>

                {/* Game Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { label: 'Active Players', value: game.activePlayers, icon: Users, color: 'from-blue-500 to-cyan-400' },
                    { label: 'Ongoing Matches', value: game.ongoingMatches, icon: Gamepad2, color: 'from-purple-500 to-pink-400' },
                    { label: 'Top Prize', value: game.topPrize, icon: Trophy, color: 'from-amber-500 to-yellow-400' }
                  ].map((stat, index) => (
                    <div 
                      key={index} 
                      className="group relative bg-white/5 backdrop-blur-md rounded-xl p-4 text-center transform transition-all duration-300 hover:scale-105 hover:bg-white/10"
                      style={{
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                      }}
                    >
                      {/* Gradient Border Effect */}
                      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background: `linear-gradient(45deg, ${stat.color.split(' ')[1]}, ${stat.color.split(' ')[3]})`,
                          filter: 'blur(8px)',
                          zIndex: -1
                        }}
                      />
                      
                      {/* Icon Container */}
                      <div className={`relative mb-3 inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${stat.color} transform group-hover:scale-110 transition-transform duration-300`}>
                        <stat.icon className="h-6 w-6 text-white" />
                        {/* Glow Effect */}
                        <div className="absolute inset-0 rounded-full bg-white/20 blur-md transform scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      {/* Value */}
                      <div className="relative">
                        <div className="text-2xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent mb-1">
                          {stat.value}
                        </div>
                        <div className="text-sm text-white/70 font-medium">
                          {stat.label}
                        </div>
                      </div>

                      {/* Hover Effect Line */}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:w-1/2 transition-all duration-300" />
                    </div>
                  ))}
              </div>
              
                {/* Game Description */}
                <p className="text-white/80 mb-6">{game.description}</p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {game.features.map((feature, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/10 backdrop-blur-sm text-white"
                    >
                      <Zap className="h-3 w-3 mr-1 text-yellow-400" />
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Entry Fee & Winnings */}
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl">
                    {activeTab === 'real' ? (
                      <>
                        <IndianRupee className="h-5 w-5 text-yellow-400 mr-1" />
                        <span className="text-white font-bold">Entry: {game.entryFee.real}</span>
                      </>
                    ) : (
                      <>
                        <Coins className="h-5 w-5 text-yellow-400 mr-1" />
                        <span className="text-white font-bold">Entry: {game.entryFee.practice}</span>
                      </>
                    )}
                  </div>
                  {activeTab === 'real' && (
                    <div className="flex items-center bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                      <Trophy className="h-5 w-5 text-yellow-400 mr-1" />
                      <span className="text-white font-bold">Win up to: {game.winnings.real}</span>
                    </div>
                  )}
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <button 
                    className="group relative w-full sm:w-auto flex-1 bg-gradient-to-r from-pink-500 via-purple-500 to-emerald-500 text-white font-bold py-3.5 px-6 rounded-xl transform hover:scale-[1.02] transition-all duration-300 shadow-lg overflow-hidden min-w-[140px]"
                    style={{
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
                    }}
                  >
                    {/* Gradient Border */}
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
                    
                    {/* Button Content */}
                    <div className="relative flex items-center justify-center gap-2">
                      <span className="text-base sm:text-lg whitespace-nowrap">
                    {activeTab === 'real' ? 'Play Now' : 'Practice'}
                      </span>
                      <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>

                    {/* Shine Effect */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: 'linear-gradient(45deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)',
                        animation: 'shine 1.5s linear infinite'
                      }}
                    />
                  </button>

                  <button 
                    className="group relative w-full sm:w-auto flex-1 bg-white/10 backdrop-blur-md text-white font-bold py-3.5 px-6 rounded-xl transform hover:scale-[1.02] transition-all duration-300 border border-white/10 hover:bg-white/20 min-w-[140px]"
                  >
                    <div className="relative flex items-center justify-center gap-2">
                      <span className="text-base sm:text-lg whitespace-nowrap">Rules</span>
                      <div className="w-5 h-5 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/80 group-hover:bg-white transition-colors duration-300" />
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Hot Badge */}
              {game.popularity >= 95 && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-yellow-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center">
                  <Flame className="h-3 w-3 mr-1" />
                  HOT
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-35px) scale(1.12); }
        }

        @keyframes float-slow-delayed {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-35px) scale(1.12); }
        }

        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes shine {
          0% { transform: translateX(-100%) rotate(45deg); }
          100% { transform: translateX(100%) rotate(45deg); }
        }

        .animate-gradient-x {
          background-size: 200% auto;
          animation: gradient-x 8s linear infinite;
        }

        .animate-float-slow {
          animation: float-slow 12s ease-in-out infinite;
        }

        .animate-float-slow-delayed {
          animation: float-slow-delayed 12s ease-in-out infinite 2s;
        }

        @media (max-width: 640px) {
          .flex-col {
            gap: 0.75rem;
          }
        }
      `}</style>
    </section>
  );
} 