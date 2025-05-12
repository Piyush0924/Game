export default function HeroSection() {
  return (
    <div className="relative bg-gray-900 min-h-screen">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-blue-900/50" />
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight">
          <span className="block">Play. Compete.</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
            Win Real Money.
          </span>
        </h1>
        
        <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-300">
          Join thousands of players in exciting multiplayer games. Challenge your skills,
          compete in tournaments, and win real cash prizes.
        </p>
        
        <div className="mt-10 flex justify-center gap-4">
          <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
            Start Playing
          </button>
          <button className="px-8 py-3 rounded-lg bg-white/10 text-white font-semibold text-lg hover:bg-white/20 transform hover:scale-105 transition-all duration-200 backdrop-blur-sm">
            Learn More
          </button>
        </div>
        
        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 transform hover:scale-105 transition-all duration-200">
            <div className="text-3xl font-bold text-white">10K+</div>
            <div className="mt-2 text-gray-300">Active Players</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 transform hover:scale-105 transition-all duration-200">
            <div className="text-3xl font-bold text-white">₹50L+</div>
            <div className="mt-2 text-gray-300">Prize Money</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 transform hover:scale-105 transition-all duration-200">
            <div className="text-3xl font-bold text-white">24/7</div>
            <div className="mt-2 text-gray-300">Tournaments</div>
          </div>
        </div>
      </div>
    </div>
  );
} 