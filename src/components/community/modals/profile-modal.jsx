"use client"

import { Heart, MessageCircle, Trophy, X } from "lucide-react"

export default function ProfileModal({
  userId,
  users,
  playerStats,
  userBadges,
  achievements,
  closeProfileModal,
  startChat,
  toggleFollow,
  isFollowing,
  inviteToGame,
  getUserLevel,
  getUserXP,
}) {
  const user = users.find((u) => u.id === userId) || { name: "Unknown User", avatar: "/placeholder.svg" }
  const achievementCategories = [
    { id: 1, name: "Victories", icon: "🏆", color: "bg-yellow-500" },
    { id: 2, name: "Social", icon: "👥", color: "bg-blue-500" },
    { id: 3, name: "Skills", icon: "⚔️", color: "bg-purple-500" },
    { id: 4, name: "Events", icon: "🎪", color: "bg-green-500" },
    { id: 5, name: "Collector", icon: "💎", color: "bg-pink-500" },
  ]

  // Get achievement by ID
  const getAchievementById = (id) => {
    return achievements.find((a) => a.id === id)
  }

  return (
    <div className="width-full fixed inset-0 bg-black/100 flex items-center justify-center z-50 fade-in">
      <div className="modal-content glass slide-down bg-gray-800  rounded-xl shadow-xl w-full max-w-md overflow-hidden mt-[3rem]">
        <div className="modal-header flex justify-between items-center p-4 border-b">
          <h3 className="font-semibold text-indigo-800"></h3>
          <button
            onClick={closeProfileModal}
            className="text-gray-500 hover:text-red-500 p-1 rounded-full hover:bg-gray-100 transition-colors duration-300"
            aria-label="Close profile"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="modal-body">
          {/* User Info */}
          <div className="flex items-center space-x-4 mb-6 relative">
            <img
              src={user.avatar || "/bgmi.jpg"}
              alt=""
              className="w-16 h-16 rounded-full border-2 border-indigo-100 glow transition-all duration-300 hover:scale-110"
            />
            <div>
              <h3 className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                {user.name}
              </h3>
              <p className="text-indigo-600 font-medium">Level: {getUserLevel(getUserXP(userId))}</p>
            </div>
          </div>

          {/* Player Stats */}
          <div className="mb-6">
            <h4 className="font-medium mb-3 text-indigo-700 border-b pb-1 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              Player Statistics
            </h4>
            {playerStats[userId] ? (
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-50 p-3 rounded-lg hover:shadow-md transition-all duration-300 hover:bg-gray-100 transform hover:scale-105">
                  <div className="text-xs text-gray-500 mb-1">Matches Played</div>
                  <div className="font-bold text-lg">{playerStats[userId].matchesPlayed}</div>
                </div>

                <div className="bg-green-50 p-3 rounded-lg hover:shadow-md transition-all duration-300 hover:bg-green-100 transform hover:scale-105">
                  <div className="text-xs text-gray-500 mb-1">Wins</div>
                  <div className="font-bold text-lg text-green-600">{playerStats[userId].wins}</div>
                </div>
                <div className="bg-red-50 p-3 rounded-lg hover:shadow-md transition-all duration-300 hover:bg-red-100 transform hover:scale-105">
                  <div className="text-xs text-gray-500 mb-1">Losses</div>
                  <div className="font-bold text-lg text-red-600">{playerStats[userId].losses}</div>
                </div>
                <div className="bg-indigo-50 p-3 rounded-lg hover:shadow-md transition-all duration-300 hover:bg-indigo-100 transform hover:scale-105">
                  <div className="text-xs text-gray-500 mb-1">Win Rate</div>
                  <div className="font-bold text-lg text-indigo-600">{playerStats[userId].winRate}</div>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg hover:shadow-md transition-all duration-300 hover:bg-yellow-100 transform hover:scale-105">
                  <div className="text-xs text-gray-500 mb-1">Best Score</div>
                  <div className="font-bold text-lg text-yellow-600">{playerStats[userId].bestScore}</div>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg hover:shadow-md transition-all duration-300 hover:bg-purple-100 transform hover:scale-105">
                  <div className="text-xs text-gray-500 mb-1">Rank</div>
                  <div className="font-bold text-lg text-purple-600">{playerStats[userId].rank}</div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No stats available</p>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-2 justify-between mt-6 border-t pt-4">
              <button
                onClick={() => startChat(userId)}
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg text-sm hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 flex items-center transform hover:scale-105 btn-animated"
              >
                <MessageCircle className="h-4 w-4 mr-1" /> Chat
              </button>
              <button
                onClick={() => toggleFollow(userId)}
                className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 flex items-center transform hover:scale-105 ${
                  isFollowing(userId)
                    ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    : "bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600"
                }`}
              >
                {isFollowing(userId) ? (
                  <>
                    <X className="h-4 w-4 mr-1" /> Unfollow
                  </>
                ) : (
                  <>
                    <Heart className="h-4 w-4 mr-1" /> Follow
                  </>
                )}
              </button>
              <button
                onClick={() => inviteToGame(userId)}
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg text-sm hover:from-green-600 hover:to-emerald-600 transition-all duration-300 flex items-center transform hover:scale-105 btn-animated"
              >
                <Trophy className="h-4 w-4 mr-1" /> Invite
              </button>
            </div>
          </div>

          {/* Achievements */}
          <div className="mb-6">
            <h4 className="font-medium mb-3 text-indigo-700 border-b pb-1 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
              Achievements
            </h4>
            {userBadges[userId] && userBadges[userId].length > 0 ? (
              <div className="grid grid-cols-3 gap-3">
                {userBadges[userId].map((achievementId) => {
                  const achievement = getAchievementById(achievementId)
                  return (
                    achievement && (
                      <div
                        key={achievement.id}
                        className="bg-gray-50 rounded-lg p-3 flex flex-col items-center justify-center hover:bg-gray-100 transition-all duration-300 transform hover:scale-110 hover:shadow-md"
                      >
                        <div
                          className={`text-2xl mb-2 ${achievementCategories.find((c) => c.id === achievement.category)?.color.replace("bg-", "text-")}`}
                        >
                          {achievement.icon}
                        </div>
                        <p className="text-xs font-medium text-center">{achievement.name}</p>
                        <p className="text-xs text-gray-500 text-center mt-1">{achievement.description}</p>
                      </div>
                    )
                  )
                })}
              </div>
            ) : (
              <p className="text-gray-500">No achievements yet</p>
            )}
          </div>

          {/* Gaming History */}
          <div className="mb-6">
            <h4 className="font-medium mb-3 text-indigo-700 border-b pb-1 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Recent Activity
            </h4>
            <div className="space-y-3">
              <div className="bg-gray-50 p-3 rounded-lg flex justify-between items-center hover:shadow-md transition-all duration-300 transform hover:scale-105 hover:bg-green-50">
                <div>
                  <div className="text-sm font-medium">Chess Match</div>
                  <div className="text-xs text-gray-500">
                    vs. {users[Math.floor(Math.random() * users.length)]?.name}
                  </div>
                </div>
                <div className="text-sm font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">Won</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg flex justify-between items-center hover:shadow-md transition-all duration-300 transform hover:scale-105 hover:bg-amber-50">
                <div>
                  <div className="text-sm font-medium">Poker Tournament</div>
                  <div className="text-xs text-gray-500">8 players</div>
                </div>
                <div className="text-sm font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">3rd Place</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg flex justify-between items-center hover:shadow-md transition-all duration-300 transform hover:scale-105 hover:bg-blue-50">
                <div>
                  <div className="text-sm font-medium">Racing Challenge</div>
                  <div className="text-xs text-gray-500">Time Trial</div>
                </div>
                <div className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">New Record</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
