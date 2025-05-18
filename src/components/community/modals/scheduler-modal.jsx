"use client"

import { useState } from "react"
import { X } from "lucide-react"

export default function SchedulerModal({ users, gameOptions, setShowScheduler }) {
  const [selectedGame, setSelectedGame] = useState(null)
  const [taggedPeople, setTaggedPeople] = useState([])
  const [scheduleDate, setScheduleDate] = useState("")
  const [scheduleTime, setScheduleTime] = useState("")

  return (
    <div className="modal-container fade-in">
      <div className="modal-content glass slide-down">
        <div className="modal-header">
          <h3 className="font-semibold text-purple-800">Schedule Game Session</h3>
          <button
            onClick={() => setShowScheduler(false)}
            className="text-gray-500 hover:text-red-500 transition-colors duration-300 p-1 rounded-full hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="modal-body">
          <div className="mb-4">
            <label htmlFor="gameSelect" className="block text-gray-700 text-sm font-bold mb-2">
              Select Game
            </label>
            <div className="relative">
              <select
                id="gameSelect"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-purple-300 focus:border-purple-300 transition-all duration-300"
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
                <div
                  key={user.id}
                  className="flex items-center p-2 hover:bg-purple-50 border-b last:border-b-0 transition-colors duration-300"
                >
                  <input
                    type="checkbox"
                    id={`user-${user.id}`}
                    className="mr-2 h-4 w-4 text-purple-600 transition-colors duration-300"
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
                    <img
                      src={user.avatar || "/placeholder.svg"}
                      alt=""
                      className="w-6 h-6 rounded-full mr-2 transition-transform duration-300 hover:scale-110"
                    />
                    <span className="text-sm">{user.name}</span>
                  </label>
                  {user.isOnline && <span className="inline-block w-2 h-2 bg-green-500 rounded-full pulse"></span>}
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
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-purple-300 focus:border-purple-300 transition-all duration-300"
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
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-purple-300 focus:border-purple-300 transition-all duration-300"
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-purple-300 focus:border-purple-300 transition-all duration-300"
              placeholder="Add notes about the game session..."
              rows={3}
            ></textarea>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setShowScheduler(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-400 transition-all duration-300 transform hover:scale-105"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (taggedPeople.length > 0 && selectedGame && scheduleDate && scheduleTime) {
                  alert(
                    `Game session scheduled with ${taggedPeople.length} player(s) for ${scheduleDate} at ${scheduleTime}`,
                  )
                  setShowScheduler(false)
                } else {
                  alert("Please select a game, at least one player, and set a date and time")
                }
              }}
              disabled={!selectedGame || taggedPeople.length === 0 || !scheduleDate || !scheduleTime}
              className="px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-lg text-sm hover:from-pink-600 hover:to-orange-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 btn-animated"
            >
              Schedule Game
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
