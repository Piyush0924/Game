import React, { useState, useEffect } from 'react';

/**
 * StoneGameLogic - Handles the game logic for Stone Paper Scissors
 * This component manages the selection, round tracking, and winner determination
 */
const StoneGameLogic = ({ onGameEnd }) => {
  // Game choices
  const CHOICES = {
    ROCK: 'rock',
    PAPER: 'paper',
    SCISSORS: 'scissors'
  };
  
  // Choice images
  const choiceImages = {
    [CHOICES.ROCK]: '/images/rock.png',
    [CHOICES.PAPER]: '/images/paper.png',
    [CHOICES.SCISSORS]: '/images/scissors.png'
  };
  
  // Game state tracking
  const [playerChoice, setPlayerChoice] = useState(null);
  const [opponentChoice, setOpponentChoice] = useState(null);
  const [roundWinner, setRoundWinner] = useState(null);
  const [roundScore, setRoundScore] = useState({ player: 0, opponent: 0 });
  const [roundNumber, setRoundNumber] = useState(1);
  const [roundMessage, setRoundMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [seconds, setSeconds] = useState(10);
  const [roundInProgress, setRoundInProgress] = useState(true);
  const [showChoices, setShowChoices] = useState(false);
  
  // Start new round with fresh timer
  const startNextRound = () => {
    setPlayerChoice(null);
    setOpponentChoice(null);
    setRoundWinner(null);
    setRoundMessage('');
    setRoundNumber(prevRound => prevRound + 1);
    setSeconds(10);
    setRoundInProgress(true);
    setShowChoices(false);
  };
  
  // Timer effect for selections
  useEffect(() => {
    let timer;
    if (roundInProgress) {
      timer = setInterval(() => {
        setSeconds(prevSeconds => {
          if (prevSeconds <= 1) {
            clearInterval(timer);
            evaluateRound();
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [roundInProgress]);
  
  // Determine opponent's choice
  const getOpponentChoice = () => {
    const choices = Object.values(CHOICES);
    return choices[Math.floor(Math.random() * choices.length)];
  };
  
  // Determine winner of the round
  const determineRoundWinner = (player, opponent) => {
    // Handle case where player didn't choose
    if (!player) return 'opponent';
    
    if (player === opponent) return 'draw';
    
    if (
      (player === CHOICES.ROCK && opponent === CHOICES.SCISSORS) ||
      (player === CHOICES.PAPER && opponent === CHOICES.ROCK) ||
      (player === CHOICES.SCISSORS && opponent === CHOICES.PAPER)
    ) {
      return 'player';
    }
    
    return 'opponent';
  };
  
  // Evaluate the round result
  const evaluateRound = () => {
    // Stop the round
    setRoundInProgress(false);
    
    // If player didn't make a choice, auto-select one for display purposes
    if (!playerChoice) {
      setPlayerChoice(getOpponentChoice());
    }
    
    // Get opponent's choice
    const opponent = getOpponentChoice();
    setOpponentChoice(opponent);
    
    // Determine round winner
    const winner = determineRoundWinner(playerChoice, opponent);
    setRoundWinner(winner);
    
    // Set round message
    if (winner === 'player') {
      setRoundMessage('You won this round!');
      setRoundScore(prev => ({ ...prev, player: prev.player + 1 }));
    } else if (winner === 'opponent') {
      setRoundMessage('Opponent won this round!');
      setRoundScore(prev => ({ ...prev, opponent: prev.opponent + 1 }));
    } else {
      setRoundMessage('This round is a draw!');
    }
    
    // Show both choices
    setShowChoices(true);
    
    // Check if the game is over (first to 3 points)
    setTimeout(() => {
      if (roundScore.player === 2 || roundScore.opponent === 2) {
        setGameOver(true);
        if (onGameEnd) {
          onGameEnd({
            winner: roundScore.player > roundScore.opponent ? 'player' : 'opponent',
            score: {
              player: roundScore.player,
              opponent: roundScore.opponent
            }
          });
        }
      } else {
        // Start next round
        setTimeout(startNextRound, 1500);
      }
    }, 1500);
  };
  
  // Handle player selection
  const handlePlayerChoice = (choice) => {
    if (!roundInProgress || playerChoice) return;
    
    setPlayerChoice(choice);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      {/* Round indicator */}
      <div className="bg-white/10 rounded-lg px-6 py-3 mb-6">
        <div className="flex justify-between items-center w-72">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">
              {roundScore.player}
            </div>
            <div className="text-xs text-white/60">You</div>
          </div>
          
          <div className="text-center">
            <div className="flex flex-col items-center">
              <div className="text-lg font-medium text-white">
                Round {roundNumber}
              </div>
              <div className="text-sm font-medium text-yellow-400">
                First to 3 wins
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">
              {roundScore.opponent}
            </div>
            <div className="text-xs text-white/60">Opponent</div>
          </div>
        </div>
      </div>
      
      {/* Timer */}
      {roundInProgress && (
        <div className="mb-6">
          <div className={`
            w-20 h-20 rounded-full flex items-center justify-center 
            text-2xl font-bold border-4
            ${seconds <= 3 ? 'border-red-500 text-red-400' : 'border-white/30 text-white'}
          `}>
            {seconds}
          </div>
        </div>
      )}
      
      {/* Game choices */}
      {roundInProgress ? (
        <div className="grid grid-cols-3 gap-4 mb-6">
          {Object.values(CHOICES).map((choice) => (
            <button
              key={choice}
              onClick={() => handlePlayerChoice(choice)}
              className={`
                w-24 h-24 rounded-lg flex items-center justify-center
                ${playerChoice === choice 
                  ? 'bg-blue-500/30 border-2 border-blue-500' 
                  : 'bg-white/10 hover:bg-white/20'}
                transition-all
              `}
              disabled={playerChoice !== null}
            >
              <img
                src={choiceImages[choice]}
                alt={choice}
                className="w-16 h-16 object-contain"
                onError={(e) => {
                  e.target.src = `/placeholder.png`;
                }}
              />
            </button>
          ))}
        </div>
      ) : (
        showChoices && (
          <div className="flex items-center justify-center gap-16 mb-8">
            <div className="flex flex-col items-center">
              <div className={`
                w-32 h-32 rounded-lg 
                ${roundWinner === 'player' ? 'bg-green-500/20 border-2 border-green-500' : 'bg-white/10'}
                flex items-center justify-center
              `}>
                <img
                  src={choiceImages[playerChoice]}
                  alt={playerChoice}
                  className="w-24 h-24 object-contain"
                />
              </div>
              <div className="mt-2 text-center">
                <div className="text-sm text-white/70">You chose</div>
                <div className="text-white font-medium capitalize">{playerChoice}</div>
              </div>
            </div>
            
            <div className="text-2xl font-bold text-white/60">VS</div>
            
            <div className="flex flex-col items-center">
              <div className={`
                w-32 h-32 rounded-lg 
                ${roundWinner === 'opponent' ? 'bg-green-500/20 border-2 border-green-500' : 'bg-white/10'}
                flex items-center justify-center
              `}>
                <img
                  src={choiceImages[opponentChoice]}
                  alt={opponentChoice}
                  className="w-24 h-24 object-contain"
                />
              </div>
              <div className="mt-2 text-center">
                <div className="text-sm text-white/70">Opponent chose</div>
                <div className="text-white font-medium capitalize">{opponentChoice}</div>
              </div>
            </div>
          </div>
        )
      )}
      
      {/* Round message */}
      {roundMessage && !roundInProgress && (
        <div className={`
          text-xl font-bold mt-4
          ${roundWinner === 'player' ? 'text-green-400' : 
           roundWinner === 'opponent' ? 'text-red-400' : 
           'text-yellow-400'}
        `}>
          {roundMessage}
        </div>
      )}
      
      {/* Instructions */}
      {roundInProgress && !playerChoice && (
        <div className="mt-4 text-center">
          <p className="text-white/70">Select Rock, Paper or Scissors</p>
          <p className="text-white/50 text-sm">You have {seconds} seconds to choose</p>
        </div>
      )}
      
      {/* Waiting message if player already selected */}
      {roundInProgress && playerChoice && (
        <div className="mt-4 text-center">
          <p className="text-white/70">You selected {playerChoice}!</p>
          <p className="text-white/50 text-sm">Waiting for time to expire...</p>
        </div>
      )}
    </div>
  );
};

export default StoneGameLogic; 