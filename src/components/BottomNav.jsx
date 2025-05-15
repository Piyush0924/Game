import React, { useState } from 'react';
import { Home, Gamepad2, Users, User } from 'lucide-react';

const navigation = [
  { name: 'Home', icon: Home, href: '#' },
  { name: 'Games', icon: Gamepad2, href: '#' },
  { name: 'Community', icon: Users, href: '#' },
  { name: 'Profile', icon: User, href: '#' },
];

export default function BottomNav() {
  const [active, setActive] = useState('Home');
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999]">
      <div className="mx-auto max-w-2xl">
        <div className="glass-effect bg-gradient-to-tr from-gray-900/95 via-purple-900/90 to-gray-900/95 backdrop-blur-xl border-t border-gray-800/50 shadow-2xl rounded-t-2xl flex justify-around items-center h-20 px-2">
          {/* Left Navigation Items */}
          <div className="flex-1 flex justify-around">
            {navigation.slice(0, 2).map((item) => {
              const isActive = active === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => setActive(item.name)}
                  className={`flex flex-col items-center justify-center w-full h-full group focus:outline-none transition-all duration-200 ${
                    isActive ? 'text-purple-400' : 'text-gray-400 hover:text-purple-400'
                  }`}
                  style={{ minWidth: 0 }}
                >
                  <span
                    className={`flex items-center justify-center rounded-full transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg scale-110'
                        : 'hover:bg-gray-800/50'
                    } p-2`}
                  >
                    <item.icon className={`h-6 w-6 transition-all duration-200 ${isActive ? 'text-white' : ''}`} />
                  </span>
                  <span
                    className={`text-xs mt-1 font-medium transition-all duration-200 ${
                      isActive ? 'text-purple-400' : ''
                    }`}
                  >
                    {item.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Center Logo */}
          <div className="flex items-center justify-center px-4">
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-1 rounded-2xl shadow-lg">
              <img
                src="/images/logo.png"
                alt="BoostNow Games Logo"
                className="h-12 w-12 rounded-xl bg-white/95 shadow-md"
              />
            </div>
          </div>

          {/* Right Navigation Items */}
          <div className="flex-1 flex justify-around">
            {navigation.slice(2).map((item) => {
            const isActive = active === item.name;
            return (
              <button
                key={item.name}
                onClick={() => setActive(item.name)}
                  className={`flex flex-col items-center justify-center w-full h-full group focus:outline-none transition-all duration-200 ${
                    isActive ? 'text-purple-400' : 'text-gray-400 hover:text-purple-400'
                  }`}
                style={{ minWidth: 0 }}
              >
                  <span
                    className={`flex items-center justify-center rounded-full transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg scale-110'
                        : 'hover:bg-gray-800/50'
                    } p-2`}
                  >
                    <item.icon className={`h-6 w-6 transition-all duration-200 ${isActive ? 'text-white' : ''}`} />
                  </span>
                  <span
                    className={`text-xs mt-1 font-medium transition-all duration-200 ${
                      isActive ? 'text-purple-400' : ''
                    }`}
                  >
                    {item.name}
                </span>
              </button>
            );
          })}
          </div>
        </div>
      </div>
    </div>
  );
} 