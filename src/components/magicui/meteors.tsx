'use client'

import { cn } from '@/lib/utils'

interface MeteorsProps {
  number?: number
  minDelay?: number
  maxDelay?: number
  minDuration?: number
  maxDuration?: number
  angle?: number
  className?: string
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}

function generateMeteors(
  number: number,
  minDelay: number,
  maxDelay: number,
  minDuration: number,
  maxDuration: number
) {
  return Array.from({ length: number }, (_, i) => {
    const seed = i + 1
    return {
      id: i,
      delay: seededRandom(seed * 1.1) * (maxDelay - minDelay) + minDelay,
      duration: seededRandom(seed * 2.2) * (maxDuration - minDuration) + minDuration,
      left: seededRandom(seed * 3.3) * 100,
      top: seededRandom(seed * 4.4) * 100,
    }
  })
}

export function Meteors({
  number = 20,
  minDelay = 0.2,
  maxDelay = 1.2,
  minDuration = 2,
  maxDuration = 10,
  angle = 215,
  className,
}: MeteorsProps) {
  const meteors = generateMeteors(number, minDelay, maxDelay, minDuration, maxDuration)

  return (
    <>
      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className={cn(
            'absolute h-0.5 w-0.5 rounded-[9999px] shadow-[0_0_0_1px_#ffffff10]',
            "before:absolute before:h-[1px] before:w-[50px] before:content-['']",
            'before:bg-gradient-to-r before:from-white/50 before:to-transparent',
            className
          )}
          style={{
            top: `${meteor.top}%`,
            left: `${meteor.left}%`,
            transform: `rotate(${angle}deg)`,
            animation: `meteor ${meteor.duration}s linear ${meteor.delay}s infinite`,
          }}
        />
      ))}
      <style jsx global>{`
        @keyframes meteor {
          0% {
            transform: rotate(${angle}deg) translateX(0);
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: rotate(${angle}deg) translateX(-500px);
            opacity: 0;
          }
        }
      `}</style>
    </>
  )
}
