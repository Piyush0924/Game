"use client"

import { useState, useRef } from "react"
import { PlusCircle, X, Send, Calendar, Tag, BarChart2, ImageIcon, Film, Music, Palette } from "lucide-react"

export default function CreatePostCard({ createPost, setShowPollCreator, setShowTagPeople, setShowScheduler }) {
  const [newPostContent, setNewPostContent] = useState("")
  const [selectedFile, setSelectedFile] = useState(null)
  const [screenshotPreview, setScreenshotPreview] = useState(null)
  const [mediaType, setMediaType] = useState(null)
  const [showMediaOptions, setShowMediaOptions] = useState(false)
  const [selectedBackground, setSelectedBackground] = useState(null)
  const [musicUrl, setMusicUrl] = useState("")
  const [gifUrl, setGifUrl] = useState("")
  const [isScheduled, setIsScheduled] = useState(false)
  const [scheduleDate, setScheduleDate] = useState("")
  const [scheduleTime, setScheduleTime] = useState("")
  const [hasPoll, setHasPoll] = useState(false)
  const [pollQuestion, setPollQuestion] = useState("")
  const [pollOptions, setPollOptions] = useState(["", ""])
  const [allowMultipleVotes, setAllowMultipleVotes] = useState(false)
  const [taggedPeople, setTaggedPeople] = useState([])

  const imageInputRef = useRef(null)
  const videoInputRef = useRef(null)
  const musicInputRef = useRef(null)
  const audioRef = useRef(null)
  const videoRef = useRef(null)

  const backgroundOptions = [
    { id: 1, color: "bg-gradient-to-r from-purple-500 to-indigo-500", name: "Purple Haze" },
    { id: 2, color: "bg-gradient-to-r from-pink-500 to-rose-500", name: "Pink Sunset" },
    { id: 3, color: "bg-gradient-to-r from-yellow-400 to-amber-500", name: "Golden Hour" },
    { id: 4, color: "bg-gradient-to-r from-green-400 to-emerald-500", name: "Forest" },
    { id: 5, color: "bg-gradient-to-r from-blue-400 to-cyan-500", name: "Ocean Blue" },
  ]

  // Format file size for display
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  // Capture screenshot (simulated)
  const captureScreenshot = () => {
    setScreenshotPreview("/placeholder.svg?height=400&width=600")
    setSelectedFile(null)
  }

  // Handle post creation
  const handleCreatePost = () => {
    if (
      (!newPostContent.trim() && !selectedFile && !screenshotPreview && !hasPoll && !selectedBackground && !gifUrl) ||
      (isScheduled && (!scheduleDate || !scheduleTime))
    )
      return

    createPost({
      content: newPostContent,
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
      mediaType: mediaType,
      backgroundStyle: selectedBackground ? selectedBackground.color : null,
      musicUrl: musicUrl || null,
      gifUrl: gifUrl || null,
    })

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
    setMediaType(null)
    setSelectedBackground(null)
    setMusicUrl("")
    setGifUrl("")
    setShowMediaOptions(false)
  }

  return (
    <div
      className="w-full bg-gradient-to-b from-white to-gray-50 rounded-lg shadow-lg p-4 mb-4"
      style={{
        paddingLeft: "env(safe-area-inset-left)",
        paddingRight: "env(safe-area-inset-right)",
      }}
    >
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .fade-in {
          animation: fadeIn 0.3s ease-in;
        }
      `}</style>

      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <PlusCircle size={18} className="text-blue-500 ml-[0.7rem]" />
        <span className="text-sm font-medium text-gray-900">Create Post</span>
      </div>

      {/* Body */}
      <div>
        {/* Textarea */}
        <textarea
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full h-24 sm:h-32 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-sm font-normal text-gray-900 placeholder-gray-400"
        />

        {/* Attachment Preview */}
        {selectedFile && !mediaType && (
          <div className="mb-3 p-3 bg-gray-100 rounded-lg border border-gray-200 shadow-sm fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 l:3 sm:pl-3">
                <div className="text-blue-900">
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
                  <p className="text-sm font-medium text-gray-900 truncate max-w-[200px]">{selectedFile.name}</p>
                  <p className="text-xs text-gray-600">{formatFileSize(selectedFile.size)}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedFile(null)}
                className="text-gray-500 hover:text-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-full p-1 transition-colors duration-300"
                aria-label="Remove attachment"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {/* Screenshot Preview */}
        {screenshotPreview && (
          <div className="mb-3 p-3 bg-gray-100 rounded-lg border border-gray-200 shadow-sm fade-in">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-900">Screenshot Preview</span>
              <button
                onClick={() => setScreenshotPreview(null)}
                className="text-gray-500 hover:text-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-full p-1 transition-colors duration-300"
                aria-label="Remove screenshot"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="bg-black rounded-lg overflow-hidden">
              <img
                src={screenshotPreview || "/placeholder.svg"}
                alt="Screenshot"
                className="w-full object-contain max-h-[150px] sm:max-h-[200px]"
                loading="lazy"
              />
            </div>
          </div>
        )}

        {/* Scheduled Info */}
        {isScheduled && scheduleDate && scheduleTime && (
          <div className="flex items-center gap-1 text-sm text-indigo-600 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-teal-500"
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
            <span className="text-xs text-gray-600">
              Scheduled for {scheduleDate} at {scheduleTime}
            </span>
            <button
              onClick={() => setIsScheduled(false)}
              className="text-gray-500 hover:text-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-full p-1 transition-colors duration-300"
              aria-label="Cancel schedule"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Post Options and Post Button */}
        <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-3">
          <button
            onClick={() => {
              setShowMediaOptions(!showMediaOptions)
              setMediaType(null)
            }}
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-sm font-medium text-gray-700 transition-colors duration-300 touch-action-manipulation"
          >
            <PlusCircle className="h-4 w-4 text-blue-500" />
            <span className="hidden sm:inline-block">Add Media</span>
          </button>

          <button
            onClick={() => alert("Live streaming feature coming soon!")}
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-sm font-medium text-gray-700 transition-colors duration-300 touch-action-manipulation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
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
            <span className="hidden sm:inline-block">Go Live</span>
          </button>

          <button
            onClick={() => setShowPollCreator(true)}
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-sm font-medium text-gray-700 transition-colors duration-300 touch-action-manipulation"
          >
            <BarChart2 className="h-4 w-4" />
            <span className="hidden sm:inline-block">Poll</span>
          </button>

          <button
            onClick={() => setShowTagPeople(true)}
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-sm font-medium text-gray-700 transition-colors duration-300 touch-action-manipulation"
          >
            <Tag className="h-4 w-4" />
            <span className="hidden sm:inline-block">Tag</span>
          </button>

          <button
            onClick={() => setShowScheduler(true)}
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-sm font-medium text-gray-700 transition-colors duration-300 touch-action-manipulation"
          >
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline-block">Schedule</span>
          </button>

          {/* Post Button */}
          <button
            onClick={handleCreatePost}
            disabled={
              !newPostContent.trim() &&
              !selectedFile &&
              !screenshotPreview &&
              !hasPoll &&
              !selectedBackground &&
              !gifUrl
            }
            className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 touch-action-manipulation sm:ml-auto ${
              !newPostContent.trim() &&
              !selectedFile &&
              !screenshotPreview &&
              !hasPoll &&
              !selectedBackground &&
              !gifUrl
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-700 to-indigo-600 text-white hover:from-indigo-800 hover:to-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            }`}
          >
            <Send className="h-3 w-3" />
            <span>{isScheduled ? "Schedule Post" : "Post"}</span>
          </button>
        </div>

        {/* Media Options Panel */}
        {showMediaOptions && (
          <div className="bg-white rounded-lg p-3 shadow-md mb-3 border border-gray-200 fade-in">
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => {
                  setMediaType("photo")
                  if (imageInputRef.current) imageInputRef.current.click()
                }}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors duration-300 touch-action-manipulation ${
                  mediaType === "photo"
                    ? "bg-indigo-100 text-indigo-700"
                    : "bg-gray-200 hover:bg-gray-300 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                } text-sm font-medium`}
              >
                <ImageIcon size={16} />
                <span>Photo</span>
              </button>

              <button
                onClick={() => {
                  setMediaType("video")
                  if (videoInputRef.current) videoInputRef.current.click()
                }}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors duration-300 touch-action-manipulation ${
                  mediaType === "video"
                    ? "bg-indigo-100 text-indigo-700"
                    : "bg-gray-200 hover:bg-gray-300 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                } text-sm font-medium`}
              >
                <Film size={16} />
                <span>Video</span>
              </button>

              <button
                onClick={() => {
                  setMediaType("music")
                  if (musicInputRef.current) musicInputRef.current.click()
                }}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors duration-300 touch-action-manipulation ${
                  mediaType === "music"
                    ? "bg-indigo-100 text-indigo-700"
                    : "bg-gray-200 hover:bg-gray-300 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                } text-sm font-medium`}
              >
                <Music size={16} />
                <span>Music</span>
              </button>

              <button
                onClick={() => setMediaType("background")}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors duration-300 touch-action-manipulation ${
                  mediaType === "background"
                    ? "bg-indigo-100 text-indigo-700"
                    : "bg-gray-200 hover:bg-gray-300 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                } text-sm font-medium`}
              >
                <Palette size={16} />
                <span>Background</span>
              </button>
            </div>

            {/* Hidden file inputs */}
            <input
              type="file"
              ref={imageInputRef}
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setSelectedFile(e.target.files[0])
                  setMediaType("photo")
                }
              }}
            />
            <input
              type="file"
              ref={videoInputRef}
              accept="video/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setSelectedFile(e.target.files[0])
                  setMediaType("video")
                }
              }}
            />
            <input
              type="file"
              ref={musicInputRef}
              accept="audio/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setSelectedFile(e.target.files[0])
                  setMediaType("music")
                  const url = URL.createObjectURL(e.target.files[0])
                  setMusicUrl(url)
                }
              }}
            />

            {/* Background Options */}
            {mediaType === "background" && (
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 fade-in">
                {backgroundOptions.map((bg) => (
                  <button
                    key={bg.id}
                    onClick={() => setSelectedBackground(bg)}
                    className={`h-12 rounded-lg ${bg.color} transition-transform duration-300 hover:scale-105 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 touch-action-manipulation ${
                      selectedBackground?.id === bg.id ? "ring-2 ring-indigo-600 ring-offset-2" : ""
                    }`}
                    title={bg.name}
                    aria-label={`Select ${bg.name} background`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Media Previews */}
        {selectedFile && mediaType === "photo" && (
          <div className="mb-3 p-3 bg-gray-100 rounded-lg border border-gray-200 shadow-sm fade-in">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-900">Photo Preview</span>
              <button
                onClick={() => {
                  setSelectedFile(null)
                  setMediaType(null)
                }}
                className="text-gray-500 hover:text-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-full p-1 transition-colors duration-300"
                aria-label="Remove photo"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="bg-black rounded-lg overflow-hidden">
              <img
                src={URL.createObjectURL(selectedFile) || "/placeholder.svg"}
                alt="Photo preview"
                className="w-full object-contain max-h-[150px] sm:max-h-[200px]"
                loading="lazy"
              />
            </div>
          </div>
        )}

        {selectedFile && mediaType === "video" && (
          <div className="mb-3 p-3 bg-gray-100 rounded-lg border border-gray-200 shadow-sm fade-in">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-900">Video Preview</span>
              <button
                onClick={() => {
                  setSelectedFile(null)
                  setMediaType(null)
                }}
                className="text-gray-500 hover:text-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-full p-1 transition-colors duration-300"
                aria-label="Remove video"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="bg-black rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                src={URL.createObjectURL(selectedFile)}
                controls
                className="w-full max-h-[150px] sm:max-h-[200px]"
              />
            </div>
          </div>
        )}

        {selectedFile && mediaType === "music" && (
          <div className="mb-3 p-3 bg-gray-100 rounded-lg border border-gray-200 shadow-sm fade-in">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
                Music: {selectedFile.name}
              </span>
              <button
                onClick={() => {
                  setSelectedFile(null)
                  setMediaType(null)
                  setMusicUrl("")
                }}
                className="text-gray-500 hover:text-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-full p-1 transition-colors duration-300"
                aria-label="Remove music"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <audio ref={audioRef} src={musicUrl} controls className="w-full" />
          </div>
        )}

        {selectedBackground && (
          <div className="mb-3 p-3 bg-gray-100 rounded-lg border border-gray-200 shadow-sm fade-in">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-900">Background: {selectedBackground.name}</span>
              <button
                onClick={() => {
                  setSelectedBackground(null)
                  setMediaType(null)
                }}
                className="text-gray-500 hover:text-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-full p-1 transition-colors duration-300"
                aria-label="Remove background"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className={`h-12 rounded-lg ${selectedBackground.color}`} />
          </div>
        )}
      </div>
    </div>
  )
}