import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import GameResultLobby from './GameResultLobby';

// Import game components
import TictactoeGameLogic from '../games/Tictactoe/TictactoeGameLogic';
import StoneGameLogic from '../games/Stone-Paper/StoneGameLogic';
import CoinflipGameLogic from '../games/Coinflip/CoinflipGameLogic';
import DiceGameLogic from '../games/Dice/DiceGameLogic';

// Game mode layouts
import TictactoeLayout from './game-modes-tictactoe/GameModeLayout';
import StonePaperLayout from './game-modes-stonepaper/GameModeLayout';
import CoinflipLayout from './game-modes-coinflip/GameModeLayout';
import DiceLayout from './game-modes-dice/GameModeLayout';

/**
 * GameConnector - Handles the connection to different games and manages game flow
 * This component loads the appropriate game based on URL parameters and handles game completion
 */
const GameConnector = () => {
  const { gameId, modeType } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addMoney } = useWallet();
  
  // Game state
  const [gameEnded, setGameEnded] = useState(false);
  const [gameResult, setGameResult] = useState(null);
  const [gameInfo, setGameInfo] = useState(null);
  
  // Get price from URL params
  const price = searchParams.get('price') ? parseInt(searchParams.get('price')) : 0;
  
  // Load game info from localStorage on mount
  useEffect(() => {
    const storedGameInfo = localStorage.getItem('currentGameInfo');
    if (storedGameInfo) {
      setGameInfo(JSON.parse(storedGameInfo));
    }
  }, []);
  
  // Handle game completion
  const handleGameEnd = (result) => {
    setGameResult(result);
    setGameEnded(true);
    
    // Add winnings to wallet if player won
    if (result.winner === 'player' && gameInfo) {
      addMoney(gameInfo.winAmount, `${gameInfo.gameType} ${modeType} Mode Winnings`);
    }
  };
  
  // Handle play again button
  const handlePlayAgain = () => {
    // Reset game state
    setGameEnded(false);
    setGameResult(null);
    
    // Reload the game by refreshing the page
    window.location.reload();
  };
  
  // Handle exit button
  const handleExit = () => {
    // Navigate back to game lobby
    navigate(`/games/${gameId}`);
  };
  
  // Determine which game component to render based on gameId
  const renderGameComponent = () => {
    switch (gameId) {
      case 'tictactoe':
        return <TictactoeGameLogic onGameEnd={handleGameEnd} />;
      case 'stonepaper':
        return <StoneGameLogic onGameEnd={handleGameEnd} />;
      case 'coinflip':
        return <CoinflipGameLogic onGameEnd={handleGameEnd} />;
      case 'dice':
        return <DiceGameLogic onGameEnd={handleGameEnd} />;
      default:
        return <div className="text-center text-white">Game not found</div>;
    }
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
  
  // Format mode type for display
  const getFormattedModeType = () => {
    return modeType.charAt(0).toUpperCase() + modeType.slice(1);
  };
  
  // If game has ended, show result lobby
  if (gameEnded && gameResult && gameInfo) {
    return (
      <GameResultLobby
        gameType={getGameName()}
        gameMode={getFormattedModeType()}
        winner={gameResult.winner}
        score={gameResult.score}
        winAmount={gameInfo.winAmount}
        entryFee={gameInfo.entryFee}
        gameDetails={gameResult.lastDice ? {
          'Last Roll': `You: ${gameResult.lastDice.player}, Opponent: ${gameResult.lastDice.opponent}`
        } : {}}
        onPlayAgain={handlePlayAgain}
        onExit={handleExit}
      />
    );
  }
  
  // Render the game with appropriate layout
  const LayoutComponent = getLayoutComponent();
  return (
    <LayoutComponent 
      title={getGameName()} 
      gameMode={getFormattedModeType()} 
      onBack={handleExit}
    >
      {renderGameComponent()}
    </LayoutComponent>
  );
};

export default GameConnector; 