import React, { useState, useEffect } from 'react';
import { RefreshCw, Coins, Crown, Sparkles, Box } from 'lucide-react';

export default function MysteryBoxVsCPU() {
  const [playerBalance, setPlayerBalance] = useState(100);
  const [currentRound, setCurrentRound] = useState(1);
  const [betAmount, setBetAmount] = useState(10);
  const [gameComplete, setGameComplete] = useState(false);
  const [roundWinner, setRoundWinner] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const [gameTime, setGameTime] = useState(0);
  const [bestTime, setBestTime] = useState(Infinity);
  const [playerChoice, setPlayerChoice] = useState(null);
  const [prizeBox, setPrizeBox] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [canChangeChoice, setCanChangeChoice] = useState(true);

  useEffect(() => {
    let timer;
    if (!gameComplete) {
      timer = setInterval(() => {
        setGameTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameComplete]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleBet = (amount) => {
    if (amount > playerBalance) return;
    setBetAmount(amount);
  };

  const handleBoxChoice = (boxNumber) => {
    if (!canChangeChoice || isRevealing) return;
    setPlayerChoice(boxNumber);
    setCanChangeChoice(false);
  };

  const confirmChoice = () => {
    if (isRevealing) return;
    setIsRevealing(true);

    // Determine winner
    const playerCorrect = playerChoice === prizeBox;
    
    if (playerCorrect) {
      setRoundWinner('win');
      setPlayerBalance(prev => {
        const newBalance = prev + betAmount;
        if (newBalance >= 200) {
          setGameComplete(true);
          setShowConfetti(true);
          if (gameTime < bestTime) {
            setBestTime(gameTime);
          }
        }
        return newBalance;
      });
    } else {
      setRoundWinner('lose');
      setPlayerBalance(prev => prev - betAmount);
    }

    setShowResult(true);
  };

  const nextRound = () => {
    setCurrentRound(prev => prev + 1);
    setPlayerChoice(null);
    setPrizeBox(Math.floor(Math.random() * 3) + 1);
    setRoundWinner(null);
    setShowResult(false);
    setIsRevealing(false);
    setCanChangeChoice(true);
  };

  const resetGame = () => {
    setPlayerBalance(100);
    setCurrentRound(1);
    setBetAmount(10);
    setGameComplete(false);
    setRoundWinner(null);
    setShowConfetti(false);
    setGameTime(0);
    setPlayerChoice(null);
    setPrizeBox(Math.floor(Math.random() * 3) + 1);
    setShowResult(false);
    setIsRevealing(false);
    setCanChangeChoice(true);
  };

  // Initialize prize box on first render
  useEffect(() => {
    setPrizeBox(Math.floor(Math.random() * 3) + 1);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-pink-500/10 rounded-full blur-[150px] animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[150px] animate-float-slow-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-indigo-500/10 rounded-full blur-[180px] animate-float-slow" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Game Header */}
        <div className="flex flex-col items-center mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Box className="h-8 w-8 text-yellow-400 animate-pulse" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              Mystery Box
            </h1>
          </div>
          <div className="flex items-center gap-6 text-lg">
            <div className="flex items-center gap-2">
              <span className="text-white/60">Round:</span>
              <span className="font-bold">{currentRound}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white/60">Time:</span>
              <span className="font-bold">{formatTime(gameTime)}</span>
            </div>
          </div>
        </div>

        {/* Player Balance */}
        <div className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 backdrop-blur-md rounded-2xl p-6 mb-12 shadow-xl border border-white/10">
          <div className="text-2xl font-bold mb-2 text-center bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Your Balance
          </div>
          <div className="flex items-center justify-center gap-2 text-2xl">
            <Coins className="h-6 w-6 text-yellow-400" />
            <span>{playerBalance}</span>
          </div>
        </div>

        {/* Bet Input */}
        <div className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 backdrop-blur-md rounded-2xl p-6 mb-12 shadow-xl border border-white/10">
          <div className="text-xl mb-4 text-center font-medium">Place Your Bet</div>
          <div className="relative max-w-xs mx-auto">
            <input
              type="number"
              min="1"
              max={playerBalance}
              value={betAmount || ''}
              onChange={(e) => handleBet(parseInt(e.target.value) || 0)}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-center text-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
              placeholder="Enter bet amount"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-yellow-400">
              <Coins className="h-5 w-5" />
            </div>
          </div>
          <div className="text-sm text-white/60 mt-2 text-center">
            Maximum bet: {playerBalance}
          </div>
        </div>

        {/* Mystery Boxes */}
        <div className="grid grid-cols-3 gap-8 mb-12">
          {[1, 2, 3].map((boxNumber) => (
            <button
              key={boxNumber}
              onClick={() => handleBoxChoice(boxNumber)}
              disabled={!canChangeChoice || isRevealing}
              className={`group relative aspect-square bg-gradient-to-br from-pink-500/10 to-purple-500/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/10 transition-all duration-300 transform hover:scale-105 ${
                playerChoice === boxNumber
                  ? 'ring-4 ring-pink-500'
                  : isRevealing && boxNumber === prizeBox
                  ? 'ring-4 ring-green-500'
                  : ''
              }`}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              <div className="h-full flex items-center justify-center">
                <Box className="h-16 w-16 text-white/60 group-hover:text-white/80 transition-colors duration-300" />
              </div>
            </button>
          ))}
        </div>

        {/* Game Controls */}
        <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
          {!showResult ? (
            <button
              onClick={confirmChoice}
              disabled={!playerChoice || isRevealing}
              className={`group relative flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg ${
                (!playerChoice || isRevealing) ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
              }`}
            >
              <Box className="h-5 w-5 transform group-hover:rotate-180 transition-transform duration-500" />
              Confirm Choice
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300 -z-10" />
            </button>
          ) : (
            <button
              onClick={nextRound}
              className="group relative flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Next Round
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300 -z-10" />
            </button>
          )}
          <button
            onClick={resetGame}
            className="group relative flex items-center justify-center gap-2 bg-white/10 text-white font-bold py-4 px-8 rounded-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-lg border border-white/10"
          >
            <RefreshCw className="h-5 w-5 transform group-hover:rotate-180 transition-transform duration-500" />
            Reset Game
          </button>
        </div>

        {/* Round Result */}
        {showResult && (
          <div className="text-center">
            <div className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 backdrop-blur-md rounded-xl p-4 inline-block shadow-xl border border-white/10">
              <div className="flex items-center justify-center gap-2 text-2xl">
                {roundWinner === 'win' ? (
                  <>
                    <Crown className="h-8 w-8 text-green-400" />
                    <span className="text-green-400">You Won!</span>
                  </>
                ) : (
                  <>
                    <Box className="h-8 w-8 text-red-400" />
                    <span className="text-red-400">You Lost!</span>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Game Complete Modal */}
        {gameComplete && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 backdrop-blur-md rounded-2xl p-8 w-full max-w-md mx-4 transform transition-all duration-500 scale-100 animate-modal-in shadow-xl border border-white/10">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <Sparkles className="h-12 w-12 text-yellow-400 animate-pulse" />
                </div>
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
                  Game Complete!
                </h2>
                <div className="text-2xl mb-8">
                  <div className="flex items-center justify-center gap-2 text-green-400">
                    <Crown className="h-8 w-8" />
                    You Won!
                  </div>
                </div>
                <div className="text-lg mb-8 bg-white/5 rounded-xl p-6">
                  <div className="font-bold mb-4 text-xl">Game Statistics:</div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="text-sm text-white/60">Time</div>
                      <div className="font-bold text-lg">{formatTime(gameTime)}</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="text-sm text-white/60">Best Time</div>
                      <div className="font-bold text-lg">{bestTime === Infinity ? '-' : formatTime(bestTime)}</div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={resetGame}
                  className="group relative bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 px-8 rounded-xl hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg w-full md:w-auto"
                >
                  Play Again
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300 -z-10" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Confetti Effect */}
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-10%',
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              >
                {['🎉', '🎊', '✨', '🌟', '💫'][Math.floor(Math.random() * 5)]}
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-35px) scale(1.12); }
        }
        @keyframes float-slow-delayed {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-35px) scale(1.12); }
        }
        @keyframes modal-in {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes confetti {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .animate-float-slow {
          animation: float-slow 12s ease-in-out infinite;
        }
        .animate-float-slow-delayed {
          animation: float-slow-delayed 12s ease-in-out infinite 2s;
        }
        .animate-modal-in {
          animation: modal-in 0.5s ease-out forwards;
        }
        .animate-confetti {
          animation: confetti 5s linear forwards;
        }
      `}</style>
    </div>
  );
} 