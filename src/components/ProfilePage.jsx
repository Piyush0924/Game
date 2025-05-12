"use client"

import { useState } from "react"
import {
  Bell,
  ChevronRight,
  Copy,
  CreditCard,
  ExternalLink,
  Gift,
  Gamepad2,
  HelpCircle,
  LogOut,
  Settings,
  Shield,
  User,
  ChevronDown,
} from "lucide-react"
import {Link} from "react-router-dom"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("games")
  const [openAccordion, setOpenAccordion] = useState(null)

  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold text-purple-400">GameZone</h1>
          <div className="flex items-center gap-3">
            <button className="p-2 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-full">
              <Bell className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-full">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* User Profile Card */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg mb-6">
          <div className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex flex-col items-center">
                <div className="h-24 w-24 rounded-full border-2 border-purple-500 overflow-hidden">
                  <img
                    src="/placeholder.svg?height=96&width=96"
                    alt="User Avatar"
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="mt-2 px-2 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white">
                  Pro Player
                </span>
              </div>

              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold">GamerX123</h2>
                <div className="text-gray-400 flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mt-1">
                  <span>User ID: #78945612</span>
                  <span className="hidden md:inline">•</span>
                  <span>Joined: Jan 2023</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                  <div className="bg-gray-700/50 rounded-lg p-3 text-center">
                    <p className="text-gray-400 text-sm">Total Games</p>
                    <p className="text-xl font-bold text-white">248</p>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-3 text-center">
                    <p className="text-gray-400 text-sm">Wins</p>
                    <p className="text-xl font-bold text-green-400">156</p>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-3 text-center">
                    <p className="text-gray-400 text-sm">Balance</p>
                    <p className="text-xl font-bold text-yellow-400">₹2,450</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <div className="w-full">
          {/* Tabs Header */}
          <div className="grid grid-cols-4 md:grid-cols-7 bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden">
            {[
              { id: "games", icon: <Gamepad2 className="h-4 w-4 mr-2 md:mr-0 lg:mr-2" />, label: "My Games" },
              { id: "refer", icon: <Gift className="h-4 w-4 mr-2 md:mr-0 lg:mr-2" />, label: "Refer & Earn" },
              {
                id: "withdrawals",
                icon: <CreditCard className="h-4 w-4 mr-2 md:mr-0 lg:mr-2" />,
                label: "Withdrawals",
              },
              { id: "kyc", icon: <Shield className="h-4 w-4 mr-2 md:mr-0 lg:mr-2" />, label: "KYC Status" },
              { id: "settings", icon: <Settings className="h-4 w-4 mr-2 md:mr-0 lg:mr-2" />, label: "Settings" },
              { id: "support", icon: <HelpCircle className="h-4 w-4 mr-2 md:mr-0 lg:mr-2" />, label: "Support" },
              { id: "account", icon: <User className="h-4 w-4 mr-2 md:mr-0 lg:mr-2" />, label: "Account" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center py-2 px-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-purple-600 text-white"
                    : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                }`}
              >
                {tab.icon}
                <span className="hidden md:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="mt-6">
            {/* My Games Tab */}
            {activeTab === "games" && (
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg">
                <div className="p-4 border-b border-gray-700">
                  <h2 className="text-xl font-bold">My Games</h2>
                  <p className="text-gray-400 text-sm">View your recent match history</p>
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    {[
                      { game: "Ludo King", date: "Today, 2:30 PM", result: "Won", amount: "+₹120", status: "win" },
                      { game: "Carrom Pool", date: "Today, 12:15 PM", result: "Lost", amount: "-₹50", status: "loss" },
                      { game: "Rummy", date: "Yesterday, 8:45 PM", result: "Won", amount: "+₹200", status: "win" },
                      {
                        game: "Poker Tournament",
                        date: "Yesterday, 6:20 PM",
                        result: "Lost",
                        amount: "-₹100",
                        status: "loss",
                      },
                      { game: "Ludo King", date: "May 10, 3:15 PM", result: "Won", amount: "+₹80", status: "win" },
                    ].map((game, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                            <Gamepad2 className="h-5 w-5 text-purple-400" />
                          </div>
                          <div>
                            <p className="font-medium">{game.game}</p>
                            <p className="text-sm text-gray-400">{game.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-medium ${game.status === "win" ? "text-green-400" : "text-red-400"}`}>
                            {game.result}
                          </p>
                          <p className={`text-sm ${game.status === "win" ? "text-green-400" : "text-red-400"}`}>
                            {game.amount}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-4 py-2 px-4 border border-gray-700 rounded-md text-purple-400 hover:text-purple-300 hover:bg-gray-700/50 transition-colors">
                    View All Games
                  </button>
                </div>
              </div>
            )}

            {/* Refer & Earn Tab */}
            {activeTab === "refer" && (
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg">
                <div className="p-4 border-b border-gray-700">
                  <h2 className="text-xl font-bold">Refer & Earn</h2>
                  <p className="text-gray-400 text-sm">Invite friends and earn rewards</p>
                </div>
                <div className="p-4">
                  <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-lg p-6 mb-6">
                    <div className="flex flex-col items-center text-center">
                      <Gift className="h-12 w-12 text-yellow-400 mb-3" />
                      <h3 className="text-xl font-bold mb-2">Invite Friends & Earn ₹100</h3>
                      <p className="text-gray-300 mb-4">For each friend who joins and plays their first game</p>

                      <div className="w-full max-w-md bg-gray-900/50 rounded-lg p-3 flex items-center justify-between mb-4">
                        <code className="text-yellow-400 font-mono">GAMERX123FRIEND</code>
                        <button className="p-1 text-gray-300 hover:text-white">
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-3 w-full max-w-md">
                        <button className="py-2 px-4 bg-green-600 hover:bg-green-700 rounded-md text-white transition-colors">
                          Share on WhatsApp
                        </button>
                        <button className="py-2 px-4 border border-gray-600 rounded-md hover:bg-gray-700/50 transition-colors">
                          Copy Link
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Your Referrals</h3>

                    {[
                      { name: "Rahul S.", date: "May 10, 2023", status: "Completed", reward: "₹100" },
                      { name: "Priya M.", date: "May 8, 2023", status: "Completed", reward: "₹100" },
                      { name: "Amit K.", date: "May 5, 2023", status: "Pending", reward: "₹0" },
                    ].map((referral, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                            <User className="h-5 w-5 text-purple-400" />
                          </div>
                          <div>
                            <p className="font-medium">{referral.name}</p>
                            <p className="text-sm text-gray-400">{referral.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className={`font-medium ${
                              referral.status === "Completed" ? "text-green-400" : "text-yellow-400"
                            }`}
                          >
                            {referral.status}
                          </p>
                          <p className="text-sm text-gray-300">{referral.reward}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Withdrawals Tab */}
            {activeTab === "withdrawals" && (
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg">
                <div className="p-4 border-b border-gray-700">
                  <h2 className="text-xl font-bold">My Withdrawals</h2>
                  <p className="text-gray-400 text-sm">Track your withdrawal history</p>
                </div>
                <div className="p-4">
                  <div className="bg-gray-700/30 rounded-lg p-4 mb-6 flex flex-col sm:flex-row items-center justify-between">
                    <div>
                      <p className="text-gray-300 mb-1">Available Balance</p>
                      <p className="text-2xl font-bold text-yellow-400">₹2,450</p>
                    </div>
                    <button className="mt-3 sm:mt-0 py-2 px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-md text-white transition-colors">
                      Withdraw Funds
                    </button>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Recent Withdrawals</h3>

                    {[
                      {
                        amount: "₹1,000",
                        date: "May 8, 2023",
                        method: "UPI - user@bank",
                        status: "Completed",
                        statusColor: "text-green-400",
                      },
                      {
                        amount: "₹500",
                        date: "April 25, 2023",
                        method: "Bank Transfer",
                        status: "Completed",
                        statusColor: "text-green-400",
                      },
                      {
                        amount: "₹2,000",
                        date: "April 12, 2023",
                        method: "UPI - user@bank",
                        status: "Completed",
                        statusColor: "text-green-400",
                      },
                      {
                        amount: "₹750",
                        date: "March 30, 2023",
                        method: "Bank Transfer",
                        status: "Failed",
                        statusColor: "text-red-400",
                      },
                    ].map((withdrawal, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                            <CreditCard className="h-5 w-5 text-purple-400" />
                          </div>
                          <div>
                            <p className="font-medium">{withdrawal.amount}</p>
                            <p className="text-sm text-gray-400">{withdrawal.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-300">{withdrawal.method}</p>
                          <p className={`text-sm ${withdrawal.statusColor}`}>{withdrawal.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="w-full mt-4 py-2 px-4 border border-gray-700 rounded-md text-purple-400 hover:text-purple-300 hover:bg-gray-700/50 transition-colors">
                    View All Withdrawals
                  </button>
                </div>
              </div>
            )}

            {/* KYC Status Tab */}
            {activeTab === "kyc" && (
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg">
                <div className="p-4 border-b border-gray-700">
                  <h2 className="text-xl font-bold">KYC Verification</h2>
                  <p className="text-gray-400 text-sm">Verify your identity to unlock all features</p>
                </div>
                <div className="p-4">
                  <div className="bg-gradient-to-r from-green-900/30 to-green-800/30 border border-green-700/50 rounded-lg p-6 mb-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-full bg-green-700/50 flex items-center justify-center mb-3">
                        <Shield className="h-8 w-8 text-green-400" />
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-green-400">Verification Complete</h3>
                      <p className="text-gray-300">
                        Your account is fully verified. You can access all features and withdraw funds without limits.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Verification Details</h3>

                    <div className="grid gap-4">
                      <div className="flex justify-between p-3 bg-gray-700/30 rounded-lg">
                        <p className="text-gray-300">Identity Verification</p>
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-600 text-white">
                          Verified
                        </span>
                      </div>
                      <div className="flex justify-between p-3 bg-gray-700/30 rounded-lg">
                        <p className="text-gray-300">Address Verification</p>
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-600 text-white">
                          Verified
                        </span>
                      </div>
                      <div className="flex justify-between p-3 bg-gray-700/30 rounded-lg">
                        <p className="text-gray-300">Phone Verification</p>
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-600 text-white">
                          Verified
                        </span>
                      </div>
                      <div className="flex justify-between p-3 bg-gray-700/30 rounded-lg">
                        <p className="text-gray-300">Email Verification</p>
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-600 text-white">
                          Verified
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gray-700/30 rounded-lg">
                    <p className="text-sm text-gray-300">
                      Need to update your verification details? Please contact our support team for assistance.
                    </p>
                    <button className="text-purple-400 underline mt-1 text-sm">Contact Support</button>
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg">
                <div className="p-4 border-b border-gray-700">
                  <h2 className="text-xl font-bold">Settings</h2>
                  <p className="text-gray-400 text-sm">Manage your account preferences</p>
                </div>
                <div className="p-4 space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Notification Settings</h3>
                    <div className="space-y-4">
                      {[
                        {
                          id: "game-notifications",
                          label: "Game Invites",
                          description: "Receive notifications for game invites",
                          defaultChecked: true,
                        },
                        {
                          id: "promo-notifications",
                          label: "Promotions",
                          description: "Receive notifications about offers and bonuses",
                          defaultChecked: true,
                        },
                        {
                          id: "withdrawal-notifications",
                          label: "Withdrawals",
                          description: "Get notified about withdrawal status",
                          defaultChecked: true,
                        },
                        {
                          id: "email-notifications",
                          label: "Email Updates",
                          description: "Receive updates via email",
                          defaultChecked: false,
                        },
                      ].map((item) => (
                        <div key={item.id} className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <label htmlFor={item.id} className="text-sm font-medium">
                              {item.label}
                            </label>
                            <p className="text-sm text-gray-400">{item.description}</p>
                          </div>
                          <div className="relative inline-flex items-center">
                            <input
                              type="checkbox"
                              id={item.id}
                              defaultChecked={item.defaultChecked}
                              className="sr-only"
                              onChange={() => {}}
                            />
                            <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-700">
                    <h3 className="text-lg font-medium mb-4">Account Settings</h3>
                    <div className="space-y-4">
                      <Link
                        href="#"
                        className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50"
                      >
                        <div className="flex items-center gap-3">
                          <User className="h-5 w-5 text-purple-400" />
                          <span>Edit Profile</span>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </Link>
                      <Link
                        href="#"
                        className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50"
                      >
                        <div className="flex items-center gap-3">
                          <CreditCard className="h-5 w-5 text-purple-400" />
                          <span>Payment Methods</span>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </Link>
                      <Link
                        href="#"
                        className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50"
                      >
                        <div className="flex items-center gap-3">
                          <Shield className="h-5 w-5 text-purple-400" />
                          <span>Privacy & Security</span>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </Link>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-700">
                    <button className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 rounded-md text-white transition-colors flex items-center justify-center gap-2">
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Support Tab */}
            {activeTab === "support" && (
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg">
                <div className="p-4 border-b border-gray-700">
                  <h2 className="text-xl font-bold">Support & FAQs</h2>
                  <p className="text-gray-400 text-sm">Get help and find answers to common questions</p>
                </div>
                <div className="p-4">
                  <div className="grid gap-6">
                    <div className="bg-gray-700/30 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <HelpCircle className="h-5 w-5 text-purple-400" />
                        <h3 className="font-medium">Need Help?</h3>
                      </div>
                      <p className="text-gray-300 text-sm mb-4">
                        Our support team is available 24/7 to assist you with any issues or questions.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button className="py-2 px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-md text-white transition-colors">
                          Contact Support
                        </button>
                        <button className="py-2 px-4 border border-gray-600 rounded-md hover:bg-gray-700/50 transition-colors">
                          Live Chat
                        </button>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-3">Frequently Asked Questions</h3>
                      <div className="space-y-2">
                        {[
                          {
                            id: "item-1",
                            question: "How do I withdraw my winnings?",
                            answer:
                              "To withdraw your winnings, go to the Withdrawals tab in your profile, enter the amount you wish to withdraw, select your preferred payment method, and follow the instructions. Withdrawals are typically processed within 24-48 hours.",
                          },
                          {
                            id: "item-2",
                            question: "What is KYC verification and why is it required?",
                            answer:
                              "KYC (Know Your Customer) verification is a process that verifies your identity. It's required by regulations to prevent fraud and ensure the platform is used legally. You'll need to provide valid ID proof and address verification to complete KYC.",
                          },
                          {
                            id: "item-3",
                            question: "How does the referral program work?",
                            answer:
                              "Our referral program allows you to earn ₹100 for each friend who joins using your referral code and plays their first game. There's no limit to how many friends you can refer, and the rewards are credited directly to your account balance.",
                          },
                          {
                            id: "item-4",
                            question: "Is it safe to play games on this platform?",
                            answer:
                              "Yes, our platform uses advanced security measures to protect your data and ensure fair gameplay. All games are regularly audited by independent agencies to verify their fairness and randomness. Your financial transactions are secured with industry-standard encryption.",
                          },
                          {
                            id: "item-5",
                            question: "What payment methods are accepted?",
                            answer:
                              "We accept various payment methods including UPI, credit/debit cards, net banking, and popular e-wallets. For withdrawals, you can use UPI, bank transfers, or select e-wallets depending on your location.",
                          },
                        ].map((item) => (
                          <div key={item.id} className="border-b border-gray-700 last:border-0">
                            <button
                              onClick={() => toggleAccordion(item.id)}
                              className="flex w-full items-center justify-between py-3 text-left font-medium hover:text-purple-400 transition-colors"
                            >
                              {item.question}
                              <ChevronDown
                                className={`h-4 w-4 transition-transform ${
                                  openAccordion === item.id ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            {openAccordion === item.id && (
                              <div className="pb-3 text-gray-300 text-sm">{item.answer}</div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-4">
                      <h3 className="font-semibold text-lg">Helpful Resources</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Link
                          href="#"
                          className="flex items-center gap-2 p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50"
                        >
                          <div className="text-purple-400">
                            <ExternalLink className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">Game Rules</p>
                            <p className="text-sm text-gray-400">Learn how to play</p>
                          </div>
                        </Link>
                        <Link
                          href="#"
                          className="flex items-center gap-2 p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50"
                        >
                          <div className="text-purple-400">
                            <ExternalLink className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">Terms & Conditions</p>
                            <p className="text-sm text-gray-400">Platform policies</p>
                          </div>
                        </Link>
                        <Link
                          href="#"
                          className="flex items-center gap-2 p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50"
                        >
                          <div className="text-purple-400">
                            <ExternalLink className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">Responsible Gaming</p>
                            <p className="text-sm text-gray-400">Play safely</p>
                          </div>
                        </Link>
                        <Link
                          href="#"
                          className="flex items-center gap-2 p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50"
                        >
                          <div className="text-purple-400">
                            <ExternalLink className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">Video Tutorials</p>
                            <p className="text-sm text-gray-400">Visual guides</p>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Account Tab */}
            {activeTab === "account" && (
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg">
                <div className="p-4 border-b border-gray-700">
                  <h2 className="text-xl font-bold">Account Information</h2>
                  <p className="text-gray-400 text-sm">View and update your account details</p>
                </div>
                <div className="p-4">
                  <div className="space-y-6">
                    <div className="grid gap-4">
                      <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
                        <div>
                          <p className="text-sm text-gray-400">Username</p>
                          <p>GamerX123</p>
                        </div>
                        <button className="text-purple-400 hover:text-purple-300 p-2">Edit</button>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
                        <div>
                          <p className="text-sm text-gray-400">Email</p>
                          <p>gamer.x123@example.com</p>
                        </div>
                        <button className="text-purple-400 hover:text-purple-300 p-2">Edit</button>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
                        <div>
                          <p className="text-sm text-gray-400">Phone</p>
                          <p>+91 98765 43210</p>
                        </div>
                        <button className="text-purple-400 hover:text-purple-300 p-2">Edit</button>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
                        <div>
                          <p className="text-sm text-gray-400">Date of Birth</p>
                          <p>15 Jan 1995</p>
                        </div>
                        <button className="text-purple-400 hover:text-purple-300 p-2">Edit</button>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-700">
                      <h3 className="font-semibold text-lg mb-4">Account Security</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
                          <div>
                            <p className="font-medium">Change Password</p>
                            <p className="text-sm text-gray-400">Last updated 30 days ago</p>
                          </div>
                          <button className="py-1 px-3 text-sm border border-gray-600 rounded-md hover:bg-gray-700/50 transition-colors">
                            Update
                          </button>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
                          <div>
                            <p className="font-medium">Two-Factor Authentication</p>
                            <p className="text-sm text-gray-400">Enhanced account security</p>
                          </div>
                          <button className="py-1 px-3 text-sm border border-gray-600 rounded-md hover:bg-gray-700/50 transition-colors">
                            Enable
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-700">
                      <h3 className="font-semibold text-lg mb-4">Linked Accounts</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                              <span className="text-white font-bold">f</span>
                            </div>
                            <p>Facebook</p>
                          </div>
                          <button className="py-1 px-3 text-sm border border-gray-600 rounded-md hover:bg-gray-700/50 transition-colors">
                            Connect
                          </button>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center">
                              <span className="text-white font-bold">t</span>
                            </div>
                            <p>Twitter</p>
                          </div>
                          <button className="py-1 px-3 text-sm border border-gray-600 rounded-md hover:bg-gray-700/50 transition-colors">
                            Connect
                          </button>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center">
                              <span className="text-white font-bold">G</span>
                            </div>
                            <div>
                              <p>Google</p>
                              <p className="text-sm text-green-400">Connected</p>
                            </div>
                          </div>
                          <button className="py-1 px-3 text-sm border border-gray-600 rounded-md hover:bg-gray-700/50 transition-colors">
                            Disconnect
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-700">
                      <button className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 rounded-md text-white transition-colors">
                        Delete Account
                      </button>
                      <p className="text-xs text-gray-400 text-center mt-2">
                        This action is permanent and cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
