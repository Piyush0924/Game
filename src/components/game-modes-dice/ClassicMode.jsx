"use client"

import React from "react"
import GameModeTemplate from "../GameModeTemplate"
import { useNavigate } from "react-router-dom"

export default function ClassicMode({ onBack, gameTitle = "Dice" }) {
  const navigate = useNavigate()
  
  // Classic mode data for Dice with adjusted prize amounts based on the image
  const gameOptions = [
    {
      id: 1,
      name: "Low Stakes",
      prize: "₹8",
      entryFee: "₹5",
      players: "2 Players",
      playerCount: "54",
      liveCount: "34",
      winners: "1 Winner",
      timeRemaining: "00m 30s"
    },
    {
      id: 2,
      name: "Medium Stakes",
      prize: "₹15",
      entryFee: "₹10",
      players: "2 Players",
      playerCount: "45",
      liveCount: "28",
      winners: "1 Winner",
      timeRemaining: "01m 30s"
    },
    {
      id: 3,
      name: "High Stakes",
      prize: "₹20",
      entryFee: "₹15",
      players: "2 Players",
      playerCount: "22",
      liveCount: "14",
      winners: "1 Winner",
      timeRemaining: "02m 00s"
    }
  ]
  
  return (
    <GameModeTemplate
      onBack={onBack}
      gameTitle={gameTitle}
      modeType="Classic"
      gameOptions={gameOptions}
      logoSrc="/images/games/dice-logo.png"
    />
  )
} 