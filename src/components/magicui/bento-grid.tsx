'use client'

import { cn } from '@/lib/utils'
import React from 'react'

interface BentoGridProps {
  children: React.ReactNode
  className?: string
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div className={cn('grid w-full auto-rows-[22rem] grid-cols-3 gap-4', className)}>
      {children}
    </div>
  )
}

interface BentoCardProps {
  name: string
  className?: string
  background?: React.ReactNode
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>
  description?: string
  href?: string
  cta?: string
}

export function BentoCard({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
}: BentoCardProps) {
  return (
    <div
      className={cn(
        'group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl',
        'bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]',
        'dark:bg-zinc-900 dark:[box-shadow:0_0_0_1px_rgba(255,255,255,.1),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]',
        'transform-gpu',
        className
      )}
    >
      <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
        {Icon && (
          <Icon className="h-7 w-7 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75 dark:text-neutral-300" />
        )}
        <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">{name}</h3>
        <p className="max-w-lg text-neutral-400">{description}</p>
      </div>

      {href && cta && (
        <div
          className={cn(
            'pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100'
          )}
        >
          <a
            href={href}
            className="pointer-events-auto text-sm font-medium text-blue-500 hover:underline"
          >
            {cta}
          </a>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:opacity-50">
        {background}
      </div>
    </div>
  )
}
