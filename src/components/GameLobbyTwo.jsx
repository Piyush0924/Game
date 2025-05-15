import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GameLobby = () => {
  const [status, setStatus] = useState('waiting'); // waiting, matching, matched, results
  const [timeLeft, setTimeLeft] = useState(3);
  const [gameBg, setGameBg] = useState('/images/ludo.jpg');
  const [playersInQueue, setPlayersInQueue] = useState(1243);
  const [score, setScore] = useState({ player: 54, opponent: 39 });
  const [opponent, setOpponent] = useState(null);

  // Start matchmaking
  const findMatch = () => {
    setStatus('matching');
    setTimeLeft(3);
    setPlayersInQueue(Math.floor(Math.random() * 500) + 500);
  };

  // Countdown timer and match simulation
  useEffect(() => {
    let timer;
    let queueTimer;

    if (status === 'matching') {
      // Update queue count periodically
      queueTimer = setInterval(() => {
        setPlayersInQueue(prev => Math.max(1000, prev + Math.floor(Math.random() * 20 - 10)))
      }, 1500);

      // Countdown timer
      timer = setTimeout(() => {
        if (timeLeft > 0) {
          setTimeLeft(timeLeft - 1);
        } else {
          // Match found - simulate opponent
          setOpponent({
            name: `Player_${Math.floor(Math.random() * 10000)}`,
            skill: ['Novice', 'Intermediate', 'Expert'][Math.floor(Math.random() * 3)]
          });
          setStatus('matched');
          
          // Simulate game duration (1.5s)
          setTimeout(() => {
            // Generate random scores
            setScore({
              player: Math.floor(Math.random() * 100),
              opponent: Math.floor(Math.random() * 100)
            });
            setStatus('results');
          }, 1500);
        }
      }, 1000);

      return () => {
        clearTimeout(timer);
        clearInterval(queueTimer);
      };
    }
  }, [status, timeLeft]);

  const handleExit = () => {
    setStatus('waiting');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      {/* Dynamic Game Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={gameBg} 
          alt="Game Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md p-6">
        {/* Waiting to Start */}
        {status === 'waiting' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <h1 className="text-3xl font-light text-white mb-2">Ludo Championship</h1>
            <p className="text-white/80 mb-8">Roll the dice and win big</p>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={findMatch}
              className="px-12 py-4 bg-white/0 border border-white/30 text-white rounded-lg hover:bg-white/10 transition"
            >
              Find Match
            </motion.button>
          </motion.div>
        )}

        {/* Matching in Progress */}
        {status === 'matching' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <div className="flex justify-center space-x-12 mb-10">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-2">
                  <span className="text-white">You</span>
                </div>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-2">
                  <span className="text-white/50">?</span>
                </div>
              </div>
            </div>

            <div className="text-4xl font-light text-white mb-6">{timeLeft}</div>
            
            <div className="h-px bg-white/20 mb-6">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 3 }}
                className="h-full bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-white/80 text-sm">Search Time</p>
                <p className="text-white font-medium">00:{timeLeft.toString().padStart(2, '0')}</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-white/80 text-sm">In Queue</p>
                <p className="text-white font-medium">{playersInQueue.toLocaleString()}</p>
              </div>
            </div>

            <p className="text-white/60 mb-2">Finding opponent...</p>
            <p className="text-white/40 text-sm">Matching with similar skill players</p>

            <button
              onClick={handleExit}
              className="mt-6 w-full py-3 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition"
            >
              Cancel Search
            </button>
          </motion.div>
        )}

        {/* Match Found */}
        {status === 'matched' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-5xl mb-8"
            >
              🎮
            </motion.div>
            <h2 className="text-2xl font-light text-white mb-2">Match Found!</h2>
            <p className="text-white/70">Playing against {opponent?.name}</p>
          </motion.div>
        )}

        {/* Results Screen */}
        {status === 'results' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10"
          >
            <h2 className="text-2xl font-light text-white mb-8 text-center">
              {score.player > score.opponent ? (
                <span className="text-green-400">Victory!</span>
              ) : score.player < score.opponent ? (
                <span className="text-red-400">Defeat</span>
              ) : (
                <span className="text-yellow-400">Draw!</span>
              )}
            </h2>
            
            <div className="flex justify-between items-center mb-10">
              <div className="text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${
                  score.player > score.opponent ? 'bg-green-500/30 border border-green-500/50' : 
                  'bg-blue-500/30 border border-blue-500/50'
                }`}>
                  <span className="text-white">You</span>
                </div>
                <div className={`text-3xl font-medium ${
                  score.player > score.opponent ? 'text-green-400' : 'text-blue-400'
                }`}>
                  {score.player}
                </div>
                {score.player > score.opponent && (
                  <div className="text-xs text-green-400 mt-1">WINNER</div>
                )}
              </div>
              
              <div className="text-xl text-white/50">vs</div>
              
              <div className="text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${
                  score.opponent > score.player ? 'bg-green-500/30 border border-green-500/50' : 
                  'bg-red-500/30 border border-red-500/50'
                }`}>
                  <span className="text-white">Opp</span>
                </div>
                <div className={`text-3xl font-medium ${
                  score.opponent > score.player ? 'text-green-400' : 'text-red-400'
                }`}>
                  {score.opponent}
                </div>
                {score.opponent > score.player && (
                  <div className="text-xs text-green-400 mt-1">WINNER</div>
                )}
              </div>
            </div>

            <div className="bg-white/10 rounded-lg p-4 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-white/70">Prize Won:</span>
                <span className="text-yellow-400 font-medium">
                  ${score.player > score.opponent ? 50 : score.player === score.opponent ? 25 : 10}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={findMatch}
                className="py-3 bg-white/0 border border-white/30 text-white rounded-lg hover:bg-white/10 transition"
              >
                Play Again
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleExit}
                className="py-3 bg-white text-black rounded-lg hover:bg-gray-100 transition"
              >
                Main Menu
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GameLobby;