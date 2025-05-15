import React, { useState } from 'react';

const prizes = [
  { id: 1, label: '100T', color: '#FFD700' },
  { id: 2, label: '200B', color: '#00E6FF' },
  { id: 3, label: '400B', color: '#FF4B91' },
  { id: 4, label: '800B', color: '#00FF85' },
  { id: 5, label: '200T', color: '#FFB347' },
  { id: 6, label: '1000T', color: '#FF4B91' },
  { id: 7, label: '400T', color: '#00E6FF' },
  { id: 8, label: '800T', color: '#FFD700' },
];

export default function SpinToWin() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [angle, setAngle] = useState(0);

  const handleSpin = () => {
    setIsSpinning(true);
    setResult(null);
    const idx = Math.floor(Math.random() * prizes.length);
    const segmentAngle = 360 / prizes.length;
    const newAngle = 360 * 4 + (360 - ((idx + 1) * segmentAngle));
    setAngle((prev) => prev + newAngle);
    setTimeout(() => {
      setResult(prizes[idx]);
      setIsSpinning(false);
    }, 3200);
  };

  const center = 160;
  const radius = 140;
  const segmentAngle = 360 / prizes.length;

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0" style={{
        background: `
          radial-gradient(circle at 20% 20%, rgba(255, 215, 0, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(255, 75, 145, 0.12) 0%, transparent 50%),
          linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)
        `,
        backgroundBlendMode: 'screen'
      }} />

      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-yellow-400/30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 animate-gradient-x mb-4 tracking-wider">
            JACKPOT
          </h2>
          <p className="text-white/80 text-lg">
            Spin the wheel and win amazing prizes!
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative w-80 h-80 mb-8">
            {/* Outer Glow */}
            <div className="absolute inset-0 rounded-full animate-pulse" style={{
              boxShadow: '0 0 60px 20px rgba(255, 215, 0, 0.3)',
              background: 'radial-gradient(circle at center, rgba(255, 215, 0, 0.2) 0%, transparent 70%)'
            }} />

            {/* Gold coin border with enhanced glow */}
            <div 
              className="absolute inset-0 rounded-full border-8 border-yellow-400"
              style={{
                boxShadow: `
                  0 0 40px 10px rgba(255, 215, 0, 0.5),
                  0 0 80px 20px rgba(255, 215, 0, 0.3),
                  inset 0 0 20px rgba(255, 215, 0, 0.5)
                `
              }}
            />

          {/* Wheel SVG */}
            <svg
              width={center * 2}
              height={center * 2}
              viewBox={`0 0 ${center * 2} ${center * 2}`}
              className={`absolute inset-0 transition-transform duration-[3000ms] ease-out ${isSpinning ? 'animate-spin-bounce' : ''}`}
              style={{ transform: `rotate(${angle}deg)` }}
            >
              {prizes.map((prize, i) => {
                const startAngle = i * segmentAngle;
                const endAngle = (i + 1) * segmentAngle;
                const largeArc = segmentAngle > 180 ? 1 : 0;
                const x1 = center + radius * Math.cos((Math.PI * startAngle) / 180);
                const y1 = center + radius * Math.sin((Math.PI * startAngle) / 180);
                const x2 = center + radius * Math.cos((Math.PI * endAngle) / 180);
                const y2 = center + radius * Math.sin((Math.PI * endAngle) / 180);
                const d = `M${center},${center} L${x1},${y1} A${radius},${radius} 0 ${largeArc} 1 ${x2},${y2} Z`;
                return (
                  <path 
                    key={i}
                    d={d} 
                    fill={prize.color} 
                    stroke="#fff" 
                    strokeWidth="2"
                    style={{
                      filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))'
                    }}
                  />
                );
              })}
              {/* Prize labels with enhanced styling */}
              {prizes.map((prize, i) => {
                const theta = ((i + 0.5) * 2 * Math.PI) / prizes.length;
                const x = center + (radius - 40) * Math.cos(theta);
                const y = center + (radius - 40) * Math.sin(theta);
                return (
                  <text
                    key={i}
                    x={x}
                    y={y}
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    fontSize="28"
                    fontWeight="bold"
                    fill="#fff"
                    stroke="#000"
                    strokeWidth="2"
                    style={{
                      paintOrder: 'stroke fill',
                      filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5))',
                      textShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
                    }}
                  >
                    {prize.label}
                  </text>
                );
              })}
            </svg>

            {/* Center SPIN button with enhanced effects */}
            <button
              onClick={handleSpin}
              disabled={isSpinning}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-gradient-to-br from-red-600 to-yellow-400 border-4 border-white shadow-xl flex flex-col items-center justify-center text-white font-extrabold text-3xl tracking-wider hover:scale-105 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed z-10"
              style={{
                boxShadow: `
                  0 0 30px 10px rgba(255, 215, 0, 0.5),
                  0 0 60px 20px rgba(255, 215, 0, 0.3),
                  inset 0 0 20px rgba(255, 255, 255, 0.5)
                `
              }}
            >
              {isSpinning ? (
                <span className="text-xl animate-spin">⭮</span>
              ) : (
                'SPIN'
              )}
            </button>

            {/* Enhanced Pointer */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8">
              <svg width="32" height="32" viewBox="0 0 32 32">
                <polygon 
                  points="16,0 28,32 4,32" 
                  fill="#FFD700"
                  stroke="#fff"
                  strokeWidth="2"
                  style={{
                    filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.5))'
                  }}
                />
              </svg>
            </div>
          </div>

          {/* Result Display with enhanced styling */}
          {result && !isSpinning && (
            <div 
              className="mt-8 p-6 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 backdrop-blur-sm rounded-2xl text-center border border-white/10"
              style={{
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
              }}
            >
              <div className="text-3xl font-bold text-yellow-300 mb-3 drop-shadow-lg animate-bounce">
                Congratulations!
              </div>
              <div className="flex items-center justify-center gap-3 text-4xl text-yellow-200 font-extrabold drop-shadow-lg">
                You won
                <span className="text-white font-extrabold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  {result.label}
                </span>
        </div>
          </div>
        )}
        </div>
      </div>

      <style>{`
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% auto;
          animation: gradient-x 8s linear infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes spin-bounce {
          0% { transform: rotate(0deg); }
          90% { transform: rotate(var(--spin-angle)); }
          100% { transform: rotate(var(--spin-angle)); }
        }
        .animate-spin-bounce {
          animation: spin-bounce 3s cubic-bezier(.17,.67,.83,.67);
        }
      `}</style>
    </section>
  );
} 