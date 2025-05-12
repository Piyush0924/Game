export const gameImages = {
  chess: {
    preview: '/chess-preview.jpg',
    main: '/chess.jpg',
    fallback: 'bg-gradient-to-br from-purple-500 to-blue-500',
  },
  ludo: {
    preview: '/ludo-preview.jpg',
    main: '/ludo.jpg',
    fallback: 'bg-gradient-to-br from-green-500 to-yellow-500',
  },
  carrom: {
    preview: '/carrom-preview.jpg',
    main: '/carrom.jpg',
    fallback: 'bg-gradient-to-br from-red-500 to-orange-500',
  },
};

export function GameImage({ type, game, className = '' }) {
  const image = gameImages[game.toLowerCase()];
  
  return (
    <div className={`relative ${image.fallback} ${className}`}>
      <img
        src={image[type]}
        alt={`${game} ${type}`}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.parentElement.classList.add(image.fallback);
        }}
      />
    </div>
  );
} 