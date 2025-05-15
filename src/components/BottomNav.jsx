import React, { useState } from 'react';
import { Home, Gamepad2, Wallet, Users, User } from 'lucide-react';
import {Link} from "react-router-dom"
const navigation = [
  { name: 'Home', icon: Home, href: '#' },
  { name: 'Games', icon: Gamepad2, href: '/Games' },
  { name: 'Wallet', icon: Wallet, href: '#' },
  { name: 'Community', icon: Users, href: '/Community' },
  { name: 'Profile', icon: User, href: '#' },
];

export default function BottomNav() {
  const [active, setActive] = useState('Home');
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999]">
      <div className="mx-auto max-w-2xl">
        <div className="glass-effect bg-gradient-to-tr from-white/70 via-purple-100/60 to-blue-100/60 backdrop-blur-xl border-t border-gray-200 shadow-2xl rounded-t-2xl flex justify-around items-center h-20 px-2">
          {navigation.map((item) => {
            const isActive = active === item.name;
            return (
              <button
                key={item.name}
                onClick={() => setActive(item.name)}
                className={`flex flex-col items-center justify-center w-full h-full group focus:outline-none transition-all duration-200 ${isActive ? 'text-purple-700' : 'text-gray-600 hover:text-purple-600'}`}
                style={{ minWidth: 0 }}
              >
                <span className={`flex items-center justify-center rounded-full transition-all duration-200 ${isActive ? 'bg-gradient-to-br from-purple-500 to-blue-500 shadow-lg scale-110' : ''} p-2`}>
                 <Link to={item.href}><item.icon className={`h-7 w-7 transition-all duration-200 ${isActive ? 'text-white' : ''}`} /></Link>
                </span>
                <span className={`text-xs mt-1 font-semibold transition-all duration-200 ${isActive ? 'text-purple-700' : ''}`}>{item.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}