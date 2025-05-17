"use client"

import { useState } from "react"
import { X } from "lucide-react"

export default function CreateEventModal({ users, events, setShowCreateEvent }) {
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    description: "",
    location: "",
  })

  return (
    <div className="modal-container fade-in">
      <div className="modal-content glass slide-down">
        <div className="modal-header">
          <h3 className="font-semibold text-orange-800">Create New Event</h3>
          <button
            onClick={() => setShowCreateEvent(false)}
            className="text-gray-500 hover:text-red-500 transition-colors duration-300 p-1 rounded-full hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="modal-body">
          <div className="mb-4">
            <label htmlFor="eventTitle" className="block text-gray-700 text-sm font-bold mb-2">
              Event Title
            </label>
            <input
              type="text"
              id="eventTitle"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-orange-300 focus:border-orange-300 transition-all duration-300"
              placeholder="Enter event title"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="eventDate" className="block text-gray-700 text-sm font-bold mb-2">
                Date
              </label>
              <input
                type="date"
                id="eventDate"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-orange-300 focus:border-orange-300 transition-all duration-300"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="eventTime" className="block text-gray-700 text-sm font-bold mb-2">
                Time
              </label>
              <input
                type="time"
                id="eventTime"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-orange-300 focus:border-orange-300 transition-all duration-300"
                value={newEvent.time}
                onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="eventLocation" className="block text-gray-700 text-sm font-bold mb-2">
              Location
            </label>
            <input
              type="text"
              id="eventLocation"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-orange-300 focus:border-orange-300 transition-all duration-300"
              placeholder="Enter event location"
              value={newEvent.location}
              onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="eventDescription" className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              id="eventDescription"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-orange-300 focus:border-orange-300 transition-all duration-300"
              placeholder="Describe your event"
              rows={3}
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Invite Participants</label>
            <div className="max-h-32 overflow-y-auto mb-2 border rounded-lg">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center p-2 hover:bg-orange-50 border-b last:border-b-0 transition-colors duration-300"
                >
                  <input
                    type="checkbox"
                    id={`event-user-${user.id}`}
                    className="mr-2 h-4 w-4 text-orange-600 transition-colors duration-300"
                  />
                  <label htmlFor={`event-user-${user.id}`} className="flex items-center cursor-pointer flex-1">
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
          </div>

          <button
            onClick={() => {
              if (newEvent.title && newEvent.date && newEvent.time) {
                const createdEvent = {
                  id: events.length + 1,
                  ...newEvent,
                  participants: [1, 2, 3].sort(() => Math.random() - 0.5),
                }
                // In a real app, you would add this event to your state
                setNewEvent({
                  title: "",
                  date: "",
                  time: "",
                  description: "",
                  location: "",
                })
                setShowCreateEvent(false)
                alert("Event created successfully!")
              } else {
                alert("Please fill in all required fields")
              }
            }}
            disabled={!newEvent.title || !newEvent.date || !newEvent.time}
            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg text-sm hover:from-orange-600 hover:to-amber-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 btn-animated"
          >
            Create Event
          </button>
        </div>
      </div>
    </div>
  )
}
