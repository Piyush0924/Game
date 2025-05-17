"use client"

import { useState, useEffect } from "react"
import CommunityHeader from "./community-header"
import NavigationIcons from "./navigation-icons"
import CreatePostCard from "./create-post-card"
import PostsFeed from "./posts-feed"
import UserRankings from "./user-rankings"
import AchievementsSection from "./achievements-section"
import MessagesSection from "./messages-section"
import SettingsSection from "./settings-section"
import EventsSection from "./events-section"
import UserListSection from "./user-list-section"
import ProfileModal from "./modals/profile-modal"
import ChatModal from "./modals/chat-modal"
import GameInviteModal from "./modals/game-invite-modal"
import PollCreatorModal from "./modals/poll-creator-modal"
import TagPeopleModal from "./modals/tag-people-modal"
import SchedulerModal from "./modals/scheduler-modal"
import CreateEventModal from "./modals/create-event-modal"
import CreateAnnouncementModal from "./modals/create-annoucement-modals" // Fixed typo in import
import { Menu, X } from "lucide-react"
import { useCommunityData } from "./useCommunityData"

export default function CommunityPage() {
  const {
    users,
    filteredUsers,
    posts,
    playerStats,
    achievements,
    events,
    announcements,
    userBadges,
    gameOptions,
    chats,
    search, // Added for search functionality
    addPostComment,
    toggleLikePost,
    createPost,
    sendGameInvite,
    toggleFollow,
    isFollowing,
    startChat,
    sendChatMessage,
    formatDate,
    getUserLevel,
    getUserXP,
  } = useCommunityData()

  // UI state
  const [activeSection, setActiveSection] = useState("home")
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showUserList, setShowUserList] = useState(false)
  const [isHubVisible, setIsHubVisible] = useState(true) // Control Community Hub visibility

  // Modal states
  const [viewingProfile, setViewingProfile] = useState(null)
  const [activeChatUser, setActiveChatUser] = useState(null)
  const [showGameInvite, setShowGameInvite] = useState(false)
  const [inviteUserId, setInviteUserId] = useState(null)
  const [showPollCreator, setShowPollCreator] = useState(false)
  const [showTagPeople, setShowTagPeople] = useState(false)
  const [showScheduler, setShowScheduler] = useState(false)
  const [showCreateEvent, setShowCreateEvent] = useState(false)
  const [showCreateAnnouncement, setShowCreateAnnouncement] = useState(false)

  // Inactivity timer (from previous requirement)
  useEffect(() => {
    const currentUser = users.find((u) => u.id === 1) // Assuming user ID 1 is the current user
    if (!currentUser?.isOnline) {
      setIsHubVisible(true)
      return
    }

    let inactivityTimeout

    const resetTimer = () => {
      setIsHubVisible(true)
      clearTimeout(inactivityTimeout)
      inactivityTimeout = setTimeout(() => {
        setIsHubVisible(false)
      }, 5 * 60 * 1000) // 5 minutes
    }

    const events = ["mousemove", "click", "keypress"]
    events.forEach((event) => window.addEventListener(event, resetTimer))

    resetTimer()

    return () => {
      clearTimeout(inactivityTimeout)
      events.forEach((event) => window.removeEventListener(event, resetTimer))
    }
  }, [users])

  // Handle profile click
  const handleProfileClick = (userId) => {
    setViewingProfile(userId)
  }

  // Close profile modal
  const closeProfileModal = () => {
    setViewingProfile(null)
  }

  // Close chat
  const closeChat = () => {
    setActiveChatUser(null)
  }

  // Invite to game
  const inviteToGame = (userId) => {
    setInviteUserId(userId)
    setShowGameInvite(true)
  }

  // Wrapper for createPost with error handling
  const handleCreatePost = async (postData) => {
    try {
      await createPost(postData)
    } catch (error) {
      console.error("Error creating post:", error)
      alert("Failed to create post. Please try again.")
    }
  }

  // Wrapper for sendGameInvite with error handling
  const handleSendGameInvite = async (userId, gameId) => {
    try {
      await sendGameInvite(userId, gameId)
    } catch (error) {
      console.error("Error sending game invite:", error)
      throw error
    }
  }

  // Wrapper for sendChatMessage with error handling
  const handleSendChatMessage = async (userId, message) => {
    try {
      await sendChatMessage(userId, message)
    } catch (error) {
      console.error("Error sending chat message:", error)
      alert("Failed to send message. Please try again.")
    }
  }

  return (
    <div className="h-[100vh] bg-gradient-to-br from-blue-200 via-blue-900  to-white transition-all duration-500">
      {/* Global styles */}
      <style jsx>{`
        /* Card hover effects */
        .card-hover {
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
        }
        
        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(99, 102, 241, 0.15);
          border-color: rgba(99, 102, 241, 0.3);
        }

        /* Button animations */
        .btn-animated {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .btn-animated:after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: all 0.5s ease;
        }

        .btn-animated:hover:after {
          left: 100%;
        }

        /* Icon animations */
        .icon-animated {
          transition: all 0.3s ease;
        }
        
        .icon-animated:hover {
          transform: scale(1.2);
          color: #6366f1;
        }

        /* Pulse animation for notifications */
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        
        .pulse {
          animation: pulse 1.5s infinite;
        }

        /* Fade in animation */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .fade-in {
          animation: fadeIn 0.5s ease forwards;
        }

        /* Fade out animation */
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; display: none; }
        }
        
        .fade-out {
          animation: fadeOut 0.5s ease forwards;
        }

        /* Slide down animation for modals */
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .slide-down {
          animation: slideDown 0.3s ease forwards;
        }

        /* Responsive styles for navigation icons */
        @media (max-width: 640px) {
          .icon-nav {
            overflow-x: auto;
            padding-bottom: 8px;
            -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
          }
          
          .icon-nav::-webkit-scrollbar {
            height: 3px;
          }
          
          .icon-nav::-webkit-scrollbar-thumb {
            background-color: rgba(156, 163, 175, 0.5);
            border-radius: 3px;
          }
          
          .icon-button {
            min-width: 50px; /* Reduced from 60px for mobile */
          }
        }

        /* Responsive styles for modals */
        @media (max-width: 640px) {
          .modal-container {
            width: 90% !important; /* Override default width */
            max-height: 80vh !important; /* Ensure it fits on mobile */
            padding: 12px !important; /* Reduced padding */
            font-size: 14px !important; /* Smaller font size */
          }

          .modal-content {
            padding: 8px !important; /* Reduced padding for content */
          }

          .modal-header {
            font-size: 16px !important; /* Smaller header */
          }
        }

        /* Shimmer effect for loading states */
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        .shimmer {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }

        /* Glow effect for important elements */
        .glow {
          box-shadow: 0 0 15px rgba(99, 102, 241, 0.5);
          transition: box-shadow 0.3s ease;
        }
        
        .glow:hover {
          box-shadow: 0 0 20px rgba(99, 102, 241, 0.8);
        }

        /* Notification dot */
        .notification-dot {
          position: absolute;
          top: -2px;
          right: -2px;
          width: 8px;
          height: 8px;
          background-color: #ef4444;
          border-radius: 50%;
          border: 1px solid white;
        }
        
        /* Icon button hover effects */
        .icon-button {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        
        .icon-button::after {
          content: '';
          position: absolute;
          bottom: -4px;
          width: 0;
          height: 2px;
          background-color: #6366f1;
          transition: width 0.3s ease;
        }
        
        .icon-button:hover::after {
          width: 70%;
        }

        /* Glass morphism effect */
        .glass {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
        }
      `}</style>

      {/* Community Hub (Main Container) */}
      <div
        className={`h-[100vh] max-w-md mx-auto p-3 pb-16 sm:pb-12 md:pb-4 mt-3 sm:mt-2 glass rounded-2xl bg-gradient-to-br from-blue-500/80 via-slate-900/80 to-blue-950/80 transition-opacity duration-500 ${
          isHubVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Community Hub Header with Search */}
        <CommunityHeader search={search} />

        {/* Navigation Icons */}
        <NavigationIcons
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          setShowUserList={setShowUserList}
          showUserList={showUserList}
        />

        {/* Create Post Section - Always at the top */}
        <CreatePostCard
          createPost={handleCreatePost}
          setShowPollCreator={setShowPollCreator}
          setShowTagPeople={setShowTagPeople}
          setShowScheduler={setShowScheduler}
        />

        {/* Main Content Area - Changes based on active section */}
        {activeSection === "home" && (
          <PostsFeed
            posts={posts}
            users={users}
            toggleLikePost={toggleLikePost}
            addPostComment={addPostComment}
            handleProfileClick={handleProfileClick}
            startChat={startChat}
            formatDate={formatDate}
          />
        )}

        {activeSection === "topCoins" && (
          <UserRankings users={users} rankingType="coins" handleProfileClick={handleProfileClick} />
        )}

        {activeSection === "topFollowers" && (
          <UserRankings users={users} rankingType="followers" handleProfileClick={handleProfileClick} />
        )}

        {activeSection === "achievements" && <AchievementsSection achievements={achievements} />}

        {activeSection === "messages" && <MessagesSection users={users} startChat={startChat} />}

        {activeSection === "settings" && <SettingsSection />}

        {activeSection === "events" && (
          <EventsSection events={events} users={users} setShowCreateEvent={setShowCreateEvent} />
        )}

        {/* User List */}
        {showUserList && (
          <UserListSection
            users={filteredUsers || users}
            startChat={startChat}
            toggleFollow={toggleFollow}
            isFollowing={isFollowing}
          />
        )}

        {/* Modals */}
        {viewingProfile && (
          <ProfileModal
            userId={viewingProfile}
            users={users}
            playerStats={playerStats}
            userBadges={userBadges}
            achievements={achievements}
            closeProfileModal={closeProfileModal}
            startChat={startChat}
            toggleFollow={toggleFollow}
            isFollowing={isFollowing}
            inviteToGame={inviteToGame}
            getUserLevel={getUserLevel}
            getUserXP={getUserXP}
            className="modal-container" // Add responsive class
          />
        )}

        {activeChatUser && (
          <ChatModal
            activeChatUser={activeChatUser}
            users={users}
            chats={chats}
            closeChat={closeChat}
            sendChatMessage={handleSendChatMessage}
            formatDate={formatDate}
            className="modal-container" // Add responsive class
          />
        )}

        {showGameInvite && (
          <GameInviteModal
            inviteUserId={inviteUserId}
            gameOptions={gameOptions}
            sendGameInvite={handleSendGameInvite}
            setShowGameInvite={setShowGameInvite}
            className="modal-container" // Add responsive class
          />
        )}

        {showPollCreator && (
          <PollCreatorModal setShowPollCreator={setShowPollCreator} className="modal-container" />
        )}

        {showTagPeople && (
          <TagPeopleModal users={users} setShowTagPeople={setShowTagPeople} className="modal-container" />
        )}

        {showScheduler && (
          <SchedulerModal
            users={users}
            gameOptions={gameOptions}
            setShowScheduler={setShowScheduler}
            className="modal-container"
          />
        )}

        {showCreateEvent && (
          <CreateEventModal
            users={users}
            events={events}
            setShowCreateEvent={setShowCreateEvent}
            className="modal-container"
          />
        )}

        {showCreateAnnouncement && (
          <CreateAnnouncementModal
            users={users}
            announcements={announcements}
            setShowCreateAnnouncement={setShowCreateAnnouncement}
            className="modal-container"
          />
        )}
      </div>

     
    </div>
  )
}