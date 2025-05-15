"use client"

import { useEffect, useState, useRef } from "react"
import { Users, Coins, Award, MessageSquare, Bell, Trophy, Heart, MessageCircle, Home, Settings, X } from "lucide-react"

export default function CommunityPage() {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [comments, setComments] = useState({})
  const [rankingType, setRankingType] = useState("daily")
  const [searchQuery, setSearchQuery] = useState("")
  const [viewingProfile, setViewingProfile] = useState(null)
  const [playerStats, setPlayerStats] = useState({})
  const [activeChatUser, setActiveChatUser] = useState(null)
  const [chatMessages, setChatMessages] = useState({})
  const [currentMessage, setCurrentMessage] = useState("")
  const [posts, setPosts] = useState([])
  const [newPostContent, setNewPostContent] = useState("")
  const [postComments, setPostComments] = useState({})
  const [newPostComment, setNewPostComment] = useState({})
  const chatEndRef = useRef(null)
  const [followedUsers, setFollowedUsers] = useState({})
  const [giftMenuOpen, setGiftMenuOpen] = useState(null)
  const [userGifts, setUserGifts] = useState({})
  const [selectedFile, setSelectedFile] = useState(null)
  const [userFiles, setUserFiles] = useState({})
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef(null)

  // New state variables for notifications, emails, and game invitations
  const [notifications, setNotifications] = useState([])
  const [unreadNotifications, setUnreadNotifications] = useState(0)
  const [showNotifications, setShowNotifications] = useState(false)
  const [gameInvitations, setGameInvitations] = useState([])
  const [showGameInvite, setShowGameInvite] = useState(false)
  const [inviteUserId, setInviteUserId] = useState(null)
  const [gameOptions, setGameOptions] = useState([
    { id: 1, name: "Chess", icon: "♟️" },
    { id: 2, name: "Poker", icon: "🃏" },
    { id: 3, name: "Racing", icon: "🏎️" },
    { id: 4, name: "Puzzle", icon: "🧩" },
    { id: 5, name: "Shooter", icon: "🎯" },
  ])
  const [selectedGame, setSelectedGame] = useState(null)

  // Add achievement/badge system state variables
  const [achievements, setAchievements] = useState([])
  const [userBadges, setUserBadges] = useState({})
  const [showAchievements, setShowAchievements] = useState(false)
  const [newAchievements, setNewAchievements] = useState(0)
  const [achievementCategories, setAchievementCategories] = useState([
    { id: 1, name: "Victories", icon: "🏆", color: "bg-yellow-500" },
    { id: 2, name: "Social", icon: "👥", color: "bg-blue-500" },
    { id: 3, name: "Skills", icon: "⚔️", color: "bg-purple-500" },
    { id: 4, name: "Events", icon: "🎪", color: "bg-green-500" },
    { id: 5, name: "Collector", icon: "💎", color: "bg-pink-500" },
  ])

  // Active section state
  const [activeSection, setActiveSection] = useState("home")

  // Gift options
  const gifts = [
    { id: 1, name: "Trophy", emoji: "🏆", value: 50 },
    { id: 2, name: "Star", emoji: "⭐", value: 20 },
    { id: 3, name: "Heart", emoji: "❤️", value: 10 },
    { id: 4, name: "Rocket", emoji: "🚀", value: 30 },
    { id: 5, name: "Diamond", emoji: "💎", value: 100 },
  ]

  const [screenshotPreview, setScreenshotPreview] = useState(null)
  const [showPollCreator, setShowPollCreator] = useState(false)
  const [pollQuestion, setPollQuestion] = useState("")
  const [pollOptions, setPollOptions] = useState(["", ""])
  const [allowMultipleVotes, setAllowMultipleVotes] = useState(false)
  const [hasPoll, setHasPoll] = useState(false)
  const [showTagPeople, setShowTagPeople] = useState(false)
  const [taggedPeople, setTaggedPeople] = useState([])
  const [tagSearchQuery, setTagSearchQuery] = useState("")
  const [showScheduler, setShowScheduler] = useState(false)
  const [scheduleDate, setScheduleDate] = useState("")
  const [scheduleTime, setScheduleTime] = useState("")
  const [isScheduled, setIsScheduled] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showUserList, setShowUserList] = useState(false)

  // Dummy function for toggleLikePost
  const toggleLikePost = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          if (post.likes.includes(1)) {
            // Assuming user ID 1 is the current user
            return { ...post, likes: post.likes.filter((userId) => userId !== 1) }
          } else {
            return { ...post, likes: [...post.likes, 1] }
          }
        }
        return post
      }),
    )
  }

  // Dummy function for addPostComment
  const addPostComment = (postId) => {
    if (!newPostComment[postId]?.trim()) return

    const newComment = {
      id: (postComments[postId]?.length || 0) + 1,
      userId: 1, // Assuming current user is ID 1
      content: newPostComment[postId],
      timestamp: new Date().toISOString(),
    }

    setPostComments((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComment],
    }))

    setNewPostComment((prev) => ({ ...prev, [postId]: "" }))
  }

  useEffect(() => {
    // Dummy data, replace with real API
    const dummyUsers = [
      { id: 1, name: "Alice", avatar: "https://i.pravatar.cc/100?img=1", followers: 1200, coins: 560, isOnline: true },
      { id: 2, name: "Bob", avatar: "https://i.pravatar.cc/100?img=2", followers: 900, coins: 480, isOnline: false },
      { id: 3, name: "Charlie", avatar: "https://i.pravatar.cc/100?img=3", followers: 300, coins: 250, isOnline: true },
      { id: 4, name: "David", avatar: "https://i.pravatar.cc/100?img=4", followers: 2200, coins: 720, isOnline: false },
      { id: 5, name: "Eve", avatar: "https://i.pravatar.cc/100?img=5", followers: 1500, coins: 600, isOnline: true },
      { id: 6, name: "Frank", avatar: "https://i.pravatar.cc/100?img=6", followers: 1100, coins: 450, isOnline: false },
      { id: 7, name: "Grace", avatar: "https://i.pravatar.cc/100?img=7", followers: 1300, coins: 510, isOnline: true },
      {
        id: 8,
        name: "Hannah",
        avatar: "https://i.pravatar.cc/100?img=8",
        followers: 2000,
        coins: 650,
        isOnline: false,
      },
      { id: 9, name: "Isaac", avatar: "https://i.pravatar.cc/100?img=9", followers: 800, coins: 420, isOnline: true },
      {
        id: 10,
        name: "Jack",
        avatar: "https://i.pravatar.cc/100?img=10",
        followers: 1700,
        coins: 580,
        isOnline: false,
      },
    ]

    // Dummy player statistics
    const dummyPlayerStats = {
      1: { matchesPlayed: 120, wins: 78, losses: 42, winRate: "65%", bestScore: 980, rank: "Diamond" },
      2: { matchesPlayed: 95, wins: 52, losses: 43, winRate: "55%", bestScore: 820, rank: "Platinum" },
      3: { matchesPlayed: 65, wins: 30, losses: 35, winRate: "46%", bestScore: 720, rank: "Gold" },
      4: { matchesPlayed: 210, wins: 142, losses: 68, winRate: "68%", bestScore: 1050, rank: "Master" },
      5: { matchesPlayed: 180, wins: 110, losses: 70, winRate: "61%", bestScore: 950, rank: "Diamond" },
      6: { matchesPlayed: 85, wins: 40, losses: 45, winRate: "47%", bestScore: 780, rank: "Gold" },
      7: { matchesPlayed: 150, wins: 89, losses: 61, winRate: "59%", bestScore: 890, rank: "Platinum" },
      8: { matchesPlayed: 190, wins: 125, losses: 65, winRate: "66%", bestScore: 980, rank: "Diamond" },
      9: { matchesPlayed: 70, wins: 32, losses: 38, winRate: "46%", bestScore: 750, rank: "Gold" },
      10: { matchesPlayed: 160, wins: 98, losses: 62, winRate: "61%", bestScore: 920, rank: "Diamond" },
    }

    // Dummy posts
    const dummyPosts = [
      {
        id: 1,
        userId: 1,
        content: "Just won my 100th match! So excited to reach this milestone!",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        likes: [2, 3, 5],
      },
      {
        id: 2,
        userId: 4,
        content: "Looking for teammates for the weekend tournament. Anyone interested?",
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        likes: [1, 7, 9],
      },
      {
        id: 3,
        userId: 7,
        content: "Check out my new strategy guide on the blog!",
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        likes: [2, 4, 8, 10],
      },
    ]

    // Dummy post comments
    const dummyPostComments = {
      1: [
        {
          id: 1,
          userId: 3,
          content: "Congratulations! That's amazing!",
          timestamp: new Date(Date.now() - 3000000).toISOString(),
        },
        { id: 2, userId: 5, content: "Well deserved!", timestamp: new Date(Date.now() - 2400000).toISOString() },
      ],
      2: [
        {
          id: 1,
          userId: 1,
          content: "I'm in! Send me the details.",
          timestamp: new Date(Date.now() - 6000000).toISOString(),
        },
      ],
      3: [
        {
          id: 1,
          userId: 2,
          content: "Great guide, very helpful!",
          timestamp: new Date(Date.now() - 80000000).toISOString(),
        },
        {
          id: 2,
          userId: 10,
          content: "I tried your strategy and it worked perfectly!",
          timestamp: new Date(Date.now() - 70000000).toISOString(),
        },
      ],
    }

    // Dummy notifications
    const dummyNotifications = [
      {
        id: 1,
        type: "like",
        userId: 3,
        content: "Charlie liked your post",
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        read: false,
      },
      {
        id: 2,
        type: "comment",
        userId: 5,
        content: "Eve commented on your post",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        read: false,
      },
      {
        id: 3,
        type: "follow",
        userId: 7,
        content: "Grace started following you",
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        read: true,
      },
      {
        id: 4,
        type: "gift",
        userId: 2,
        content: "Bob sent you a gift",
        timestamp: new Date(Date.now() - 172800000).toISOString(),
        read: true,
      },
    ]

    // Dummy achievements
    const dummyAchievements = [
      {
        id: 1,
        name: "First Victory",
        description: "Win your first game",
        icon: "🏆",
        category: 1,
        rarity: "common",
        xp: 50,
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        isNew: true,
      },
      {
        id: 2,
        name: "Social Butterfly",
        description: "Follow 5 other players",
        icon: "🦋",
        category: 2,
        rarity: "common",
        xp: 30,
        timestamp: new Date(Date.now() - 172800000).toISOString(),
        isNew: true,
      },
      {
        id: 3,
        name: "Sharpshooter",
        description: "Achieve 90% accuracy in a shooting game",
        icon: "🎯",
        category: 3,
        rarity: "rare",
        xp: 100,
        timestamp: new Date(Date.now() - 259200000).toISOString(),
        isNew: false,
      },
      {
        id: 4,
        name: "Tournament Finalist",
        description: "Reach the finals in a tournament",
        icon: "🏅",
        category: 4,
        rarity: "epic",
        xp: 200,
        timestamp: new Date(Date.now() - 345600000).toISOString(),
        isNew: false,
      },
      {
        id: 5,
        name: "Gift Giver",
        description: "Send gifts to 3 different players",
        icon: "🎁",
        category: 5,
        rarity: "uncommon",
        xp: 75,
        timestamp: new Date(Date.now() - 432000000).toISOString(),
        isNew: false,
      },
    ]

    // Dummy user badges
    const dummyUserBadges = {
      1: [1, 2, 3],
      2: [1, 5],
      3: [1, 2],
      4: [1, 3, 4],
      5: [1, 2, 5],
      6: [1],
      7: [1, 2, 3, 5],
      8: [1, 4],
      9: [1, 2],
      10: [1, 3],
    }

    // Dummy game invitations
    const dummyGameInvitations = []

    setPlayerStats(dummyPlayerStats)
    setPosts(dummyPosts)
    setPostComments(dummyPostComments)
    setNotifications(dummyNotifications)
    setUnreadNotifications(dummyNotifications.filter((n) => !n.read).length)
    setGameInvitations(dummyGameInvitations)

    // Add achievement-related setters in useEffect
    setAchievements(dummyAchievements)
    setUserBadges(dummyUserBadges)
    setNewAchievements(dummyAchievements.filter((a) => a.isNew).length)

    // Sort users based on ranking type
    let sortedUsers = [...dummyUsers]

    // In a real app, you would fetch different data based on rankingType
    // For this example, we'll just sort by coins
    sortedUsers = sortedUsers.sort((a, b) => b.coins - a.coins)

    setUsers(sortedUsers)
    setFilteredUsers(sortedUsers)
  }, [rankingType])

  // Apply filtering whenever users or searchQuery changes
  useEffect(() => {
    let result = [...users]

    // Apply search filtering
    if (searchQuery && searchQuery !== "__online__") {
      // If searching for "online", filter by online status
      if (searchQuery.toLowerCase() === "online") {
        result = result.filter((user) => user.isOnline)
      } else {
        // Otherwise filter by name
        result = result.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()))
      }
    }

    // Special case for online users filter
    if (searchQuery === "__online__") {
      result = result.filter((user) => user.isOnline)
    }

    setFilteredUsers(result)
  }, [users, searchQuery])

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    if (chatEndRef.current && activeChatUser) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [chatMessages, activeChatUser])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showNotifications && !event.target.closest(".notifications-dropdown")) {
        setShowNotifications(false)
      }
      if (showAchievements && !event.target.closest(".achievements-dropdown")) {
        setShowAchievements(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showNotifications, showAchievements])

  const handleCommentChange = (e, userId) => {
    setComments({ ...comments, [userId]: e.target.value })
  }

  const handleCommentSubmit = (userId) => {
    if (!comments[userId]?.trim()) return

    alert(`Comment to ${users.find((u) => u.id === userId).name}: ${comments[userId]}`)
    setComments({ ...comments, [userId]: "" })
  }

  const toggleGiftMenu = (userId) => {
    setGiftMenuOpen(giftMenuOpen === userId ? null : userId)
  }

  const sendGift = (userId, gift) => {
    // Update user gifts
    const currentUserGifts = userGifts[userId] || []
    const updatedGifts = [...currentUserGifts, gift]
    setUserGifts({ ...userGifts, [userId]: updatedGifts })
    // Close gift menu
    setGiftMenuOpen(null)
    // Show confirmation
    alert(`You sent a ${gift.name} ${gift.emoji} to ${users.find((u) => u.id === userId).name}!`)

    // Add notification for the gift
    addNotification({
      type: "gift",
      userId: 1, // Current user
      content: `You sent a ${gift.name} to ${users.find((u) => u.id === userId).name}`,
      timestamp: new Date().toISOString(),
      read: true,
    })

    // Check if achievement should be awarded (Gift Giver)
    const sentGiftsToUsers = Object.keys(userGifts).length
    if (sentGiftsToUsers >= 3) {
      awardAchievement(1, 5) // Award "Gift Giver" achievement
    }
  }

  // Calculate total gift value for a user
  const getUserGiftValue = (userId) => {
    const gifts = userGifts[userId] || []
    return gifts.reduce((total, gift) => total + gift.value, 0)
  }

  // Toggle follow status for a user
  const toggleFollow = (userId) => {
    setFollowedUsers((prev) => {
      const newState = { ...prev }
      newState[userId] = !newState[userId]
      // Show confirmation
      const user = users.find((u) => u.id === userId)
      const action = newState[userId] ? "followed" : "unfollowed"
      alert(`You ${action} ${user.name}`)

      // Add notification for follow/unfollow
      if (newState[userId]) {
        addNotification({
          type: "follow",
          userId: userId,
          content: `You started following ${user.name}`,
          timestamp: new Date().toISOString(),
          read: true,
        })

        // Check if achievement should be awarded (Social Butterfly)
        const followCount = Object.values(newState).filter(Boolean).length
        if (followCount >= 5) {
          awardAchievement(1, 2) // Award "Social Butterfly" achievement
        }
      }

      return newState
    })
  }

  // Check if a user is being followed
  const isFollowing = (userId) => {
    return !!followedUsers[userId]
  }

  // Handle profile picture click
  const handleProfileClick = (userId) => {
    setViewingProfile(userId)
  }

  // Close profile modal
  const closeProfileModal = () => {
    setViewingProfile(null)
  }

  // Start chat with user
  const startChat = (userId) => {
    setActiveChatUser(userId)
    // Initialize chat if it doesn't exist
    if (!chatMessages[userId]) {
      setChatMessages({
        ...chatMessages,
        [userId]: [
          {
            id: 1,
            sender: userId,
            content: `Hi there! How can I help you?`,
            timestamp: new Date().toISOString(),
          },
        ],
      })
    }
  }

  // Close chat
  const closeChat = () => {
    setActiveChatUser(null)
    setCurrentMessage("")
  }

  // Send chat message
  const sendChatMessage = () => {
    if (!currentMessage.trim() || !activeChatUser) return

    const newMessage = {
      id: (chatMessages[activeChatUser]?.length || 0) + 1,
      sender: "me",
      content: currentMessage,
      timestamp: new Date().toISOString(),
    }

    setChatMessages({
      ...chatMessages,
      [activeChatUser]: [...(chatMessages[activeChatUser] || []), newMessage],
    })

    setCurrentMessage("")

    // Simulate response after a short delay
    setTimeout(
      () => {
        const responseMessage = {
          id: (chatMessages[activeChatUser]?.length || 0) + 2,
          sender: activeChatUser,
          content: getRandomResponse(),
          timestamp: new Date().toISOString(),
        }

        setChatMessages((prev) => ({
          ...prev,
          [activeChatUser]: [...(prev[activeChatUser] || []), responseMessage],
        }))
      },
      1000 + Math.random() * 2000,
    )
  }

  // Random responses for chat simulation
  const getRandomResponse = () => {
    const responses = [
      "That's interesting!",
      "I see what you mean.",
      "Thanks for sharing that.",
      "I agree with you.",
      "Let me think about that.",
      "Good point!",
      "I'm not sure I understand. Can you explain?",
      "That's a great idea!",
      "I'll keep that in mind.",
      "How's your day going?",
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now - date
    const diffSec = Math.floor(diffMs / 1000)
    const diffMin = Math.floor(diffSec / 60)
    const diffHour = Math.floor(diffMin / 60)
    const diffDay = Math.floor(diffHour / 24)

    if (diffSec < 60) return "just now"
    if (diffMin < 60) return `${diffMin}m ago`
    if (diffHour < 24) return `${diffHour}h ago`
    if (diffDay < 7) return `${diffDay}d ago`

    return date.toLocaleDateString()
  }

  // Format file size for display
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  // Capture screenshot
  const captureScreenshot = () => {
    // In a real app, this would use the Web API to capture the screen
    // For this demo, we'll simulate it with a placeholder
    setScreenshotPreview("/placeholder.svg?height=400&width=600")
    // Clear file attachment if screenshot is taken
    setSelectedFile(null)
  }

  // Add poll to post
  const addPollToPost = () => {
    if (!pollQuestion.trim() || pollOptions.some((opt) => !opt.trim())) return

    setHasPoll(true)
    setShowPollCreator(false)

    // In a real app, you would store the poll data to be included in the post
    alert(`Poll "${pollQuestion}" with ${pollOptions.length} options added to your post`)
  }

  // Modify createPost function to handle attachments and other features
  const createPost = () => {
    if (
      (!newPostContent.trim() && !selectedFile && !screenshotPreview && !hasPoll) ||
      (isScheduled && (!scheduleDate || !scheduleTime))
    )
      return

    // Create post object with all the new features
    const newPost = {
      id: posts.length + 1,
      userId: 1, // Assuming current user is ID 1
      content: newPostContent,
      timestamp: new Date().toISOString(),
      likes: [],
      hasAttachment: !!selectedFile,
      attachmentType: selectedFile ? selectedFile.type : null,
      attachmentName: selectedFile ? selectedFile.name : null,
      hasScreenshot: !!screenshotPreview,
      hasPoll: hasPoll,
      pollQuestion: hasPoll ? pollQuestion : null,
      pollOptions: hasPoll ? pollOptions.filter((opt) => opt.trim()) : null,
      allowMultipleVotes: hasPoll ? allowMultipleVotes : null,
      taggedPeople: taggedPeople.length > 0 ? taggedPeople : null,
      isScheduled: isScheduled,
      scheduledFor: isScheduled ? `${scheduleDate} ${scheduleTime}` : null,
    }

    // If post is scheduled, show a message instead of adding to posts array
    if (isScheduled) {
      alert(`Post scheduled for ${scheduleDate} at ${scheduleTime}`)
    } else {
      setPosts([newPost, ...posts])
    }

    // Reset all states
    setNewPostContent("")
    setSelectedFile(null)
    setScreenshotPreview(null)
    setHasPoll(false)
    setPollQuestion("")
    setPollOptions(["", ""])
    setAllowMultipleVotes(false)
    setTaggedPeople([])
    setIsScheduled(false)
    setScheduleDate("")
    setScheduleTime("")

    // Add notification for new post
    addNotification({
      type: "post",
      userId: 1,
      content: "You created a new post",
      timestamp: new Date().toISOString(),
      read: true,
    })
  }

  // Toggle notifications dropdown
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications)
    setShowGameInvite(false)
    setShowAchievements(false)

    // Mark notifications as read when opened
    if (!showNotifications && unreadNotifications > 0) {
      setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
      setUnreadNotifications(0)
    }
  }

  // Toggle achievements dropdown
  const toggleAchievements = () => {
    setShowAchievements(!showAchievements)
    setShowNotifications(false)

    // Mark achievements as viewed
    if (!showAchievements && newAchievements > 0) {
      setAchievements(achievements.map((achievement) => ({ ...achievement, isNew: false })))
      setNewAchievements(0)
    }
  }

  // Get achievement details by ID
  const getAchievementById = (id) => {
    return achievements.find((a) => a.id === id)
  }

  // Check if user has a specific achievement
  const hasAchievement = (userId, achievementId) => {
    return userBadges[userId]?.includes(achievementId)
  }

  // Award an achievement to a user
  const awardAchievement = (userId, achievementId) => {
    if (hasAchievement(userId, achievementId)) return

    setUserBadges((prev) => ({
      ...prev,
      [userId]: [...(prev[userId] || []), achievementId],
    }))

    const achievement = getAchievementById(achievementId)
    if (achievement) {
      // Add notification
      addNotification({
        type: "achievement",
        userId: userId,
        content: `You earned the "${achievement.name}" achievement!`,
        timestamp: new Date().toISOString(),
        read: false,
        achievementId: achievementId,
      })

      // Update achievement as new
      if (userId === 1) {
        // Current user
        setAchievements(achievements.map((a) => (a.id === achievementId ? { ...a, isNew: true } : a)))
        setNewAchievements((prev) => prev + 1)
      }
    }
  }

  // Get user's total XP from achievements
  const getUserXP = (userId) => {
    const userAchievements = userBadges[userId] || []
    return userAchievements.reduce((total, achievementId) => {
      const achievement = getAchievementById(achievementId)
      return total + (achievement?.xp || 0)
    }, 0)
  }

  // Get user level based on XP
  const getUserLevel = (xp) => {
    return Math.floor(Math.sqrt(xp / 100)) + 1
  }

  // Add a new notification
  const addNotification = (notification) => {
    const newNotification = {
      id: notifications.length + 1,
      ...notification,
    }
    setNotifications([newNotification, ...notifications])
    if (!notification.read) {
      setUnreadNotifications(unreadNotifications + 1)
    }
  }

  // Send a game invitation
  const sendGameInvite = () => {
    if (!inviteUserId || !selectedGame) return

    const user = users.find((u) => u.id === inviteUserId)
    const game = gameOptions.find((g) => g.id === selectedGame)

    if (!user || !game) return

    // Create new invitation
    const newInvitation = {
      id: gameInvitations.length + 1,
      to: inviteUserId,
      from: 1, // Current user
      game: game.name,
      timestamp: new Date().toISOString(),
      status: "sent",
    }

    setGameInvitations([...gameInvitations, newInvitation])

    // Add notification
    addNotification({
      type: "game",
      userId: inviteUserId,
      content: `You invited ${user.name} to play ${game.name}`,
      timestamp: new Date().toISOString(),
      read: true,
    })

    // Close invite modal
    setShowGameInvite(false)
    setInviteUserId(null)
    setSelectedGame(null)

    alert(`Game invitation sent to ${user.name} for ${game.name}!`)
  }

  // Respond to a game invitation
  const respondToGameInvite = (inviteId, accept) => {
    setGameInvitations(
      gameInvitations.map((invite) => {
        if (invite.id === inviteId) {
          return {
            ...invite,
            status: accept ? "accepted" : "declined",
          }
        }
        return invite
      }),
    )

    const invite = gameInvitations.find((i) => i.id === inviteId)
    if (invite) {
      const fromUser = users.find((u) => u.id === invite.from)

      // Add notification
      addNotification({
        type: "game",
        userId: invite.from,
        content: `You ${accept ? "accepted" : "declined"} ${fromUser ? fromUser.name + "'s" : ""} invitation to play ${invite.game}`,
        timestamp: new Date().toISOString(),
        read: true,
      })

      if (accept) {
        alert(`You accepted the invitation to play ${invite.game}! The game will start soon.`)
      }
    }
  }

  // Open game invite modal with pre-filled recipient
  const inviteToGame = (userId) => {
    setInviteUserId(userId)
    setShowGameInvite(true)
  }

  // CSS for keyframes
  const keyframesStyle = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  .animate-fade-in {
    animation: fadeIn 0.3s ease-out forwards;
  }
  .animate-pulse {
    animation: pulse 1.5s infinite ease-in-out;
  }
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
  
  button:hover svg {
    transform: scale(1.1);
    transition: transform 0.2s ease;
    color: #6366f1;
  }
  
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
`

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="gaming-particles"></div>
      <style jsx>{`
  .gaming-particles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ff 100%);
    z-index: -1;
  }

  body {
    background: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
    min-height: 100vh;
  }

  .min-h-screen {
    position: relative;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.9)), 
                url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%239C92AC' fillOpacity='0.1' fillRule='evenodd'/%3E%3C/svg%3E");
  animation: gradientBG 15s ease infinite;
  background-size: 400% 400%;
}

@keyframes gradientBG {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.container {
  backdrop-filter: blur(5px);
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 1rem;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
}

.bg-white {
  background-color: rgba(255, 255, 255, 0.85) !important;
  backdrop-filter: blur(5px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.18);
  transition: all 0.3s ease;
}

.bg-white:hover {
  box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.1);
  transform: translateY(-2px);
  background-color: rgba(255, 255, 255, 0.95) !important;
}

  @media (max-width: 640px) {
    .icon-nav {
      overflow-x: auto;
      padding-bottom: 8px;
    }
    
    .icon-nav::-webkit-scrollbar {
      height: 3px;
    }
    
    .icon-nav::-webkit-scrollbar-thumb {
      background-color: rgba(156, 163, 175, 0.5);
      border-radius: 3px;
    }
    
    .icon-button {
      min-width: 60px;
    }
  }

  @media (min-width: 768px) {
    .container {
      max-width: 768px;
    }
  }
  
  /* New colorful styles */
  .bg-white {
    transition: all 0.3s ease;
  }
  
  .bg-white:hover {
    box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.1);
    transform: translateY(-2px);
  }
  
  button {
    transition: all 0.3s ease;
  }
  
  .rounded-xl {
    transition: all 0.3s ease;
  }
  
  .rounded-xl:hover {
    box-shadow: 0 8px 20px rgba(99, 102, 241, 0.15);
  }
  
  .text-indigo-700 {
    background: linear-gradient(90deg, #6366f1, #8b5cf6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`}</style>

      <div className="fixed mt-28 top-0 left-0 right-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 shadow-md z-40 backdrop-blur-sm bg-opacity-90">
        <div className="container max-w-md mx-auto  py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">Community</h1>

          {/* Add this button to the header for mobile menu */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden p-2 text-white hover:text-yellow-200 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {showMobileMenu ? (
              <X size={24} />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>

          <div className="flex items-center space-x-5">
            {/* Notifications */}
            <div className="relative">
              <button
                className="p-2 text-white hover:text-yellow-200 transition-colors relative"
                aria-label={`Notifications (${unreadNotifications} unread)`}
                onClick={toggleNotifications}
              >
                <Bell size={24} />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
                    {unreadNotifications}
                  </span>
                )}
              </button>

              {/* Notifications dropdown */}
              {showNotifications && (
                <div className="fixed md:absolute right-0 left-0 md:left-auto top-20 md:top-auto md:mt-2 w-full md:w-80 bg-white rounded-lg shadow-lg z-50 overflow-hidden notifications-dropdown mx-auto md:mx-0 max-w-md">
                  <div className="p-3 bg-indigo-50 border-b">
                    <h3 className="font-semibold text-indigo-800">Notifications</h3>
                  </div>

                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length > 0 ? (
                      <div className="divide-y">
                        {notifications.map((notification) => {
                          const user = users.find((u) => u.id === notification.userId)
                          return (
                            <div
                              key={notification.id}
                              className={`p-3 hover:bg-gray-50 ${!notification.read ? "bg-blue-50" : ""}`}
                            >
                              <div className="flex items-center">
                                {user && (
                                  <img
                                    src={user.avatar || "/placeholder.svg"}
                                    alt=""
                                    className="w-10 h-10 rounded-full mr-3"
                                  />
                                )}
                                <div className="flex-1">
                                  <p className="text-sm">{notification.content}</p>
                                  <p className="text-xs text-gray-500 mt-1">{formatDate(notification.timestamp)}</p>
                                </div>
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    ) : (
                      <div className="p-4 text-center text-gray-500">No notifications</div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Game invitations */}
            <div className="relative">
              <button
                className="p-2 text-white hover:text-yellow-200 transition-colors relative"
                aria-label="Game invitations"
                onClick={() => {
                  setShowGameInvite(!showGameInvite)
                  setShowNotifications(false)
                  setShowAchievements(false)
                }}
              >
                <Trophy size={24} />
                {gameInvitations.filter((invite) => invite.to === 1 && invite.status === "pending").length > 0 && (
                  <span className="notification-dot"></span>
                )}
              </button>
              {showGameInvite && (
                <div className="fixed md:absolute right-0 left-0 md:left-auto top-16 md:top-auto md:mt-2 w-full md:w-80 bg-white rounded-lg shadow-lg z-50 overflow-hidden mx-auto md:mx-0 max-w-md">
                  <div className="p-3 bg-indigo-50 border-b">
                    <h3 className="font-semibold text-indigo-800">Game Invitations</h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto p-3">
                    {gameInvitations.filter((invite) => invite.to === 1).length > 0 ? (
                      <div className="divide-y">
                        {gameInvitations
                          .filter((invite) => invite.to === 1)
                          .map((invite) => {
                            const fromUser = users.find((u) => u.id === invite.from)
                            return (
                              <div key={invite.id} className="py-2">
                                <div className="flex items-center mb-1">
                                  {fromUser && (
                                    <img
                                      src={fromUser.avatar || "/placeholder.svg"}
                                      alt=""
                                      className="w-8 h-8 rounded-full mr-2"
                                    />
                                  )}
                                  <div>
                                    <p className="text-sm font-medium">
                                      {fromUser ? fromUser.name : "Unknown"} invited you to play {invite.game}
                                    </p>
                                    <p className="text-xs text-gray-500">{formatDate(invite.timestamp)}</p>
                                  </div>
                                </div>
                                <div className="flex space-x-2 mt-2">
                                  <button
                                    onClick={() => respondToGameInvite(invite.id, true)}
                                    className="px-3 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600"
                                  >
                                    Accept
                                  </button>
                                  <button
                                    onClick={() => respondToGameInvite(invite.id, false)}
                                    className="px-3 py-1 bg-gray-300 text-gray-700 rounded text-xs hover:bg-gray-400"
                                  >
                                    Decline
                                  </button>
                                </div>
                              </div>
                            )
                          })}
                      </div>
                    ) : (
                      <div className="text-center py-4 text-gray-500">No game invitations</div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Achievements */}
            <div className="relative">
              <button
                className="p-2 text-white hover:text-yellow-200 transition-colors relative"
                aria-label={`Achievements (${newAchievements} new)`}
                onClick={toggleAchievements}
              >
                <Award size={24} />
                {newAchievements > 0 && <span className="notification-dot"></span>}
              </button>
              {showAchievements && (
                <div className="fixed md:absolute right-0 left-0 md:left-auto top-16 md:top-auto md:mt-2 w-full md:w-80 bg-white rounded-lg shadow-lg z-50 overflow-hidden achievements-dropdown mx-auto md:mx-0 max-w-md">
                  <div className="p-3 bg-indigo-50 border-b">
                    <h3 className="font-semibold text-indigo-800">Achievements</h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {achievements.length > 0 ? (
                      <div className="grid grid-cols-2 gap-2 p-3">
                        {achievements.map((achievement) => (
                          <div
                            key={achievement.id}
                            className={`p-2 rounded-lg flex items-center space-x-2 ${achievement.isNew ? "bg-yellow-50" : "bg-gray-50"}`}
                          >
                            <div
                              className={`${achievementCategories.find((c) => c.id === achievement.category)?.color} w-8 h-8 rounded-full flex items-center justify-center text-white`}
                            >
                              {achievement.icon}
                            </div>
                            <div>
                              <h4 className="text-sm font-medium">{achievement.name}</h4>
                              <p className="text-xs text-gray-500">{achievement.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 text-center text-gray-500">No achievements yet</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-md mx-auto p-4 pb-20 md:pb-4 mt-4">
        <h1 className="text-2xl font-bold mb-4 mt-24 text-center">Community</h1>

        {/* Icons below Community header */}
        <div className="flex justify-center mb-6 overflow-x-auto py-2">
          <div className="flex space-x-6 bg-gradient-to-r from-indigo-50 to-purple-50 p-3 rounded-2xl shadow-sm">
            <button
              onClick={() => setActiveSection("home")}
              className={`md:ml-4 ml-40 px-2 rounded-xl w-14 h-14 flex flex-col items-center justify-center transition-all ${
                activeSection === "home"
                  ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md transform scale-110"
                  : "text-gray-500 hover:bg-gray-200 hover:text-indigo-600"
              }`}
              title="Home"
            >
              <Home size={20} />
              <span className="text-xs mt-1 font-medium">Home</span>
            </button>

            <button
              onClick={() => setActiveSection("topCoins")}
              className={`p-2 rounded-xl w-14 h-14 flex flex-col items-center justify-center transition-all ${
                activeSection === "topCoins"
                  ? "bg-gradient-to-br from-yellow-400 to-yellow-600 text-white shadow-md transform scale-110"
                  : "text-gray-500 hover:bg-yellow-100 hover:text-yellow-600"
              }`}
              title="Top Coins"
            >
              <Coins size={20} />
              <span className="text-xs mt-1 font-medium">Coins</span>
            </button>

            <button
              onClick={() => setActiveSection("topFollowers")}
              className={`p-2 rounded-xl w-14 h-14 flex flex-col items-center justify-center transition-all ${
                activeSection === "topFollowers"
                  ? "bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-md transform scale-110"
                  : "text-gray-500 hover:bg-blue-100 hover:text-blue-600"
              }`}
              title="Top Followers"
            >
              <Users size={20} />
              <span className="text-xs mt-1 font-medium">Top Followers</span>
            </button>

            <button
              onClick={() => setActiveSection("achievements")}
              className={`p-2 rounded-xl w-14 h-14 flex flex-col items-center justify-center transition-all ${
                activeSection === "achievements"
                  ? "bg-gradient-to-br from-green-400 to-green-600 text-white shadow-md transform scale-110"
                  : "text-gray-500 hover:bg-green-100 hover:text-green-600"
              }`}
              title="Achievements"
            >
              <Award size={20} />
              <span className="text-xs mt-1 font-medium">Awards</span>
            </button>

            <button
              onClick={() => setActiveSection("messages")}
              className={`p-2 rounded-xl w-14 h-14 flex flex-col items-center justify-center transition-all ${
                activeSection === "messages"
                  ? "bg-gradient-to-br from-pink-400 to-pink-600 text-white shadow-md transform scale-110"
                  : "text-gray-500 hover:bg-pink-100 hover:text-pink-600"
              }`}
              title="Messages"
            >
              <MessageSquare size={20} />
              <span className="text-xs mt-1 font-medium">Chat</span>
            </button>

            <button
              onClick={() => setShowUserList(!showUserList)}
              className={`p-2 rounded-xl w-14 h-14 flex flex-col items-center justify-center transition-all ${
                showUserList
                  ? "bg-gradient-to-br from-purple-400 to-purple-600 text-white shadow-md transform scale-110"
                  : "text-gray-500 hover:bg-purple-100 hover:text-purple-600"
              }`}
              title="Users"
            >
              <Users size={20} />
              <span className="text-xs mt-1 font-medium">Players</span>
            </button>

            <button
              onClick={() => setActiveSection("settings")}
              className={`p-2 rounded-xl w-14 h-14 flex flex-col items-center justify-center transition-all ${
                activeSection === "settings"
                  ? "bg-gradient-to-br from-gray-400 to-gray-600 text-white shadow-md transform scale-110"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-600"
              }`}
              title="Settings"
            >
              <Settings size={20} />
              <span className="text-xs mt-1 font-medium">Settings</span>
            </button>
          </div>
        </div>

        {/* Create Post Section - Always at the top */}
        <div className="bg-white rounded-xl shadow-md p-3 mb-4 hover:shadow-lg transition-all duration-300 border border-indigo-100">
          <h2 className="font-semibold text-indigo-700 mb-1 text-sm">Create Post</h2>
          <textarea
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full p-2 border border-indigo-200 rounded-lg text-sm mb-2 min-h-[60px] focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition-all duration-300"
          />

          {/* Attachment Preview */}
          {selectedFile && (
            <div className="mb-3 p-2 bg-gray-50 rounded-lg flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-2 text-indigo-500">
                  {selectedFile.type.includes("image") ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium truncate max-w-[200px]">{selectedFile.name}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(selectedFile.size)}</p>
                </div>
              </div>
              <button onClick={() => setSelectedFile(null)} className="text-gray-500 hover:text-red-500">
                <X className="h-5 w-5" />
              </button>
            </div>
          )}

          {/* Screenshot Preview */}
          {screenshotPreview && (
            <div className="mb-3 p-2 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Screenshot Preview</span>
                <button onClick={() => setScreenshotPreview(null)} className="text-gray-500 hover:text-red-500">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="bg-black rounded-lg overflow-hidden">
                <img
                  src={screenshotPreview || "/placeholder.svg"}
                  alt="Screenshot"
                  className="w-full object-contain max-h-[200px]"
                />
              </div>
            </div>
          )}

          {/* Post Options */}
          <div className="flex flex-wrap gap-2 mb-3 border-t border-b py-3">
            {/* Live Stream */}
            <button
              onClick={() => alert("Live streaming feature coming soon!")}
              className="flex items-center text-gray-600 hover:text-red-600 text-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
                <polyline points="17 2 12 7 7 2" />
                <circle cx="12" cy="15" r="3" fill="currentColor" />
              </svg>
              Go Live
            </button>

            {/* Share Gameplay */}
            <button
              onClick={() => alert("Gameplay sharing feature coming soon!")}
              className="flex items-center text-gray-600 hover:text-green-600 text-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                <line x1="6" y1="1" x2="6" y2="4" />
                <line x1="10" y1="1" x2="10" y2="4" />
                <line x1="14" y1="1" x2="14" y2="4" />
              </svg>
              Share Gameplay
            </button>

            {/* Create Poll */}
            <button
              onClick={() => setShowPollCreator(!showPollCreator)}
              className="flex items-center text-gray-600 hover:text-indigo-600 text-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
              </svg>
              Create Poll
            </button>

            {/* Tag People */}
            <button
              onClick={() => setShowTagPeople(!showTagPeople)}
              className="flex items-center text-gray-600 hover:text-indigo-600 text-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                <path d="M21 20.75v-1.5a4 4 0 0 0-3-3.85" />
              </svg>
              Tag People
            </button>

            {/* Schedule Game */}
            <button
              onClick={() => setShowScheduler(!showScheduler)}
              className="flex items-center text-gray-600 hover:text-purple-600 text-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Schedule Game
            </button>
          </div>

          {/* Post Actions */}
          <div className="flex justify-between items-center">
            {isScheduled && scheduleDate && scheduleTime && (
              <div className="flex items-center text-sm text-indigo-600">
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
                Scheduled for {scheduleDate} at {scheduleTime}
                <button onClick={() => setIsScheduled(false)} className="ml-1 text-gray-500 hover:text-red-500">
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
            <div className={isScheduled ? "" : "ml-auto"}>
              <button
                onClick={createPost}
                disabled={!newPostContent.trim() && !selectedFile && !screenshotPreview && !hasPoll}
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg text-sm font-medium hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
              >
                {isScheduled ? "Schedule Post" : "Post"}
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area - Changes based on active section */}
        {activeSection === "home" && (
          <>
            {/* Posts Feed */}
            <div className="space-y-4 mb-6">
              <h2 className="font-semibold text-gray-700">Recent Posts</h2>
              {posts.length > 0 ? (
                posts.map((post) => {
                  const author = users.find((u) => u.id === post.userId) || {
                    name: "Unknown User",
                    avatar: "/placeholder.svg",
                  }
                  return (
                    <div key={post.id} className="bg-white rounded-xl shadow-md p-4">
                      {/* Post header */}
                      <div className="flex items-center mb-3">
                        <img
                          src={author.avatar || "/placeholder.svg"}
                          alt={`${author.name}'s avatar`}
                          className="w-10 h-10 rounded-full mr-3 cursor-pointer"
                          onClick={() => handleProfileClick(author.id)}
                        />
                        <div>
                          <h3 className="font-medium">{author.name}</h3>
                          <p className="text-xs text-gray-500">{formatDate(post.timestamp)}</p>
                        </div>
                      </div>

                      {/* Post content */}
                      <p className="text-gray-800 mb-4">{post.content}</p>

                      {/* Post actions */}
                      <div className="flex items-center justify-between border-t border-b py-2 mb-3">
                        <button
                          onClick={() => toggleLikePost(post.id)}
                          className={`flex items-center space-x-1 ${
                            post.likes.includes(1) ? "text-red-500" : "text-gray-500"
                          } hover:text-red-500 transition-all duration-300 hover:scale-110`}
                        >
                          <Heart className="h-5 w-5" fill={post.likes.includes(1) ? "currentColor" : "none"} />
                          <span>{post.likes.length}</span>
                        </button>

                        <button
                          onClick={() => startChat(post.userId)}
                          className="flex items-center space-x-1 text-gray-500 hover:text-indigo-500 transition-all duration-300 hover:scale-110"
                        >
                          <MessageCircle className="h-5 w-5" />
                          <span>Chat</span>
                        </button>
                      </div>

                      {/* Comments section */}
                      <div className="space-y-3">
                        {/* Comment list */}
                        {postComments[post.id] && postComments[post.id].length > 0 && (
                          <div className="space-y-2 mb-3">
                            <h4 className="text-sm font-medium text-gray-700">
                              {postComments[post.id].length} Comment{postComments[post.id].length !== 1 && "s"}
                            </h4>
                            {postComments[post.id].map((comment) => {
                              const commentAuthor = users.find((u) => u.id === comment.userId) || {
                                name: "Unknown User",
                                avatar: "/placeholder.svg",
                              }
                              return (
                                <div key={comment.id} className="flex space-x-2">
                                  <img
                                    src={commentAuthor.avatar || "/placeholder.svg"}
                                    alt=""
                                    className="w-8 h-8 rounded-full"
                                    onClick={() => handleProfileClick(commentAuthor.id)}
                                  />
                                  <div className="flex-1 bg-gray-50 rounded-lg p-2">
                                    <div className="flex justify-between items-start">
                                      <h5 className="text-sm font-medium">{commentAuthor.name}</h5>
                                      <span className="text-xs text-gray-500">{formatDate(comment.timestamp)}</span>
                                    </div>
                                    <p className="text-sm">{comment.content}</p>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        )}

                        {/* Add comment */}
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            value={newPostComment[post.id] || ""}
                            onChange={(e) => setNewPostComment({ ...newPostComment, [post.id]: e.target.value })}
                            placeholder="Write a comment..."
                            className="flex-1 p-2 border rounded-lg text-sm"
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && newPostComment[post.id]?.trim()) {
                                addPostComment(post.id)
                              }
                            }}
                          />
                          <button
                            onClick={() => addPostComment(post.id)}
                            disabled={!newPostComment[post.id]?.trim()}
                            className="px-3 py-1 bg-indigo-500 text-white rounded-lg text-sm hover:bg-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Comment
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="text-center py-8 bg-white rounded-lg shadow">
                  <p className="text-gray-500">No posts yet</p>
                </div>
              )}
            </div>
          </>
        )}

        {activeSection === "topCoins" && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
            <div className="bg-indigo-50 px-4 py-2 border-b">
              <h2 className="font-semibold text-indigo-800">Top Coins</h2>
            </div>
            <div className="divide-y">
              {users.slice(0, 5).map((user, index) => (
                <div key={user.id} className="flex items-center px-4 py-2 hover:bg-gray-50">
                  <div className="w-8 text-center font-bold text-gray-500">#{index + 1}</div>
                  <div className="flex items-center flex-1">
                    <div className="relative flex-shrink-0">
                      <img
                        src={user.avatar || "/placeholder.svg"}
                        alt=""
                        className="w-8 h-8 rounded-full mr-3 cursor-pointer"
                        onClick={() => handleProfileClick(user.id)}
                      />
                      {user.isOnline && (
                        <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white"></div>
                      )}
                    </div>
                    <span className="font-medium">{user.name}</span>
                  </div>
                  <div className="text-yellow-500 font-bold flex items-center">
                    {user.coins.toLocaleString()} <span className="ml-1">🪙</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === "topFollowers" && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
            <div className="bg-purple-50 px-4 py-2 border-b">
              <h2 className="font-semibold text-purple-800">Top Followers</h2>
            </div>
            <div className="divide-y">
              {[...users]
                .sort((a, b) => b.followers - a.followers)
                .slice(0, 5)
                .map((user, index) => (
                  <div key={user.id} className="flex items-center px-4 py-2 hover:bg-gray-50">
                    <div className="w-8 text-center font-bold text-gray-500">#{index + 1}</div>
                    <div className="flex items-center flex-1">
                      <div className="relative flex-shrink-0">
                        <img
                          src={user.avatar || "/placeholder.svg"}
                          alt=""
                          className="w-8 h-8 rounded-full mr-3 cursor-pointer"
                          onClick={() => handleProfileClick(user.id)}
                        />
                        {user.isOnline && (
                          <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white"></div>
                        )}
                      </div>
                      <span className="font-medium">{user.name}</span>
                    </div>
                    <div className="text-purple-500 font-bold flex items-center">
                      {user.followers.toLocaleString()} <span className="ml-1">👥</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {activeSection === "achievements" && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
            <div className="p-3 bg-indigo-50 border-b">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-indigo-800">Achievements</h3>
              </div>
            </div>
            <div className="p-4">
              {achievements.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {achievements.map((achievement) => (
                    <div key={achievement.id} className="bg-white rounded-lg shadow-md p-3 flex items-center space-x-3">
                      <div
                        className={`${achievementCategories.find((c) => c.id === achievement.category)?.color} w-10 h-10 rounded-full flex items-center justify-center text-white text-xl`}
                      >
                        {achievement.icon}
                      </div>
                      <div>
                        <h4 className="font-medium">{achievement.name}</h4>
                        <p className="text-sm text-gray-500">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No achievements yet</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeSection === "messages" && (
          <div className="bg-white rounded-xl shadow-md p-4 mb-6">
            <h2 className="font-semibold text-gray-700 mb-4">Messages</h2>
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between py-3 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer"
                onClick={() => startChat(user.id)}
              >
                <div className="flex items-center space-x-3">
                  <img src={user.avatar || "/placeholder.svg"} alt="" className="w-10 h-10 rounded-full" />
                  <div>
                    <h3 className="font-medium">{user.name}</h3>
                    <p className="text-sm text-gray-500">Last message: Hi there!</p>
                  </div>
                </div>
                <div className="text-gray-500 text-sm">2 hours ago</div>
              </div>
            ))}
          </div>
        )}

        {activeSection === "settings" && (
          <div className="bg-white rounded-xl shadow-md p-4 mb-6">
            <h2 className="font-semibold text-gray-700 mb-4">Settings</h2>
            <p className="text-gray-600">Account settings and preferences will be available here.</p>
          </div>
        )}

        {/* User List */}
        {showUserList && (
          <div className="bg-white rounded-xl shadow-md p-4 mb-6">
            <h2 className="font-semibold text-gray-700 mb-4">User List</h2>
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between py-3 border-b last:border-b-0 hover:bg-indigo-50 cursor-pointer transition-all duration-300"
                onClick={() => startChat(user.id)}
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={user.avatar || "/placeholder.svg"}
                    alt=""
                    className="w-10 h-10 rounded-full border-2 border-transparent hover:border-indigo-300 transition-all duration-300"
                  />
                  <div>
                    <h3 className="font-medium">{user.name}</h3>
                    <p className="text-sm text-gray-500">Followers: {user.followers}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFollow(user.id)
                    }}
                    className={`px-2 py-1 rounded-lg text-xs transition-all duration-300 ${
                      isFollowing(user.id)
                        ? "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105"
                        : "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 hover:scale-105"
                    }`}
                  >
                    {isFollowing(user.id) ? "Unfollow" : "Follow"}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      startChat(user.id)
                    }}
                    className="px-2 py-1 bg-green-500 text-white rounded-lg text-xs hover:bg-green-600 transition-colors"
                  >
                    <MessageCircle className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Chat Modal */}
        {activeChatUser && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-lg max-w-md w-full overflow-hidden">
              <div className="p-4 bg-indigo-50 border-b flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={users.find((u) => u.id === activeChatUser)?.avatar || "/placeholder.svg"}
                    alt=""
                    className="w-8 h-8 rounded-full"
                  />
                  <h3 className="font-semibold text-indigo-800">
                    {users.find((u) => u.id === activeChatUser)?.name || "Unknown User"}
                  </h3>
                </div>
                <button onClick={closeChat} className="text-gray-500 hover:text-red-500">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-4 max-h-80 overflow-y-auto">
                {chatMessages[activeChatUser] &&
                  chatMessages[activeChatUser].map((message) => (
                    <div
                      key={message.id}
                      className={`mb-3 p-2 rounded-lg ${message.sender === "me" ? "bg-indigo-100 ml-auto text-right" : "bg-gray-100 mr-auto"}`}
                      style={{ maxWidth: "80%" }}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs text-gray-500 mt-1">{formatDate(message.timestamp)}</p>
                    </div>
                  ))}
                <div ref={chatEndRef} />
              </div>

              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    placeholder="Write a message..."
                    className="flex-1 p-2 border rounded-lg text-sm"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && currentMessage.trim()) {
                        sendChatMessage()
                      }
                    }}
                  />
                  <button
                    onClick={sendChatMessage}
                    disabled={!currentMessage.trim()}
                    className="px-3 py-1 bg-indigo-500 text-white rounded-lg text-sm hover:bg-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Profile Modal */}
        {viewingProfile && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg max-w-md w-full overflow-hidden">
              <div className="p-4 bg-indigo-50 border-b flex items-center justify-between">
                <h3 className="font-semibold text-indigo-800">Profile</h3>
                <button
                  onClick={closeProfileModal}
                  className="text-gray-500 hover:text-red-500 p-1 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Close profile"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-4 overflow-y-auto max-h-[80vh]">
                {/* User Info */}
                <div className="flex items-center space-x-4 mb-6 relative">
                  <img
                    src={users.find((u) => u.id === viewingProfile)?.avatar || "/placeholder.svg"}
                    alt=""
                    className="w-16 h-16 rounded-full border-2 border-indigo-100"
                  />
                  <div>
                    <h3 className="font-bold text-lg">
                      {users.find((u) => u.id === viewingProfile)?.name || "Unknown User"}
                    </h3>
                    <p className="text-indigo-600 font-medium">Level: {getUserLevel(getUserXP(viewingProfile))}</p>
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
                  {playerStats[viewingProfile] ? (
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-xs text-gray-500 mb-1">Matches Played</div>
                        <div className="font-bold text-lg">{playerStats[viewingProfile].matchesPlayed}</div>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="text-xs text-gray-500 mb-1">Wins</div>
                        <div className="font-bold text-lg text-green-600">{playerStats[viewingProfile].wins}</div>
                      </div>
                      <div className="bg-red-50 p-3 rounded-lg">
                        <div className="text-xs text-gray-500 mb-1">Losses</div>
                        <div className="font-bold text-lg text-red-600">{playerStats[viewingProfile].losses}</div>
                      </div>
                      <div className="bg-indigo-50 p-3 rounded-lg">
                        <div className="text-xs text-gray-500 mb-1">Win Rate</div>
                        <div className="font-bold text-lg text-indigo-600">{playerStats[viewingProfile].winRate}</div>
                      </div>
                      <div className="bg-yellow-50 p-3 rounded-lg">
                        <div className="text-xs text-gray-500 mb-1">Best Score</div>
                        <div className="font-bold text-lg text-yellow-600">{playerStats[viewingProfile].bestScore}</div>
                      </div>
                      <div className="bg-purple-50 p-3 rounded-lg">
                        <div className="text-xs text-gray-500 mb-1">Rank</div>
                        <div className="font-bold text-lg text-purple-600">{playerStats[viewingProfile].rank}</div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500">No stats available</p>
                  )}
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
                  {userBadges[viewingProfile] && userBadges[viewingProfile].length > 0 ? (
                    <div className="grid grid-cols-3 gap-3">
                      {userBadges[viewingProfile].map((achievementId) => {
                        const achievement = getAchievementById(achievementId)
                        return (
                          achievement && (
                            <div
                              key={achievement.id}
                              className="bg-gray-50 rounded-lg p-3 flex flex-col items-center justify-center hover:bg-gray-100 transition-colors"
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
                    <div className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
                      <div>
                        <div className="text-sm font-medium">Chess Match</div>
                        <div className="text-xs text-gray-500">
                          vs. {users[Math.floor(Math.random() * users.length)]?.name}
                        </div>
                      </div>
                      <div className="text-sm font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">Won</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
                      <div>
                        <div className="text-sm font-medium">Poker Tournament</div>
                        <div className="text-xs text-gray-500">8 players</div>
                      </div>
                      <div className="text-sm font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                        3rd Place
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
                      <div>
                        <div className="text-sm font-medium">Racing Challenge</div>
                        <div className="text-xs text-gray-500">Time Trial</div>
                      </div>
                      <div className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        New Record
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2 justify-between mt-6 border-t pt-4">
                  <button
                    onClick={() => startChat(viewingProfile)}
                    className="px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm hover:bg-indigo-600 transition-colors flex items-center"
                  >
                    <MessageCircle className="h-4 w-4 mr-1" /> Chat
                  </button>
                  <button
                    onClick={() => toggleFollow(viewingProfile)}
                    className={`px-4 py-2 rounded-lg text-sm transition-colors flex items-center ${
                      isFollowing(viewingProfile)
                        ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        : "bg-indigo-500 text-white hover:bg-indigo-600"
                    }`}
                  >
                    {isFollowing(viewingProfile) ? (
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
                    onClick={() => inviteToGame(viewingProfile)}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition-colors flex items-center"
                  >
                    <Trophy className="h-4 w-4 mr-1" /> Invite
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Game Invite Modal */}
        {showGameInvite && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-lg max-w-md w-full overflow-hidden">
              <div className="p-4 bg-indigo-50 border-b flex items-center justify-between">
                <h3 className="font-semibold text-indigo-800">Invite to Game</h3>
                <button onClick={() => setShowGameInvite(false)} className="text-gray-500 hover:text-red-500">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-4">
                <div className="mb-4">
                  <label htmlFor="game" className="block text-gray-700 text-sm font-bold mb-2">
                    Select Game
                  </label>
                  <div className="relative">
                    <select
                      id="game"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={selectedGame || ""}
                      onChange={(e) => setSelectedGame(Number.parseInt(e.target.value))}
                    >
                      <option value="" disabled>
                        Select a game
                      </option>
                      {gameOptions.map((game) => (
                        <option key={game.id} value={game.id}>
                          {game.name}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <button
                  onClick={sendGameInvite}
                  disabled={!inviteUserId || !selectedGame}
                  className="px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm hover:bg-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send Invite
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Poll Creator Modal */}
        {showPollCreator && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-lg max-w-md w-full overflow-hidden">
              <div className="p-4 bg-indigo-50 border-b flex items-center justify-between">
                <h3 className="font-semibold text-indigo-800">Create Poll</h3>
                <button onClick={() => setShowPollCreator(false)} className="text-gray-500 hover:text-red-500">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-4">
                <div className="mb-4">
                  <label htmlFor="pollQuestion" className="block text-gray-700 text-sm font-bold mb-2">
                    Question
                  </label>
                  <input
                    type="text"
                    id="pollQuestion"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter your question"
                    value={pollQuestion}
                    onChange={(e) => setPollQuestion(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Options</label>
                  {pollOptions.map((option, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <input
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...pollOptions]
                          newOptions[index] = e.target.value
                          setPollOptions(newOptions)
                        }}
                      />
                      {index > 1 && (
                        <button
                          onClick={() => {
                            const newOptions = [...pollOptions]
                            newOptions.splice(index, 1)
                            setPollOptions(newOptions)
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => setPollOptions([...pollOptions, ""])}
                    className="text-indigo-500 hover:text-indigo-700"
                  >
                    Add Option
                  </button>
                </div>

                <div className="mb-4">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-indigo-600"
                      checked={allowMultipleVotes}
                      onChange={() => setAllowMultipleVotes(!allowMultipleVotes)}
                    />
                    <span className="ml-2 text-gray-700 text-sm">Allow Multiple Votes</span>
                  </label>
                </div>

                <button
                  onClick={addPollToPost}
                  disabled={!pollQuestion.trim() || pollOptions.some((opt) => !opt.trim())}
                  className="px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm hover:bg-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Poll
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tag People Modal */}
        {showTagPeople && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-lg max-w-md w-full overflow-hidden">
              <div className="p-4 bg-indigo-50 border-b flex items-center justify-between">
                <h3 className="font-semibold text-indigo-800">Tag People</h3>
                <button onClick={() => setShowTagPeople(false)} className="text-gray-500 hover:text-red-500">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-4">
                <div className="mb-4">
                  <label htmlFor="tagSearch" className="block text-gray-700 text-sm font-bold mb-2">
                    Search Users
                  </label>
                  <input
                    type="text"
                    id="tagSearch"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Search for users"
                    value={tagSearchQuery}
                    onChange={(e) => setTagSearchQuery(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Suggested Users</label>
                  {users
                    .filter((user) => user.name.toLowerCase().includes(tagSearchQuery.toLowerCase()))
                    .map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between py-2 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer"
                        onClick={() => {
                          if (!taggedPeople.find((tagged) => tagged.id === user.id)) {
                            setTaggedPeople([...taggedPeople, user])
                          }
                        }}
                      >
                        <div className="flex items-center space-x-3">
                          <img src={user.avatar || "/placeholder.svg"} alt="" className="w-8 h-8 rounded-full" />
                          <h4 className="font-medium">{user.name}</h4>
                        </div>
                        <button className="px-3 py-1 bg-indigo-500 text-white rounded-lg text-sm hover:bg-indigo-600 transition-colors">
                          Tag
                        </button>
                      </div>
                    ))}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Tagged People</label>
                  {taggedPeople.length > 0 ? (
                    taggedPeople.map((user) => (
                      <div key={user.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                        <div className="flex items-center space-x-3">
                          <img src={user.avatar || "/placeholder.svg"} alt="" className="w-8 h-8 rounded-full" />
                          <h4 className="font-medium">{user.name}</h4>
                        </div>
                        <button
                          onClick={() => setTaggedPeople(taggedPeople.filter((tagged) => tagged.id !== user.id))}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No one tagged yet</p>
                  )}
                </div>

                <button
                  onClick={() => setShowTagPeople(false)}
                  className="px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm hover:bg-indigo-600 transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Game Scheduler Modal */}
        {showScheduler && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-lg max-w-md w-full overflow-hidden">
              <div className="p-4 bg-purple-50 border-b flex items-center justify-between">
                <h3 className="font-semibold text-purple-800">Schedule Game Session</h3>
                <button onClick={() => setShowScheduler(false)} className="text-gray-500 hover:text-red-500">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-4">
                <div className="mb-4">
                  <label htmlFor="gameSelect" className="block text-gray-700 text-sm font-bold mb-2">
                    Select Game
                  </label>
                  <div className="relative">
                    <select
                      id="gameSelect"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={selectedGame || ""}
                      onChange={(e) => setSelectedGame(Number.parseInt(e.target.value))}
                    >
                      <option value="" disabled>
                        Select a game
                      </option>
                      {gameOptions.map((game) => (
                        <option key={game.id} value={game.id}>
                          {game.icon} {game.name}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Invite Players</label>
                  <div className="max-h-32 overflow-y-auto mb-2 border rounded-lg">
                    {users.map((user) => (
                      <div key={user.id} className="flex items-center p-2 hover:bg-gray-50 border-b last:border-b-0">
                        <input
                          type="checkbox"
                          id={`user-${user.id}`}
                          className="mr-2 h-4 w-4 text-purple-600"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setTaggedPeople([...taggedPeople, user])
                            } else {
                              setTaggedPeople(taggedPeople.filter((p) => p.id !== user.id))
                            }
                          }}
                          checked={taggedPeople.some((p) => p.id === user.id)}
                        />
                        <label htmlFor={`user-${user.id}`} className="flex items-center cursor-pointer flex-1">
                          <img src={user.avatar || "/placeholder.svg"} alt="" className="w-6 h-6 rounded-full mr-2" />
                          <span className="text-sm">{user.name}</span>
                        </label>
                        {user.isOnline && <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>}
                      </div>
                    ))}
                  </div>
                  <div className="text-xs text-gray-500">
                    {taggedPeople.length} player{taggedPeople.length !== 1 ? "s" : ""} selected
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="scheduleDate" className="block text-gray-700 text-sm font-bold mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      id="scheduleDate"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="scheduleTime" className="block text-gray-700 text-sm font-bold mb-2">
                      Time
                    </label>
                    <input
                      type="time"
                      id="scheduleTime"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="sessionNotes" className="block text-gray-700 text-sm font-bold mb-2">
                    Session Notes
                  </label>
                  <textarea
                    id="sessionNotes"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Add notes about the game session..."
                    rows={3}
                  ></textarea>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => setShowScheduler(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (taggedPeople.length > 0 && selectedGame && scheduleDate && scheduleTime) {
                        // Create game invitations for all tagged people
                        const game = gameOptions.find((g) => g.id === selectedGame)
                        taggedPeople.forEach((user) => {
                          // Create invitation
                          const newInvitation = {
                            id: gameInvitations.length + 1,
                            to: user.id,
                            from: 1, // Current user
                            game: game?.name || "Unknown Game",
                            timestamp: new Date().toISOString(),
                            scheduledFor: `${scheduleDate} ${scheduleTime}`,
                            status: "pending",
                          }

                          // Add to invitations
                          setGameInvitations((prev) => [...prev, newInvitation])

                          // Add notification
                          addNotification({
                            type: "game",
                            userId: user.id,
                            content: `You scheduled a game of ${game?.name} with ${user.name} on ${scheduleDate} at ${scheduleTime}`,
                            timestamp: new Date().toISOString(),
                            read: true,
                          })
                        })

                        alert(
                          `Game session scheduled with ${taggedPeople.length} player(s) for ${scheduleDate} at ${scheduleTime}`,
                        )
                        setShowScheduler(false)
                        setTaggedPeople([])
                        setSelectedGame(null)
                        setScheduleDate("")
                        setScheduleTime("")
                      } else {
                        alert("Please select a game, at least one player, and set a date and time")
                      }
                    }}
                    disabled={!selectedGame || taggedPeople.length === 0 || !scheduleDate || !scheduleTime}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Schedule Game
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Poll Creator Modal */}
        {showPollCreator && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-lg max-w-md w-full overflow-hidden">
              <div className="p-4 bg-indigo-50 border-b flex items-center justify-between">
                <h3 className="font-semibold text-indigo-800">Create Poll</h3>
                <button onClick={() => setShowPollCreator(false)} className="text-gray-500 hover:text-red-500">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-4">
                <div className="mb-4">
                  <label htmlFor="pollQuestion" className="block text-gray-700 text-sm font-bold mb-2">
                    Question
                  </label>
                  <input
                    type="text"
                    id="pollQuestion"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter your question"
                    value={pollQuestion}
                    onChange={(e) => setPollQuestion(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Options</label>
                  {pollOptions.map((option, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <input
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...pollOptions]
                          newOptions[index] = e.target.value
                          setPollOptions(newOptions)
                        }}
                      />
                      {index > 1 && (
                        <button
                          onClick={() => {
                            const newOptions = [...pollOptions]
                            newOptions.splice(index, 1)
                            setPollOptions(newOptions)
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => setPollOptions([...pollOptions, ""])}
                    className="text-indigo-500 hover:text-indigo-700"
                  >
                    Add Option
                  </button>
                </div>

                <div className="mb-4">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-indigo-600"
                      checked={allowMultipleVotes}
                      onChange={() => setAllowMultipleVotes(!allowMultipleVotes)}
                    />
                    <span className="ml-2 text-gray-700 text-sm">Allow Multiple Votes</span>
                  </label>
                </div>

                <button
                  onClick={addPollToPost}
                  disabled={!pollQuestion.trim() || pollOptions.some((opt) => !opt.trim())}
                  className="px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm hover:bg-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Poll
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tag People Modal */}
        {showTagPeople && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-lg max-w-md w-full overflow-hidden">
              <div className="p-4 bg-indigo-50 border-b flex items-center justify-between">
                <h3 className="font-semibold text-indigo-800">Tag People</h3>
                <button onClick={() => setShowTagPeople(false)} className="text-gray-500 hover:text-red-500">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-4">
                <div className="mb-4">
                  <label htmlFor="tagSearch" className="block text-gray-700 text-sm font-bold mb-2">
                    Search Users
                  </label>
                  <input
                    type="text"
                    id="tagSearch"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Search for users"
                    value={tagSearchQuery}
                    onChange={(e) => setTagSearchQuery(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Suggested Users</label>
                  {users
                    .filter((user) => user.name.toLowerCase().includes(tagSearchQuery.toLowerCase()))
                    .map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between py-2 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer"
                        onClick={() => {
                          if (!taggedPeople.find((tagged) => tagged.id === user.id)) {
                            setTaggedPeople([...taggedPeople, user])
                          }
                        }}
                      >
                        <div className="flex items-center space-x-3">
                          <img src={user.avatar || "/placeholder.svg"} alt="" className="w-8 h-8 rounded-full" />
                          <h4 className="font-medium">{user.name}</h4>
                        </div>
                        <button className="px-3 py-1 bg-indigo-500 text-white rounded-lg text-sm hover:bg-indigo-600 transition-colors">
                          Tag
                        </button>
                      </div>
                    ))}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Tagged People</label>
                  {taggedPeople.length > 0 ? (
                    taggedPeople.map((user) => (
                      <div key={user.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                        <div className="flex items-center space-x-3">
                          <img src={user.avatar || "/placeholder.svg"} alt="" className="w-8 h-8 rounded-full" />
                          <h4 className="font-medium">{user.name}</h4>
                        </div>
                        <button
                          onClick={() => setTaggedPeople(taggedPeople.filter((tagged) => tagged.id !== user.id))}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No one tagged yet</p>
                  )}
                </div>

                <button
                  onClick={() => setShowTagPeople(false)}
                  className="px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm hover:bg-indigo-600 transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
