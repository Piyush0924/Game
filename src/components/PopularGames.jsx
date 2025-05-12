import { GameImage } from './GameImages';

const games = [
  {
    id: 1,
    name: 'Chess',
    description: 'Challenge players worldwide in the ultimate game of strategy and skill. Play 1v1 matches and climb the leaderboard.',
    image: '/chess.jpg',
    players: '2',
    time: '10-30 min',
    features: ['Real-time matches', 'Tournament mode', 'Skill-based matchmaking'],
    prize: 'Up to ₹50,000',
  },
  {
    id: 2,
    name: 'Ludo',
    description: 'Roll the dice and race your tokens to victory in this classic board game. Perfect for quick matches and family fun.',
    image: '/ludo.jpg',
    players: '2-4',
    time: '15-45 min',
    features: ['Quick matches', 'Team play', 'Daily rewards'],
    prize: 'Up to ₹25,000',
  },
  {
    id: 3,
    name: 'Carrom',
    description: 'Test your precision and control in this popular tabletop game. Master the art of striking and pocketing.',
    image: '/carrom.jpg',
    players: '2-4',
    time: '20-40 min',
    features: ['Practice mode', 'Tournament play', 'Leaderboards'],
    prize: 'Up to ₹35,000',
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
              className="group bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300"
            >
              <div className="relative h-48">
                <GameImage type="main" game={game.name.toLowerCase()} className="w-full h-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold">{game.name}</h3>
                  <p className="text-sm text-gray-200">Prize Pool: {game.prize}</p>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600">{game.description}</p>
                
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

                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Features:</h4>
                  <ul className="space-y-1">
                    {game.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <svg className="h-4 w-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-6 flex gap-4">
                  <button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200">
                    Play Now
                  </button>
                  <button className="flex-1 bg-gray-100 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 transform hover:scale-105 transition-all duration-200">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 