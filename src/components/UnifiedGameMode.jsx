import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Trophy } from 'lucide-react';

// Import game-specific layouts
import TictactoeLayout from './game-modes-tictactoe/GameModeLayout';
import StonePaperLayout from './game-modes-stonepaper/GameModeLayout';
import CoinflipLayout from './game-modes-coinflip/GameModeLayout';
import DiceLayout from './game-modes-dice/GameModeLayout';

/**
 * UnifiedGameMode - A reusable component for all game modes across different games
 * This component displays game lobbies and handles navigation to the game matching system
 */
const UnifiedGameMode = ({ 
  title = "Classic Mode", 
  gameId, 
  modeType = "classic", 
  games = [], 
  onBack 
}) => {
  const navigate = useNavigate();

  const handlePlayClick = (game) => {
    console.log(`Starting ${modeType} mode game with entry fee: ${game.entryFee}`);
    
    // Extract the numeric part from entryFee (₹10 -> 10)
    const entryFeeValue = parseInt(game.entryFee.replace(/[^\d]/g, ''));
    
    // Store game info in localStorage for retrieval in the game connector
    localStorage.setItem('currentGameInfo', JSON.stringify({
      entryFee: entryFeeValue,
      winAmount: parseInt(game.prize.replace(/[^\d]/g, '')),
      gameType: getGameName(),
      mode: modeType.charAt(0).toUpperCase() + modeType.slice(1)
    }));
    
    // Navigate to the game connector which will show price selection and then the game lobby
    navigate(`/games/${gameId}/play/${modeType}?price=${entryFeeValue}`);
  };
  
  // Get the appropriate layout component based on gameId
  const getLayoutComponent = () => {
    switch (gameId) {
      case 'tictactoe':
        return TictactoeLayout;
      case 'stonepaper':
        return StonePaperLayout;
      case 'coinflip':
        return CoinflipLayout;
      case 'dice':
        return DiceLayout;
      default:
        return TictactoeLayout; // Fallback
    }
  };
  
  // Get formatted game name
  const getGameName = () => {
    switch (gameId) {
      case 'tictactoe':
        return 'Tic-Tac-Toe';
      case 'stonepaper':
        return 'Stone Paper Scissors';
      case 'coinflip':
        return 'Coinflip';
      case 'dice':
        return 'Dice';
      default:
        return gameId;
    }
  };

  const LayoutComponent = getLayoutComponent();
  const formattedModeType = modeType.charAt(0).toUpperCase() + modeType.slice(1);
  
  return (
    <LayoutComponent title={getGameName()} onBack={onBack} gameMode={formattedModeType}>
      {/* Scrollable Game List Container */}
      <div className="space-y-4 max-h-[calc(100vh-250px)] overflow-y-auto pr-1">
        {games.length > 0 ? (
          games.map((game) => (
            <div
              key={game.id}
              className="bg-gray-800/80 rounded-xl shadow-lg p-4 border border-gray-700/50 transition-all hover:shadow-xl hover:bg-gray-800"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <Trophy className="h-5 w-5 text-blue-500 mr-1" />
                  <span className="text-blue-500 font-semibold">{game.name}</span>
                </div>
                <span className="ml-3 text-blue-500 text-base">{game.startTime || "Ready to start"}</span>
              </div>

              <div className="flex items-center">
                {game.image && (
                  <div className="w-24 h-24 bg-transparent rounded-lg flex justify-center items-center p-2 shadow-md">
                    <div className="w-20 h-20 bg-gray-400 rounded-lg border border-gray-500 flex items-center justify-center">
                      <span className="text-gray-200 text-sm">Image</span>
                    </div>
                  </div>
                )}

                <div className="mx-4">
                  <span className="text-xl font-bold text-yellow-400">{game.prize}</span>
                </div>

                <div className="ml-auto">
                  <button
                    onClick={() => handlePlayClick(game)}
                    className={`${
                      game.isRegistered
                        ? "bg-gradient-to-r from-blue-600 to-blue-800"
                        : game.buttonColor || "bg-gradient-to-r from-green-500 to-green-600"
                    } w-28 px-6 py-2 rounded-lg font-bold text-white shadow-md hover:brightness-110 transition-all active:scale-95 flex items-center justify-center`}
                  >
                    {game.isRegistered ? "REGISTERED" : game.entryFee}
                  </button>
                </div>
              </div>

              <div className="flex items-center mt-3 text-sm gap-4">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-red-500 mr-1 shadow-sm"></div>
                  <span className="text-gray-300">{game.timeLimit || "10 mins"}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gray-700 rounded-full flex items-center justify-center mr-1 shadow-sm">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-300">{game.playerCount || "1,000+"}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-yellow-500 rounded-sm mr-1 shadow-sm"></div>
                  <span className="text-gray-300">{game.winnerCount || "1 Winner"}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-300 text-lg">No games found.</p>
          </div>
        )}
      </div>
    </LayoutComponent>
  );
};

export default UnifiedGameMode; 