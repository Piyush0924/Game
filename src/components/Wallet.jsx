import React from 'react';

export default function WalletPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-800 to-purple-900 text-white p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="bg-white text-black text-xs px-3 py-1 rounded-full font-semibold">
          VIP POINTS: 4
        </div>
        <div className="text-sm underline cursor-pointer">Transactions & Support</div>
      </div>

      {/* Wallet Balance Card */}
      <div className="bg-purple-700 rounded-xl p-5 text-center shadow-lg mb-6">
        <h2 className="text-lg font-semibold">Wallet Balance</h2>
        <p className="text-3xl font-extrabold mt-2">₹23.5</p>
      </div>

      {/* Sub Wallet Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-white text-black p-4 rounded-xl shadow-md">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">Unplayed</span>
            <span className="font-bold">₹0</span>
          </div>
        </div>

        <div className="bg-white text-black p-4 rounded-xl shadow-md flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="font-medium">Bonus</span>
            <button className="text-sm bg-black text-white px-3 py-1 rounded">Earn Bonus</button>
          </div>
        </div>

        <div className="bg-white text-black p-4 rounded-xl shadow-md flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="font-medium">Winnings</span>
            <button className="text-sm bg-green-500 text-white px-3 py-1 rounded">Withdraw</button>
          </div>
        </div>

        <div className="bg-green-600 text-white p-4 rounded-xl shadow-md text-center cursor-pointer">
          <span className="font-semibold text-lg">+ Add Cash</span>
        </div>
      </div>

      {/* Coin Wallet */}
      <div className="bg-white text-black p-4 rounded-xl shadow-md mb-6">
        <h3 className="font-semibold text-lg mb-3">Coin Wallet</h3>
        <div className="flex justify-between items-center mb-2">
          <span>Earn Coins</span>
          <button className="bg-purple-600 text-white px-3 py-1 rounded">Watch Ads</button>
        </div>
        <div className="flex justify-between items-center">
          <span>Spend Coins</span>
          <button className="bg-purple-600 text-white px-3 py-1 rounded">Play Practice</button>
        </div>
      </div>

      {/* Transaction Filters */}
      <div className="bg-white text-black p-4 rounded-xl shadow-md mb-6">
        <h3 className="font-semibold text-lg mb-3">Transaction History</h3>
        <div className="flex flex-wrap gap-2 text-sm">
          {['All', 'Add', 'Withdraw', 'Earn', 'Spend'].map((label) => (
            <button key={label} className="bg-gray-200 px-3 py-1 rounded">
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Bonus Tracking */}
      <div className="bg-white text-black p-4 rounded-xl shadow-md mb-6">
        <h3 className="font-semibold text-lg mb-2">Bonus Tracking</h3>
        <p className="text-sm text-gray-600">Track how your bonus is earned and used.</p>
      </div>

      {/* Referral Banner */}
      <div className="mb-20">
        <img
          src="/path-to-your-referral-banner.png"
          alt="Referral Bonanza"
          className="w-full rounded-xl shadow-lg"
        />
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-purple-900 text-white flex justify-around items-center h-16 rounded-t-xl shadow-lg">
        {[
          { icon: 'ladder.png', label: 'SLadder' },
          { icon: 'sword.png', label: 'World War' },
          { icon: 'center.png', label: '' },
          { icon: 'refer.png', label: 'Refer' },
          { icon: 'wallet.png', label: 'Wallet' },
        ].map(({ icon, label }, i) => (
          <button key={i} className="flex flex-col items-center text-xs">
            <img src={`/icons/${icon}`} alt={label} className="w-5 h-5 mb-1" />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
