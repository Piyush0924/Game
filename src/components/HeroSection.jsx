import { ArrowRight, Users, Trophy, Wallet } from 'lucide-react';
import { GameImage } from './GameImages';

export default function HeroSection() {
  return (
    <div className="relative bg-gray-900 min-h-screen overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-blue-900/50 animate-gradient" />
      
      {/* Floating game elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl animate-float-delayed" />
      </div>
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight">
            <span className="block">Your Favorite Games,</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 mt-2">
              Anytime!
            </span>
          </h1>
          
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-300">
            Join millions of players in exciting multiplayer games. Challenge your skills,
            compete in tournaments, and win real cash prizes instantly.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <button className="group px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center">
              Start Playing
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-3 rounded-lg bg-white/10 text-white font-semibold text-lg hover:bg-white/20 transform hover:scale-105 transition-all duration-200 backdrop-blur-sm">
              Download App
            </button>
          </div>
        </div>
        
        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 transform hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-center">
              <Users className="h-8 w-8 text-purple-400" />
            </div>
            <div className="mt-4 text-3xl font-bold text-white text-center">80M+</div>
            <div className="mt-2 text-gray-300 text-center">Downloads</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 transform hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-center">
              <Trophy className="h-8 w-8 text-yellow-400" />
            </div>
            <div className="mt-4 text-3xl font-bold text-white text-center">₹65,000</div>
            <div className="mt-2 text-gray-300 text-center">In Contest Winning</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 transform hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-center">
              <Wallet className="h-8 w-8 text-green-400" />
            </div>
            <div className="mt-4 text-3xl font-bold text-white text-center">Instant</div>
            <div className="mt-2 text-gray-300 text-center">Withdrawal</div>
          </div>
        </div>

        {/* Game Preview */}
        <div className="mt-20 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative group">
              <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden">
                <GameImage type="preview" game="chess" className="w-full h-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">Chess</h3>
                  <p className="text-sm text-gray-200">Strategy & Skill</p>
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden">
                <GameImage type="preview" game="ludo" className="w-full h-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">Ludo</h3>
                  <p className="text-sm text-gray-200">Classic Board Game</p>
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden">
                <GameImage type="preview" game="carrom" className="w-full h-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">Carrom</h3>
                  <p className="text-sm text-gray-200">Precision & Control</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 