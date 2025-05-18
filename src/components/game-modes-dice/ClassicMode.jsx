"use client"

import React from "react"
import GameModeTemplate from "../GameModeTemplate"
import { useNavigate } from "react-router-dom"

export default function ClassicMode({ onBack, gameTitle = "Dice" }) {
  const navigate = useNavigate()
  
  // Classic mode data for Dice with adjusted prize amounts
  const gameOptions = [
    {
      id: 1,
      name: "Standard Dice",
      prize: "₹17",
      entryFee: "₹10",
      players: "2 Players",
      playerCount: "244",
      liveCount: "24",
      winners: "1 Winner",
      xp: 5,
      timeRemaining: "00m 30s"
    },
    {
      id: 2,
      name: "Premium Dice",
      prize: "₹2,000",
      entryFee: "₹1,000",
      players: "2 Players",
      playerCount: "45",
      liveCount: "12",
      winners: "1 Winner",
      xp: 50,
      timeRemaining: "01m 30s"
    },
    {
      id: 3,
      name: "Low Stakes",
      prize: "₹45",
      entryFee: "₹25",
      players: "2 Players",
      playerCount: "122",
      liveCount: "22",
      winners: "1 Winner",
      xp: 8,
      timeRemaining: "02m 00s"
    }
  ]
  
  return (
    <GameModeTemplate
      onBack={onBack}
      gameTitle={gameTitle}
      modeType="Classic"
      gameOptions={gameOptions}
      logoSrc="/dice.png"
    />
  )
} 