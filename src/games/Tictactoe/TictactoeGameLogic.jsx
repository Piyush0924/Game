import React, { useState, useEffect } from 'react';

/**
 * TictactoeGameLogic - Handles the game logic for Tic Tac Toe
 * This component manages the board state, tracks rounds, and determines the winner
 */
const TictactoeGameLogic = ({ onGameEnd }) => {
  // Game board state (3x3 grid)
  const [board, setBoard] = useState(Array(9).fill(null));
  
  // Game state tracking
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [roundWinner, setRoundWinner] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [roundNumber, setRoundNumber] = useState(1);
  const [roundScore, setRoundScore] = useState({ player: 0, opponent: 0 });
  const [turnTimer, setTurnTimer] = useState(null);

  // Winning combinations (rows, columns, diagonals)
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  // Initialize or reset the game board
  const resetBoard = () => {
    setBoard(Array(9).fill(null));
    setRoundWinner(null);
    setIsPlayerTurn(true);
  };

  // Start a new round
  const startNextRound = () => {
    resetBoard();
    setRoundNumber(prev => prev + 1);
  };

  // Check if the game has a winner based on the current board state
  const checkWinner = (currentBoard) => {
    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (
        currentBoard[a] && 
        currentBoard[a] === currentBoard[b] && 
        currentBoard[a] === currentBoard[c]
      ) {
        return currentBoard[a]; // Return 'X' (player) or 'O' (opponent)
      }
    }
    
    // Check for draw (all cells filled)
    if (currentBoard.every(cell => cell !== null)) {
      return 'draw';
    }
    
    return null; // No winner yet
  };

  // Handle player's move
  const handleCellClick = (index) => {
    // Ignore clicks if not player's turn or cell is already filled
    if (!isPlayerTurn || board[index] || roundWinner) return;
    
    // Update board with player's move
    const newBoard = [...board];
    newBoard[index] = 'X';  // Player is always X
    setBoard(newBoard);
    setIsPlayerTurn(false);
    
    // Check for winner after player's move
    const winner = checkWinner(newBoard);
    if (winner) {
      handleRoundEnd(winner);
    }
  };

  // Computer's move (opponent)
  useEffect(() => {
    if (!isPlayerTurn && !roundWinner) {
      // Add delay for more natural feeling
      const timer = setTimeout(() => {
        // Find empty cells
        const emptyCells = board.reduce((acc, cell, index) => {
          if (cell === null) acc.push(index);
          return acc;
        }, []);
        
        if (emptyCells.length > 0) {
          // Try to make a smart move (for better gameplay)
          let moveIndex = findBestMove(board);
          
          // Update board with opponent's move
          const newBoard = [...board];
          newBoard[moveIndex] = 'O';  // Opponent is always O
          setBoard(newBoard);
          setIsPlayerTurn(true);
          
          // Check for winner after opponent's move
          const winner = checkWinner(newBoard);
          if (winner) {
            handleRoundEnd(winner);
          }
        }
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, board, roundWinner]);

  // Find best move for AI using minimax
  const findBestMove = (currentBoard) => {
    // Simplified logic - first try to win, then block player, then random
    
    // Check if AI can win in one move
    for (let i = 0; i < 9; i++) {
      if (currentBoard[i] === null) {
        const boardCopy = [...currentBoard];
        boardCopy[i] = 'O';
        if (checkWinner(boardCopy) === 'O') {
          return i; // Winning move
        }
      }
    }
    
    // Check if player can win in one move and block
    for (let i = 0; i < 9; i++) {
      if (currentBoard[i] === null) {
        const boardCopy = [...currentBoard];
        boardCopy[i] = 'X';
        if (checkWinner(boardCopy) === 'X') {
          return i; // Blocking move
        }
      }
    }
    
    // Take center if available
    if (currentBoard[4] === null) return 4;
    
    // Take corners if available
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(i => currentBoard[i] === null);
    if (availableCorners.length > 0) {
      return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }
    
    // Take any available cell
    const emptyCells = currentBoard.reduce((acc, cell, index) => {
      if (cell === null) acc.push(index);
      return acc;
    }, []);
    
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
  };

  // Handle round completion
  const handleRoundEnd = (winner) => {
    setRoundWinner(winner);
    
    // Update score based on winner
    if (winner === 'X') {
      // Player won
      setRoundScore(prev => ({
        ...prev,
        player: prev.player + 1
      }));
    } else if (winner === 'O') {
      // Opponent won
      setRoundScore(prev => ({
        ...prev,
        opponent: prev.opponent + 1
      }));
    }
    
    // Check if we should proceed to next round or end game
    setTimeout(() => {
      if (roundScore.player === 2 || roundScore.opponent === 2) {
        // End game if someone has won 2 rounds (best of 3)
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
        startNextRound();
      }
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      {/* Round indicator */}
      <div className="bg-white/10 rounded-lg px-4 py-2 mb-6">
        <div className="flex justify-between items-center w-64">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">
              {roundScore.player}
            </div>
            <div className="text-xs text-white/60">You</div>
          </div>
          
          <div className="text-center">
            <div className="text-lg font-medium text-white">
              Round {roundNumber}/3
            </div>
            <div className="text-xs text-white/60">
              {roundWinner === 'X' ? 'You won!' : 
               roundWinner === 'O' ? 'Opponent won!' : 
               roundWinner === 'draw' ? 'Draw!' : 'In progress'}
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
      
      {/* Game board */}
      <div className="bg-white/10 rounded-lg p-4 shadow-lg">
        <div className="grid grid-cols-3 gap-2 w-64 h-64">
          {board.map((cell, index) => (
            <button
              key={index}
              className={`
                flex items-center justify-center 
                w-20 h-20 text-4xl font-bold rounded-md
                ${cell ? 'cursor-default' : 'cursor-pointer'}
                ${cell === null ? 'bg-white/5 hover:bg-white/10' : 
                  cell === 'X' ? 'bg-blue-500/20 text-blue-400' : 
                  'bg-red-500/20 text-red-400'}
                transition-all
              `}
              onClick={() => handleCellClick(index)}
            >
              {cell}
            </button>
          ))}
        </div>
      </div>
      
      {/* Game status */}
      <div className="mt-6 text-center">
        <div className="text-lg text-white">
          {isPlayerTurn ? "Your turn" : "Opponent's turn"}
        </div>
        {roundWinner && (
          <div className="mt-2 font-medium text-lg">
            {roundWinner === 'X' ? 
              <span className="text-blue-400">You won this round!</span> : 
             roundWinner === 'O' ? 
              <span className="text-red-400">Opponent won this round!</span> : 
              <span className="text-yellow-400">This round is a draw!</span>
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default TictactoeGameLogic; 