'use client'

import { cn } from '@/lib/utils'
import React from 'react'

interface AnimatedGradientTextProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  speed?: number
  colorFrom?: string
  colorTo?: string
}

export function AnimatedGradientText({
  children,
  className,
  speed = 1,
  colorFrom = '#ffaa40',
  colorTo = '#9c40ff',
  ...props
}: AnimatedGradientTextProps) {
  return (
    <div className={cn('relative inline-block', className)} {...props}>
      <span
        className="animate-gradient bg-clip-text text-transparent bg-[length:200%_auto]"
        style={{
          backgroundImage: `linear-gradient(to right, ${colorFrom}, ${colorTo}, ${colorFrom})`,
          animationDuration: `${speed}s`,
        }}
      >
        {children}
      </span>
      <style jsx>{`
        @keyframes gradient {
          0% {
            background-position: 0% center;
          }
          100% {
            background-position: 200% center;
          }
        }
        .animate-gradient {
          animation: gradient linear infinite;
        }
      `}</style>
    </div>
  )
}
