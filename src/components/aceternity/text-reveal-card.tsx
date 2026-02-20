'use client'

import React, { useState, useRef } from 'react'
import { cn } from '@/lib/utils'

interface TextRevealCardProps {
  children: React.ReactNode
  className?: string
  revealText: string
}

export function TextRevealCard({ children, className, revealText }: TextRevealCardProps) {
  const [isRevealed, setIsRevealed] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <div
      ref={cardRef}
      className={cn('relative overflow-hidden rounded-xl cursor-pointer group', className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsRevealed(true)}
      onMouseLeave={() => setIsRevealed(false)}
    >
      <div className="relative z-10">{children}</div>

      <div
        className="absolute inset-0 z-20 flex items-center justify-center bg-gradient-to-br from-blue-500/90 to-purple-500/90 transition-opacity duration-300"
        style={{
          opacity: isRevealed ? 1 : 0,
          WebkitMaskImage: `radial-gradient(100px circle at ${position.x}px ${position.y}px, black, transparent)`,
          maskImage: `radial-gradient(100px circle at ${position.x}px ${position.y}px, black, transparent)`,
        }}
      >
        <span className="text-white font-semibold text-lg">{revealText}</span>
      </div>
    </div>
  )
}
