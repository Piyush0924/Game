import { Wallet, Users, Trophy, Shield } from 'lucide-react';

const features = [
  {
    name: 'Secure Wallet',
    description: 'Instant deposits and withdrawals with multiple payment options. Your money is always safe with us.',
    icon: Wallet,
  },
  {
    name: 'Active Community',
    description: 'Join thousands of players, participate in discussions, and make new friends.',
    icon: Users,
  },
  {
    name: 'Daily Rewards',
    description: 'Earn rewards just by playing! Daily bonuses and special promotions for our players.',
    icon: Trophy,
  },
  {
    name: 'Safe & Fair',
    description: 'Our platform ensures fair play and secure transactions for all players.',
    icon: Shield,
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Why Choose BoostNow Games?
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Experience gaming like never before with our premium features
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="relative group bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="absolute -top-4 left-6">
                <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white transform group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-6 w-6" />
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900">{feature.name}</h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </div>
              
              <div className="mt-4">
                <button className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center group-hover:translate-x-1 transition-transform duration-300">
                  Learn more
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 