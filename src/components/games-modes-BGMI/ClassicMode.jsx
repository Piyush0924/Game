'use client';

export default function ClassicMode({ onBack }) {
  return (
    <div className="w-full min-h-screen bg-gray-900 text-white p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Classic Mode</h2>
        <button
          className="text-white hover:text-blue-500 transition"
          onClick={onBack}
        >
          Back
        </button>
      </div>
      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-xl font-bold mb-2">Classic Mode - Battle Royale</h3>
        <p className="text-gray-300 mb-4">
          Join a 100-player battle royale match. Survive, strategize, and be the last one standing to win!
        </p>
        <div className="mb-4">
          <p className="text-green-400">Entry Fee: ₹50 - ₹200</p>
          <p className="text-gray-400">Prize Pool: Up to ₹10,000</p>
        </div>
        <button className="w-full rounded-lg bg-blue-500 text-white font-medium py-3 hover:bg-blue-600">
          Join Match
        </button>
      </div>
    </div>
  );
}