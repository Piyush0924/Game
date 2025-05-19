
"use client"

import { Heart, MessageCircle, Trophy, X, UserPlus } from "lucide-react"

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
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 fade-in">
      {/* Global styles */}
      <style jsx>{`
        /* Glossy dark glassmorphism */
        .glossy-dark {
          background: linear-gradient(135deg, rgba(17, 24, 39, 0.9), rgba(49, 46, 129, 0.8));
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }

        /* Button glossy effect */
        .btn-glossy {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          background: linear-gradient(45deg, rgba(99, 102, 241, 0.8), rgba(168, 85, 247, 0.8));
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .btn-glossy:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
        }

        .btn-glossy::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: all 0.5s ease;
        }

        .btn-glossy:hover::after {
          left: 100%;
        }

        /* Card hover effects */
        .card-hover {
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .card-hover:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 20px rgba(99, 102, 241, 0.2);
          border-color: rgba(99, 102, 241, 0.3);
        }

        /* Fade-in animation */
        .fade-in {
          animation: fadeIn 0.3s ease forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Slide-down animation */
        .slide-down {
          animation: slideDown 0.3s ease forwards;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Responsive styles */
        @media (max-width: 640px) {
          .modal-content {
            width: 100% !important;
            height: 100% !important;
            padding: 12px !important;
          }

          .modal-body {
            font-size: 14px !important;
          }

          .btn-glossy {
            padding: 8px 12px !important;
            font-size: 12px !important;
          }
        }
      `}</style>

      <div className="modal-content slide-down glossy-dark w-full h-full overflow-hidden">
        <div className="modal-header flex justify-between items-center p-4 border-b border-indigo-900">
          <h3 className="font-bold text-indigo-100">Profile</h3>
          <button
            onClick={closeProfileModal}
            className="text-indigo-100 hover:text-pink-400 p-1 rounded-full hover:bg-indigo-900 transition-colors duration-300"
            aria-label="Close profile"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="modal-body p-6 overflow-y-auto h-[calc(100%-4rem)]">
          {/* User Info */}
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={user.avatar || "/bgmi.jpg"}
              alt={`${user.name}'s avatar`}
              className="w-16 h-16 rounded-full border-2 border-indigo-200 glow transition-all duration-300 hover:scale-110"
            />
            <div className="flex flex-row gap-7">
              <h3 className="font-bold text-lg text-indigo-100">{user.name}</h3>
              <p className="text-indigo-100 font-medium pt-1">Level: {getUserLevel(getUserXP(userId))}</p>
              {toggleFollow && (
                <button
                  onClick={() => toggleFollow(userId)}
                  className={`btn-glossy flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium text-indigo-100 transition-all duration-300 hover:bg-gradient-to-r hover:from-pink-500 hover:to-rose-500`}
                  aria-label={isFollowing(userId) ? "Unfollow user" : "Follow user"}
                  aria-pressed={isFollowing(userId)}
                >
                  <UserPlus size={14} />
                  <span>{isFollowing(userId) ? "Unfollow" : "Follow"}</span>
                </button>
              )}
            </div>
          </div>

          {/* Player Stats */}
          <div className="mb-6">
            <h4 className="font-medium mb-3 text-indigo-100 border-b border-indigo-900 pb-1 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1 text-indigo-100"
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
                <div className="card-hover bg-indigo-900 p-3 rounded-lg">
                  <div className="text-sm text-indigo-100 mb-1">Matches Played</div>
                  <div className="font-bold text-lg text-indigo-100">{playerStats[userId].matchesPlayed}</div>
                </div>
                <div className="card-hover bg-green-900 p-3 rounded-lg">
                  <div className="text-sm text-indigo-100 mb-1">Wins</div>
                  <div className="font-bold text-lg text-green-400">{playerStats[userId].wins}</div>
                </div>
                <div className="card-hover bg-red-900 p-3 rounded-lg">
                  <div className="text-sm text-indigo-100 mb-1">Losses</div>
                  <div className="font-bold text-lg text-red-400">{playerStats[userId].losses}</div>
                </div>
                <div className="card-hover bg-indigo-900 p-3 rounded-lg">
                  <div className="text-sm text-indigo-100 mb-1">Win Rate</div>
                  <div className="font-bold text-lg text-indigo-200">{playerStats[userId].winRate}</div>
                </div>
                <div className="card-hover bg-yellow-900 p-3 rounded-lg">
                  <div className="text-sm text-indigo-100 mb-1">Best Score</div>
                  <div className="font-bold text-lg text-yellow-400">{playerStats[userId].bestScore}</div>
                </div>
                <div className="card-hover bg-purple-900 p-3 rounded-lg">
                  <div className="text-sm text-indigo-100 mb-1">Rank</div>
                  <div className="font-bold text-lg text-purple-400">{playerStats[userId].rank}</div>
                </div>
              </div>
            ) : (
              <p className="text-indigo-100">No stats available</p>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-2 justify-between mt-6 border-t border-indigo-900 pt-4">
              <button
                onClick={() => startChat(userId)}
                className="btn-glossy px-14 py-2 text-indigo-100 rounded-lg text-sm transition-all duration-300 flex items-center"
              >
                <MessageCircle className="h-4 w-4 mr-1" /> Chat
              </button>
              <button
                onClick={() => inviteToGame(userId)}
                className="btn-glossy px-14 py-2 text-indigo-100 rounded-lg text-sm transition-all duration-300 flex items-center"
              >
                <Trophy className="h-4 w-4 mr-1" /> Invite
              </button>
            </div>
          </div>

          {/* Achievements */}
          <div className="mb-6">
            <h4 className="font-medium mb-3 text-indigo-100 border-b border-indigo-900 pb-1 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1 text-indigo-100"
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
                        className="card-hover bg-indigo-900 rounded-lg p-3 flex flex-col items-center justify-center"
                      >
                        <div
                          className={`text-2xl mb-2 ${achievementCategories.find((c) => c.id === achievement.category)?.color.replace("bg-", "text-")}`}
                        >
                          {achievement.icon}
                        </div>
                        <p className="text-sm font-medium text-indigo-100 text-center">{achievement.name}</p>
                        <p className="text-xs text-indigo-200 text-center mt-1">{achievement.description}</p>
                      </div>
                    )
                  )
                })}
              </div>
            ) : (
              <p className="text-indigo-100">No achievements yet</p>
            )}
          </div>

          {/* Gaming History */}
          <div className="mb-6">
            <h4 className="font-medium mb-3 text-indigo-100 border-b border-indigo-900 pb-1 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1 text-indigo-100"
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
              <div className="card-hover bg-indigo-900 p-3 rounded-lg flex justify-between items-center">
                <div>
                  <div className="text-sm font-medium text-indigo-100">Chess Match</div>
                  <div className="text-xs text-indigo-200">
                    vs. {users[Math.floor(Math.random() * users.length)]?.name}
                  </div>
                </div>
                <div className="text-sm font-bold text-green-400 bg-green-900 px-3 py-1 rounded-full">Won</div>
              </div>
              <div className="card-hover bg-indigo-900 p-3 rounded-lg flex justify-between items-center">
                <div>
                  <div className="text-sm font-medium text-indigo-100">Poker Tournament</div>
                  <div className="text-xs text-indigo-200">8 players</div>
                </div>
                <div className="text-sm font-bold text-amber-400 bg-amber-900 px-3 py-1 rounded-full">3rd Place</div>
              </div>
              <div className="card-hover bg-indigo-900 p-3 rounded-lg flex justify-between items-center">
                <div>
                  <div className="text-sm font-medium text-indigo-100">Racing Challenge</div>
                  <div className="text-xs text-indigo-200">Time Trial</div>
                </div>
                <div className="text-sm font-bold text-blue-400 bg-blue-900 px-3 py-1 rounded-full">New Record</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
