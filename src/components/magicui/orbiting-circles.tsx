'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface OrbitingCirclesProps {
  className?: string
  children?: React.ReactNode
  reverse?: boolean
  duration?: number
  delay?: number
  radius?: number
  path?: boolean
  iconSize?: number
  speed?: number
}

export function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  delay = 10,
  radius = 160,
  path = true,
  iconSize = 30,
  speed = 1,
}: OrbitingCirclesProps) {
  const calculatedDuration = duration / speed
  const childrenArray = React.Children.toArray(children)

  return (
    <>
      <div className={cn('absolute flex items-center justify-center', className)}>
        {path && (
          <div
            className="absolute rounded-full border border-zinc-300/50 dark:border-zinc-700/50"
            style={{
              width: radius * 2,
              height: radius * 2,
            }}
          />
        )}

        {childrenArray.map((child, index) => {
          const delayInSeconds = (delay / childrenArray.length) * index

          return (
            <div
              key={index}
              className="absolute flex items-center justify-center orbit-item"
              style={
                {
                  width: iconSize,
                  height: iconSize,
                  animationDuration: `${calculatedDuration}s`,
                  animationDelay: `${delayInSeconds}s`,
                  animationDirection: reverse ? 'reverse' : 'normal',
                  '--orbit-radius': `${radius}px`,
                } as React.CSSProperties
              }
            >
              {child}
            </div>
          )
        })}
      </div>

      <style jsx global>{`
        .orbit-item {
          animation: orbit linear infinite;
        }
        @keyframes orbit {
          from {
            transform: rotate(0deg) translateX(var(--orbit-radius)) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateX(var(--orbit-radius)) rotate(-360deg);
          }
        }
      `}</style>
    </>
  )
}
