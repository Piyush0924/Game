"use client"

import { useState } from "react"
import { X } from "lucide-react"

export default function PollCreatorModal({ setShowPollCreator }) {
  const [pollQuestion, setPollQuestion] = useState("")
  const [pollOptions, setPollOptions] = useState(["", ""])
  const [allowMultipleVotes, setAllowMultipleVotes] = useState(false)

  const addPollToPost = () => {
    if (!pollQuestion.trim() || pollOptions.some((opt) => !opt.trim())) return

    // In a real app, you would store the poll data to be included in the post
    alert(`Poll "${pollQuestion}" with ${pollOptions.length} options added to your post`)
    setShowPollCreator(false)
  }

  return (
    <div className="modal-container fade-in">
      <div className="modal-content glass slide-down">
        <div className="modal-header">
          <h3 className="font-semibold text-indigo-800">Create Poll</h3>
          <button
            onClick={() => setShowPollCreator(false)}
            className="text-gray-500 hover:text-red-500 transition-colors duration-300 p-1 rounded-full hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="modal-body">
          <div className="mb-4">
            <label htmlFor="pollQuestion" className="block text-gray-700 text-sm font-bold mb-2">
              Question
            </label>
            <input
              type="text"
              id="pollQuestion"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition-all duration-300"
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
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition-all duration-300 mr-2"
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
                    className="text-red-500 hover:text-red-700 transition-colors duration-300 p-1 rounded-full hover:bg-red-50"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => setPollOptions([...pollOptions, ""])}
              className="text-indigo-500 hover:text-indigo-700 transition-colors duration-300 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Add Option
            </button>
          </div>

          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-indigo-600 transition-colors duration-300"
                checked={allowMultipleVotes}
                onChange={() => setAllowMultipleVotes(!allowMultipleVotes)}
              />
              <span className="ml-2 text-gray-700 text-sm">Allow Multiple Votes</span>
            </label>
          </div>

          <button
            onClick={addPollToPost}
            disabled={!pollQuestion.trim() || pollOptions.some((opt) => !opt.trim())}
            className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg text-sm hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 btn-animated"
          >
            Add Poll
          </button>
        </div>
      </div>
    </div>
  )
}
