"use client"

import { ChevronLeft } from "lucide-react"

export default function GameModeLayout({ title, children, onBack }) {
  return (
    <div className="flex flex-col h-full min-h-screen">
      <div className="p-4 flex items-center border-b border-gray-800 bg-gray-900">
        <button className="mr-3 text-white" onClick={onBack}>
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-white">{title}</h1>
      </div>
      <div className="flex-grow p-4 bg-gray-900 text-white overflow-hidden">{children}</div>
    </div>
  )
}