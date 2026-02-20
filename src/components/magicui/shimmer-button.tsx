'use client'

import { cn } from '@/lib/utils'
import React from 'react'

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string
  borderRadius?: string
  shimmerDuration?: string
  background?: string
  children?: React.ReactNode
}

export const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      shimmerColor = '#ffffff',
      borderRadius = '100px',
      shimmerDuration = '3s',
      background = 'rgba(0, 0, 0, 1)',
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center overflow-hidden font-medium transition-all active:scale-[0.98]',
          className
        )}
        style={{
          borderRadius,
          background,
        }}
        {...props}
      >
        <div className="absolute inset-0 overflow-hidden" style={{ borderRadius }}>
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(90deg, transparent, ${shimmerColor}, transparent)`,
              animation: `shimmer ${shimmerDuration} infinite linear`,
              backgroundSize: `200% 100%`,
            }}
          />
        </div>
        <span className="relative z-10">{children}</span>
        <style jsx>{`
          @keyframes shimmer {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }
        `}</style>
      </button>
    )
  }
)

ShimmerButton.displayName = 'ShimmerButton'
