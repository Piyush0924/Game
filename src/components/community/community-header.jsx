"use client"

import { useState } from "react"
import { Search, X } from "lucide-react"

export default function CommunityHeader({ search }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState({ users: [], posts: [] })

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen)
    setSearchQuery("")
    setSearchResults({ users: [], posts: [] })
  }

  const handleSearch = (e) => {
    const query = e.target.value
    setSearchQuery(query)
    const results = search(query)
    setSearchResults(results)
  }

  return (
    <header className="relative mb-2 ">
      {/* Header Title */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-indigo-100">Community Hub</h1>
        <button
          onClick={handleSearchToggle}
          className="p-3 text-indigo-100 hover:bg-indigo-100 transition-all duration-300"
          aria-label={isSearchOpen ? "Close search" : "Open search"}
        >
          {isSearchOpen ? <X className="h-6 w-6" /> : <Search className="h-6 w-6" />}
        </button>
      </div>

      {/* Search Input and Results */}
      {isSearchOpen && (
        <div className="mt-4 glass p-4 rounded-xl shadow-lg animate-fade-in">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search users or posts..."
            className="w-full p-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition-all duration-300 bg-white/50"
            aria-label="Search community"
            autoFocus
          />

          {/* Search Results */}
          {searchQuery && (
            <div className="mt-4 max-h-60 overflow-y-auto">
              {/* Users */}
              {searchResults.users.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-indigo-700 mb-2">Users</h3>
                  {searchResults.users.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center p-2 rounded-lg hover:bg-indigo-50 transition-all duration-200 cursor-pointer"
                    >
                      <img
                        src={user.avatar}
                        alt={`${user.name}'s avatar`}
                        className="h-8 w-8 rounded-full mr-3"
                        onError={(e) => (e.target.src = "/avatars/default.jpg")} // Fallback image
                      />
                      <span className="text-gray-800">{user.name}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Posts */}
              {searchResults.posts.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-indigo-700 mb-2">Posts</h3>
                  {searchResults.posts.map((post) => (
                    <div
                      key={post.id}
                      className="p-2 rounded-lg hover:bg-indigo-50 transition-all duration-200 cursor-pointer"
                    >
                      <p className="text-gray-800 line-clamp-2">{post.content}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* No Results */}
              {searchResults.users.length === 0 && searchResults.posts.length === 0 && (
                <p className="text-gray-500 text-center mt-4">No results found.</p>
              )}
            </div>
          )}
        </div>
      )}
    </header>
  )
}