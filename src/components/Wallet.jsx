import React from 'react';
import { ArrowLeft, Wallet as WalletIcon, Plus, Minus, History } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Wallet() {
  const navigate = useNavigate();
  const [balance] = React.useState(2500);

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-20 px-4">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button 
          onClick={() => navigate('/')}
          className="p-2 hover:bg-gray-800 rounded-full transition-colors"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-2xl font-bold ml-4">My Wallet</h1>
      </div>

      {/* Balance Card */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 mb-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <WalletIcon className="h-8 w-8 mr-3" />
            <span className="text-lg font-medium">Available Balance</span>
          </div>
        </div>
        <div className="text-4xl font-bold mb-2">₹{balance}</div>
        <p className="text-purple-200">Your current balance</p>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <button className="bg-green-600 hover:bg-green-700 text-white rounded-xl p-4 flex items-center justify-center transition-colors">
          <Plus className="h-6 w-6 mr-2" />
          Add Money
        </button>
        <button className="bg-red-600 hover:bg-red-700 text-white rounded-xl p-4 flex items-center justify-center transition-colors">
          <Minus className="h-6 w-6 mr-2" />
          Withdraw
        </button>
      </div>

      {/* Transaction History */}
      <div className="bg-gray-800 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <History className="h-6 w-6 mr-2" />
            <h2 className="text-xl font-semibold">Transaction History</h2>
          </div>
        </div>
        
        {/* Sample Transactions */}
        <div className="space-y-4">
          {[
            { type: 'credit', amount: 500, description: 'Game Win', date: '2024-03-20' },
            { type: 'debit', amount: 200, description: 'Game Entry', date: '2024-03-19' },
            { type: 'credit', amount: 1000, description: 'Added Money', date: '2024-03-18' },
          ].map((transaction, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-xl">
              <div>
                <p className="font-medium">{transaction.description}</p>
                <p className="text-sm text-gray-400">{transaction.date}</p>
              </div>
              <span className={`font-bold ${transaction.type === 'credit' ? 'text-green-400' : 'text-red-400'}`}>
                {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 