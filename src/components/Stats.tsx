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
    <div className="w-full aspect-[2/1] relative">
      <svg viewBox="0 0 1000 500" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="worldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <filter id="worldGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width="1000" height="500" fill="transparent" />

        {/* 网格线 */}
        <g stroke="currentColor" strokeWidth="0.3" opacity="0.2" className="text-zinc-400">
          <line x1="0" y1="125" x2="1000" y2="125" />
          <line x1="0" y1="250" x2="1000" y2="250" />
          <line x1="0" y1="375" x2="1000" y2="375" />
          <line x1="250" y1="0" x2="250" y2="500" />
          <line x1="500" y1="0" x2="500" y2="500" />
          <line x1="750" y1="0" x2="750" y2="500" />
        </g>

        {/* 北美洲 */}
        <path
          d="M120,100 
             L180,90 L220,95 L260,110 L280,100 L300,115 
             L295,140 L280,160 L260,180 L240,200 L220,220 
             L200,240 L180,250 L160,260 L150,280 L140,300 
             L130,280 L120,260 L110,240 L100,200 L95,160 
             L100,130 L110,110 Z"
          fill="url(#worldGradient)"
          opacity="0.8"
        />

        {/* 南美洲 */}
        <path
          d="M220,290 
             L250,285 L270,295 L280,320 L275,350 L260,380 
             L240,400 L220,410 L200,400 L190,370 L195,340 
             L200,310 L210,295 Z"
          fill="url(#worldGradient)"
          opacity="0.8"
        />

        {/* 欧洲 */}
        <path
          d="M440,90 
             L480,85 L520,90 L540,100 L550,120 L545,140 
             L530,155 L510,165 L490,170 L470,165 L450,155 
             L440,140 L435,120 L440,100 Z"
          fill="url(#worldGradient)"
          opacity="0.8"
        />

        {/* 非洲 */}
        <path
          d="M460,180 
             L500,175 L530,185 L545,210 L550,250 L545,290 
             L530,330 L510,360 L480,375 L450,365 L435,330 
             L430,290 L435,250 L445,210 L455,190 Z"
          fill="url(#worldGradient)"
          opacity="0.8"
        />

        {/* 亚洲 */}
        <path
          d="M560,80 
             L620,75 L680,80 L740,90 L780,85 L820,95 
             L850,120 L860,160 L850,200 L830,240 L800,270 
             L760,290 L720,300 L680,295 L640,280 L600,260 
             L570,230 L550,190 L545,150 L550,110 L555,90 Z"
          fill="url(#worldGradient)"
          opacity="0.8"
        />

        {/* 澳大利亚 */}
        <path
          d="M750,320 
             L800,315 L840,330 L855,360 L845,400 L815,420 
             L770,415 L740,395 L735,360 L740,335 Z"
          fill="url(#worldGradient)"
          opacity="0.8"
        />

        {/* 访问热点 - 中国 */}
        <g filter="url(#worldGlow)">
          <circle cx="720" cy="180" r="8" fill="#ef4444" className="animate-pulse" />
          <circle cx="700" cy="200" r="6" fill="#f97316" className="animate-pulse" />
          <circle cx="740" cy="210" r="5" fill="#fbbf24" className="animate-pulse" />
        </g>

        {/* 访问热点 - 其他地区 */}
        <g filter="url(#worldGlow)">
          <circle cx="500" cy="130" r="5" fill="#22c55e" className="animate-pulse" />
          <circle cx="200" cy="180" r="5" fill="#3b82f6" className="animate-pulse" />
          <circle cx="800" cy="380" r="4" fill="#a855f7" className="animate-pulse" />
        </g>

        {/* 地区标签 */}
        <g className="text-zinc-500 dark:text-zinc-400" fill="currentColor" fontSize="12">
          <text x="180" y="200" textAnchor="middle">
            北美
          </text>
          <text x="230" y="360" textAnchor="middle">
            南美
          </text>
          <text x="490" y="135" textAnchor="middle">
            欧洲
          </text>
          <text x="490" y="290" textAnchor="middle">
            非洲
          </text>
          <text x="700" y="250" textAnchor="middle">
            亚洲
          </text>
          <text x="790" y="375" textAnchor="middle">
            大洋洲
          </text>
        </g>
      </svg>

      {/* 图例 */}
      <div className="absolute bottom-2 right-2 flex gap-3 text-xs text-zinc-500 dark:text-zinc-400">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-red-500"></span>
          高访问
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-orange-500"></span>
          中访问
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
          低访问
        </span>
      </div>
    </div>
  )
}
