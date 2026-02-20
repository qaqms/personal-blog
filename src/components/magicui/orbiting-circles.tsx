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
  const totalChildren = childrenArray.length

  return (
    <>
      <div className={cn('absolute flex items-center justify-center', className)}>
        {path && (
          <svg
            className="absolute"
            width={radius * 2 + 60}
            height={radius * 2 + 60}
            viewBox={`0 0 ${radius * 2 + 60} ${radius * 2 + 60}`}
          >
            <circle
              cx={radius + 30}
              cy={radius + 30}
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="4 4"
              className="text-zinc-300 dark:text-zinc-700"
            />
          </svg>
        )}

        {childrenArray.map((child, index) => {
          const delayInSeconds = (delay / totalChildren) * index

          return (
            <div
              key={index}
              className="orbit-container"
              style={{
                position: 'absolute',
                width: radius * 2,
                height: radius * 2,
                animation: `${reverse ? 'orbit-reverse' : 'orbit'} ${calculatedDuration}s linear infinite`,
                animationDelay: `-${delayInSeconds}s`,
              }}
            >
              <div
                className="absolute flex items-center justify-center"
                style={{
                  width: iconSize,
                  height: iconSize,
                  left: radius - iconSize / 2,
                  top: -iconSize / 2,
                  transformOrigin: `${iconSize / 2}px ${radius + iconSize / 2}px`,
                  animation: `${reverse ? 'counter-rotate-reverse' : 'counter-rotate'} ${calculatedDuration}s linear infinite`,
                  animationDelay: `-${delayInSeconds}s`,
                }}
              >
                {child}
              </div>
            </div>
          )
        })}
      </div>

      <style jsx global>{`
        @keyframes orbit {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes orbit-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        @keyframes counter-rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }
        @keyframes counter-rotate-reverse {
          from {
            transform: rotate(-360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        .orbit-container {
          pointer-events: none;
        }
      `}</style>
    </>
  )
}
