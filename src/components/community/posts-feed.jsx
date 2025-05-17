"use client"

import { useState } from "react"
import { Heart, MessageCircle, Send, PlusCircle, Share } from "lucide-react"

export default function PostsFeed({
  posts,
  users,
  toggleLikePost,
  addPostComment,
  handleProfileClick,
  startChat,
  formatDate,
}) {
  const [newPostComment, setNewPostComment] = useState({})
  const [showComments, setShowComments] = useState({})

  // Toggle comments visibility for a specific post
  const toggleComments = (postId) => {
    setShowComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }))
  }

  return (
    <div className="space-y-4 mb-6 px-1 sm:px-0">
      {/* Recent Posts Header */}
      <div className="recent-posts-header flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-cyan-50 p-3 rounded-lg shadow-sm">
        <MessageCircle size={18} className="text-cyan-500" />
        <span className="text-sm font-semibold text-gray-900">Recent Posts</span>
        <div className="ml-auto flex items-center">
          <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
            {posts.length}
          </span>
        </div>
      </div>

      {/* Posts List */}
      {posts.length > 0 ? (
        posts.map((post) => {
          const author = users.find((u) => u.id === post.userId) || {
            name: "Unknown User",
            avatar: "/images/avatars/default-avatar.jpg",
          }
          return (
            <div
              key={post.id}
              className="post-card bg-white rounded-lg shadow-md p-4 sm:p-6 mt-4 text-gray-900 border border-gray-200 hover:shadow-lg transition-shadow duration-300 animate-fade-in-up"
            >
              {/* Post Header */}
              <div className="post-header flex items-center gap-3 mb-3">
                <img
                  src={author.avatar || "/images/avatars/default-avatar.jpg"}
                  alt={`${author.name}'s avatar`}
                  className="post-avatar w-10 h-10 sm:w-12 sm:h-12 rounded-full cursor-pointer transition-transform duration-300 hover:scale-105"
                  onClick={() => handleProfileClick(author.id)}
                />
                <div>
                  <h3
                    className="post-author text-sm sm:text-base font-semibold text-gray-900 leading-tight hover:text-indigo-600 cursor-pointer transition-colors duration-300"
                    onClick={() => handleProfileClick(author.id)}
                  >
                    {author.name}
                  </h3>
                  <p className="post-time text-xs text-gray-600">{formatDate(post.timestamp)}</p>
                </div>
              </div>

              {/* Post Content */}
              <div
                className={`post-content ${
                  post.backgroundStyle ? post.backgroundStyle + " text-white p-4 rounded-lg my-2" : "text-gray-900"
                }`}
              >
                <p className="text-sm sm:text-base leading-relaxed">{post.content}</p>

                {/* Render Different Media Types */}
                {post.mediaType === "photo" && post.hasAttachment && (
                  <div className="mt-3 bg-black rounded-lg overflow-hidden">
                    <img
                      src={`/images/media/photos/photo${post.id}.jpg`} // Dynamically reference photo
                      alt="Photo"
                      className="w-full object-contain max-h-[200px] sm:max-h-[300px]"
                      loading="lazy"
                      onError={(e) => (e.target.src = "/images/avatars/default-avatar.jpg")} // Fallback on error
                    />
                  </div>
                )}

                {post.mediaType === "video" && post.hasAttachment && (
                  <div className="mt-3 bg-black rounded-lg overflow-hidden">
                    <video
                      src={`/images/media/videos/video${post.id}.mp4`} // Dynamically reference video
                      controls
                      className="w-full max-h-[200px] sm:max-h-[300px]"
                      onError={(e) => (e.target.src = "/images/avatars/default-avatar.jpg")} // Fallback on error
                    />
                  </div>
                )}

                {post.mediaType === "music" && post.hasAttachment && (
                  <div className="mt-3 p-2 bg-gray-200 rounded-lg shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-cyan-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                        />
                      </svg>
                      <span className="text-sm font-medium text-gray-900">
                        {post.attachmentName || "Audio Track"}
                      </span>
                    </div>
                    <audio controls className="w-full" />
                  </div>
                )}

                {post.mediaType === "gif" && post.gifUrl && (
                  <div className="mt-3 bg-black rounded-lg overflow-hidden">
                    <img
                      src={post.gifUrl || "/images/media/gifs/gif1.gif"}
                      alt="GIF"
                      className="w-full object-contain max-h-[200px] sm:max-h-[300px]"
                      loading="lazy"
                      onError={(e) => (e.target.src = "/images/avatars/default-avatar.jpg")} // Fallback on error
                    />
                  </div>
                )}
              </div>

              {/* Likes, Comments, Share Row */}
              <div className="social-actions-row bg-gray-100 p-2 rounded-lg mt-3 flex justify-between items-center">
                <button
                  onClick={() => toggleLikePost(post.id)}
                  className={`flex items-center gap-1 px-3 py-1 rounded-full transition-colors duration-300 focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ${
                    post.likes.includes(1)
                      ? "text-indigo-600 hover:text-red-400"
                      : "text-gray-600 hover:text-indigo-600"
                  }`}
                  aria-label={post.likes.includes(1) ? "Unlike post" : "Like post"}
                >
                  <Heart
                    className="h-5 w-5"
                    fill={post.likes.includes(1) ? "currentColor" : "none"}
                    stroke="currentColor"
                  />
                  <span className="text-sm">{post.likes.length}</span>
                </button>

                <button
                  onClick={() => toggleComments(post.id)}
                  className={`flex items-center gap-1 px-3 py-1 rounded-full transition-colors duration-300 focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ${
                    showComments[post.id] ? "text-indigo-600" : "text-gray-600 hover:text-indigo-600"
                  }`}
                  aria-label={showComments[post.id] ? "Hide comments" : "Show comments"}
                >
                  <MessageCircle className="h-5 w-5 text-cyan-500" />
                  <span className="text-sm">{post.comments?.length || 0}</span>
                </button>

                <button
                  onClick={() => alert("Share functionality coming soon!")}
                  className="flex items-center gap-1 px-3 py-1 rounded-full text-gray-600 hover:text-indigo-600 transition-colors duration-300 focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                  aria-label="Share post"
                >
                  <Share className="h-5 w-5 text-cyan-500" />
                  <span className="text-sm">Share</span>
                </button>
              </div>

              {/* Comments Section (Hidden by Default) */}
              {showComments[post.id] && (
                <div className="post-comments mt-4 border-t border-gray-200 pt-4 fade-in">
                  {/* Comment List */}
                  {post.comments && post.comments.length > 0 && (
                    <div className="space-y-3 mb-4">
                      <h4 className="text-sm font-semibold text-gray-900">
                        {post.comments.length} Comment{post.comments.length !== 1 && "s"}
                      </h4>
                      {post.comments.map((comment) => {
                        const commentAuthor = users.find((u) => u.id === comment.userId) || {
                          name: "Unknown User",
                          avatar: "/images/h1.jpg",
                        }
                        return (
                          <div key={comment.id} className="flex space-x-3 fade-in">
                            <img
                              src={commentAuthor.avatar || "/images/h1.jpg"}
                              alt={`${commentAuthor.name}'s avatar`}
                              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full cursor-pointer transition-transform duration-300 hover:scale-110"
                              onClick={() => handleProfileClick(commentAuthor.id)}
                            />
                            <div className="flex-1 bg-gray-200 rounded-lg p-3 hover:bg-gray-300 transition-colors duration-300">
                              <div className="flex justify-between items-start">
                                <h5
                                  className="text-sm font-semibold text-gray-900 hover:text-indigo-600 cursor-pointer transition-colors duration-300"
                                  onClick={() => handleProfileClick(commentAuthor.id)}
                                >
                                  {commentAuthor.name}
                                </h5>
                                <span className="text-xs text-gray-600">{formatDate(comment.timestamp)}</span>
                              </div>
                              <p className="text-sm text-gray-900 leading-relaxed">{comment.content}</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}

                  {/* Add Comment */}
                  <div className="comment-form flex items-center gap-2">
                    <input
                      type="text"
                      value={newPostComment[post.id] || ""}
                      onChange={(e) => setNewPostComment({ ...newPostComment, [post.id]: e.target.value })}
                      placeholder="Write a comment..."
                      className="comment-input flex-1 px-3 py-2 bg-gray-200 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-colors duration-300"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && newPostComment[post.id]?.trim()) {
                          addPostComment(post.id, newPostComment[post.id])
                          setNewPostComment({ ...newPostComment, [post.id]: "" })
                        }
                      }}
                    />
                    <button
                      onClick={() => {
                        if (newPostComment[post.id]?.trim()) {
                          addPostComment(post.id, newPostComment[post.id])
                          setNewPostComment({ ...newPostComment, [post.id]: "" })
                        }
                      }}
                      disabled={!newPostComment[post.id]?.trim()}
                      className={`comment-button p-2 rounded-full transition-colors duration-300 focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ${
                        newPostComment[post.id]?.trim()
                          ? "bg-indigo-600 text-white hover:bg-indigo-700"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                      aria-label="Send comment"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })
      ) : (
        <div className="text-center py-8 bg-white rounded-lg shadow-md border border-gray-200 card-hover hover:shadow-lg transition-shadow duration-300">
          <PlusCircle size={24} className="mx-auto mb-2 text-cyan-500" />
          <p className="text-gray-600 text-sm font-medium">No posts yet</p>
          <p className="text-gray-500 text-xs mt-1">Be the first to create a post!</p>
        </div>
      )}

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .fade-in {
          animation: fadeIn 0.3s ease-in;
        }
      `}</style>
    </div>
  )
}