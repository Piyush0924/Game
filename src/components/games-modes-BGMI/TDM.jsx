'use client';

export default function TDM({ onBack }) {
  return (
    <div className="w-full min-h-screen bg-gray-900 text-white p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Team Deathmatch (TDM)</h2>
        <button
          className="text-white hover:text-blue-500 transition"
          onClick={onBack}
        >
          Back
        </button>
      </div>
      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-xl font-bold mb-2">Team Deathmatch - 4v4</h3>
        <p className="text-gray-300 mb-4">
          Engage in fast-paced 4v4 matches. Team up, eliminate opponents, and rack up kills to win!
        </p>
        <div className="mb-4">
          <p className="text-green-400">Entry Fee: ₹20 - ₹100</p>
          <p className="text-gray-400">Prize Pool: Up to ₹5,000</p>
        </div>
        <button className="w-full rounded-lg bg-blue-500 text-white font-medium py-3 hover:bg-blue-600">
          Join Match
        </button>
      </div>
    </div>
  );
}