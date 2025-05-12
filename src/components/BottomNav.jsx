import { Home, Gamepad2, Trophy, Wallet, Users } from 'lucide-react';

const navigation = [
  { name: 'Home', icon: Home, href: '#' },
  { name: 'Games', icon: Gamepad2, href: '#' },
  { name: 'Tournaments', icon: Trophy, href: '#' },
  { name: 'Wallet', icon: Wallet, href: '#' },
  { name: 'Community', icon: Users, href: '#' },
];

export default function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden">
      <div className="flex justify-around items-center h-16">
        {navigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="flex flex-col items-center justify-center w-full h-full text-gray-600 hover:text-purple-600 transition-colors"
          >
            <item.icon className="h-6 w-6" />
            <span className="text-xs mt-1">{item.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
} 