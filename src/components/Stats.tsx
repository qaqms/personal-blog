'use client'

import { useEffect, useRef, useState } from 'react'

interface StatItem {
  label: string
  value: number
  suffix?: string
  icon: string
}

const stats: StatItem[] = [
  { label: '文章数量', value: 15, suffix: '+', icon: '📝' },
  { label: '开源项目', value: 8, suffix: '+', icon: '🚀' },
  { label: '代码提交', value: 500, suffix: '+', icon: '💻' },
  { label: '访问量', value: 10000, suffix: '+', icon: '👀' },
]

const visitorLocations = [
  { city: '北京', count: 1234 },
  { city: '上海', count: 987 },
  { city: '深圳', count: 654 },
  { city: '杭州', count: 432 },
  { city: '广州', count: 321 },
]

export default function Stats() {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedValues, setAnimatedValues] = useState(stats.map(() => 0))
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const currentRef = sectionRef.current
    if (!currentRef) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(currentRef)
    return () => observer.unobserve(currentRef)
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000
    const steps = 60
    const interval = duration / steps

    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      setAnimatedValues(stats.map((stat) => Math.floor((stat.value * currentStep) / steps)))
      if (currentStep >= steps) {
        clearInterval(timer)
        setAnimatedValues(stats.map((stat) => stat.value))
      }
    }, interval)

    return () => clearInterval(timer)
  }, [isVisible])

  return (
    <section ref={sectionRef} id="stats" className="py-20 px-6 bg-zinc-50 dark:bg-zinc-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-zinc-900 dark:text-white mb-12">
          网站统计
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`text-center p-6 bg-white dark:bg-zinc-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-bold text-blue-500 dark:text-blue-400 mb-2">
                {animatedValues[index].toLocaleString()}
                {stat.suffix}
              </div>
              <div className="text-zinc-600 dark:text-zinc-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div
            className={`bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-sm transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'
            }`}
          >
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
              <span>🗺️</span> 访客来源
            </h3>
            <div className="relative">
              <WorldMap />
            </div>
          </div>

          <div
            className={`bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-sm transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-5'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
              <span>📍</span> 热门城市
            </h3>
            <div className="space-y-4">
              {visitorLocations.map((location, index) => {
                const maxCount = visitorLocations[0].count
                const percentage = (location.count / maxCount) * 100
                return (
                  <div key={location.city} className="group">
                    <div className="flex justify-between mb-2">
                      <span className="text-zinc-700 dark:text-zinc-300 font-medium">
                        {location.city}
                      </span>
                      <span className="text-zinc-500 dark:text-zinc-400 text-sm">
                        {location.count.toLocaleString()} 次访问
                      </span>
                    </div>
                    <div className="h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out group-hover:from-blue-400 group-hover:to-purple-400"
                        style={{
                          width: isVisible ? `${percentage}%` : '0%',
                          transitionDelay: `${index * 100}ms`,
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div
          className={`mt-12 text-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <p className="text-zinc-600 dark:text-zinc-400">
            感谢每一位访问者的支持！数据每24小时更新一次
          </p>
        </div>
      </div>
    </section>
  )
}

function WorldMap() {
  return (
    <svg viewBox="0 0 800 400" className="w-full h-auto opacity-80 dark:opacity-60">
      <defs>
        <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="800" height="400" fill="transparent" />

      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        className="text-zinc-300 dark:text-zinc-600"
      >
        <path d="M400,0 L400,400" />
        <path d="M0,200 L800,200" />
        <circle cx="400" cy="200" r="50" />
        <circle cx="400" cy="200" r="100" />
        <circle cx="400" cy="200" r="150" />
      </g>

      <g fill="url(#mapGradient)" className="text-blue-500 dark:text-blue-400">
        <path d="M160,120 Q200,100 240,110 L250,140 Q220,160 180,150 Z" />
        <path d="M150,150 Q180,180 200,200 L180,230 Q150,210 140,180 Z" />
        <path d="M200,200 Q250,190 280,210 L290,250 Q260,280 220,270 L200,240 Z" />

        <path d="M350,80 Q420,70 480,90 L490,130 Q450,160 390,150 L360,120 Z" />
        <path d="M380,150 Q430,170 460,200 L450,250 Q400,260 370,240 L360,200 Z" />

        <path d="M520,100 Q600,90 680,110 L700,180 Q660,220 580,210 L530,160 Z" />

        <path d="M600,250 Q650,240 700,260 L710,320 Q670,350 620,340 L590,300 Z" />

        <path d="M130,280 Q180,270 220,290 L230,340 Q190,370 140,360 L120,320 Z" />
      </g>

      <g filter="url(#glow)">
        <circle cx="180" cy="160" r="6" fill="#ef4444" className="animate-pulse" />
        <circle cx="210" cy="180" r="5" fill="#f97316" className="animate-pulse" />
        <circle cx="420" cy="140" r="6" fill="#ef4444" className="animate-pulse" />
        <circle cx="620" cy="170" r="5" fill="#f97316" className="animate-pulse" />
        <circle cx="650" cy="290" r="4" fill="#eab308" className="animate-pulse" />
      </g>

      <g className="text-zinc-400 dark:text-zinc-500" fill="currentColor" fontSize="10">
        <text x="160" y="195">
          中国
        </text>
        <text x="400" y="175">
          欧洲
        </text>
        <text x="600" y="195">
          北美
        </text>
        <text x="630" y="340">
          澳洲
        </text>
      </g>
    </svg>
  )
}
