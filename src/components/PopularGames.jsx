const games = [
  {
    id: 1,
    name: 'Chess',
    description: 'Challenge players worldwide in the ultimate game of strategy and skill.',
    image: '/chess.jpg',
    players: '2',
    time: '10-30 min',
  },
  {
    id: 2,
    name: 'Ludo',
    description: 'Roll the dice and race your tokens to victory in this classic board game.',
    image: '/ludo.jpg',
    players: '2-4',
    time: '15-45 min',
  },
  {
    id: 3,
    name: 'Carrom',
    description: 'Test your precision and control in this popular tabletop game.',
    image: '/carrom.jpg',
    players: '2-4',
    time: '20-40 min',
  },
];

export default function PopularGames() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Popular Games
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Choose from our selection of exciting multiplayer games
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((game) => (
            <div
              key={game.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300"
            >
              <div className="relative h-48 bg-gray-200">
                {/* Placeholder for game image */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 opacity-75" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">{game.name}</span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">{game.name}</h3>
                <p className="mt-2 text-gray-600">{game.description}</p>
                
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {game.players} Players
                  </div>
                  <div className="flex items-center">
                    <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {game.time}
                  </div>
                </div>
                
                <button className="mt-6 w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200">
                  Play Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 