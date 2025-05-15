import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PopularGames from './components/PopularGames';
import FeaturedTournaments from './components/FeaturedTournaments';
import GameStats from './components/GameStats';
import SpinToWin from './components/SpinToWin';
import BottomNav from './components/BottomNav';
import Wallet from './components/Wallet';
import CommunityPage from './components/Vinit/Community';
import SPS from './components/SPS';
import MemoryMatchGame from './components/MemoryMatchGame';
import DiceDuel from './components/DiceDuel';
import CoinFlipBet from './components/CoinFlipBet';
import MysteryBoxVsCPU from './components/MysteryBoxVsCPU';

function HomePage() {
  const [showSplash, setShowSplash] = useState(true);
  const canvasRef = useRef(null);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => {
      document.documentElement.style.scrollBehavior = '';
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    // Particle system setup
    const canvas = canvasRef.current;
    if (!canvas) return; // Guard against null canvas

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

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
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.color = `hsl(${Math.random() * 60 + 200}, 70%, 50%)`;
        this.originalSize = this.size;
      }

      update() {
        // Mouse interaction
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          const angle = Math.atan2(dy, dx);
          const force = (150 - distance) / 150;
          this.speedX -= Math.cos(angle) * force * 0.2;
          this.speedY -= Math.sin(angle) * force * 0.2;
          this.size = this.originalSize * (1 + force);
        }

        // Normal movement
        this.x += this.speedX;
        this.y += this.speedY;

        // Boundary check with bounce
        if (this.x < 0 || this.x > canvas.width) {
          this.speedX *= -0.8;
          this.x = Math.max(0, Math.min(this.x, canvas.width));
        }
        if (this.y < 0 || this.y > canvas.height) {
          this.speedY *= -0.8;
          this.y = Math.max(0, Math.min(this.y, canvas.height));
        }

        // Friction
        this.speedX *= 0.99;
        this.speedY *= 0.99;

        // Opacity fade
        if (this.opacity > 0.1) this.opacity -= 0.001;
        else this.reset();
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();

        // Glow effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const initParticles = () => {
      particles = Array.from({ length: 150 }, () => new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particles and connections
      particles.forEach((particle, i) => {
        particle.update();
        particle.draw();

        // Connect nearby particles
        particles.slice(i + 1).forEach(p2 => {
          const dx = particle.x - p2.x;
          const dy = particle.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            const opacity = 0.2 * (1 - dist / 100);
            ctx.strokeStyle = `rgba(162, 89, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Initialize and start animation
    resizeCanvas();
    initParticles();
    animate();

    // Event listeners
    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* Interactive Background Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full z-0"
        style={{ opacity: 0.7 }}
      />

      {/* Dynamic Gradient Overlay */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background: `
            radial-gradient(circle at 20% 20%, rgba(162, 89, 255, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(58, 242, 255, 0.12) 0%, transparent 50%),
            linear-gradient(135deg, rgba(26, 26, 46, 0.95) 0%, rgba(22, 33, 62, 0.95) 50%, rgba(15, 52, 96, 0.95) 100%)
          `,
          backgroundBlendMode: 'screen',
          animation: 'gradientShift 15s ease infinite'
        }}
      />

      {/* Content Container */}
      <div className="relative z-10">
        {/* Splash Screen */}
        {showSplash && (
          <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
            <div className="relative z-10 flex flex-col items-center justify-center">
              <img
                src="/images/logo.png"
                alt="BoostNow Games Logo"
                className="h-24 w-24 mb-6 rounded-2xl shadow-2xl animate-float"
              />
              <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg tracking-wide animate-pulse-glow">
                BoostNow Games
              </h1>
            </div>
          </div>
        )}

        {!showSplash && (
          <>
            <Navbar />
            <main className="flex-1 pb-16 md:pb-0">
              <HeroSection />
              <PopularGames />
              <FeaturedTournaments />
              <GameStats />
              <SpinToWin />
            </main>
            <BottomNav />
          </>
        )}
      </div>

      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }

        @keyframes pulse-glow {
          0%, 100% { text-shadow: 0 0 20px rgba(162, 89, 255, 0.5); }
          50% { text-shadow: 0 0 30px rgba(162, 89, 255, 0.8); }
        }

        .animate-float {
          animation: float-slow 3s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/games/sps" element={<SPS />} />
        <Route path="/games/memory" element={<MemoryMatchGame />} />
        <Route path="/games/dice" element={<DiceDuel />} />
        <Route path="/games/coinflip" element={<CoinFlipBet />} />
        <Route path="/games/mysterybox" element={<MysteryBoxVsCPU />} />
      </Routes>
    </Router>
  );
}

export default App;
