const tournaments = [
  {
    id: 1,
    name: 'Chess Masters Cup',
    game: 'Chess',
    prize: '₹50,000',
    date: '2024-04-15',
    participants: 128,
    entryFee: '₹500',
  },
  {
    id: 2,
    name: 'Ludo Championship',
    game: 'Ludo',
    prize: '₹25,000',
    date: '2024-04-20',
    participants: 64,
    entryFee: '₹300',
  },
  {
    id: 3,
    name: 'Carrom Pro League',
    game: 'Carrom',
    prize: '₹35,000',
    date: '2024-04-25',
    participants: 96,
    entryFee: '₹400',
  },
];

export default function UpcomingTournaments() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Upcoming Tournaments
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Join our competitive tournaments and win big prizes
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {tournaments.map((tournament) => (
            <div
              key={tournament.id}
              className="bg-gray-50 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 border border-gray-200"
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 text-sm font-semibold text-purple-600 bg-purple-100 rounded-full">
                    {tournament.game}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(tournament.date).toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                <h3 className="mt-4 text-xl font-semibold text-gray-900">
                  {tournament.name}
                </h3>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Prize Pool</span>
                    <span className="font-semibold text-gray-900">{tournament.prize}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Entry Fee</span>
                    <span className="font-semibold text-gray-900">{tournament.entryFee}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Participants</span>
                    <span className="font-semibold text-gray-900">{tournament.participants}</span>
                  </div>
                </div>

                <div className="mt-6 flex gap-4">
                  <button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200">
                    Register Now
                  </button>
                  <button className="flex-1 bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transform hover:scale-105 transition-all duration-200">
                    Details
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