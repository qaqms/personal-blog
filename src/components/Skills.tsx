'use client'

import { useEffect, useRef, useState } from 'react'
import { Marquee } from '@/components/magicui/marquee'

const skills = [
  { name: 'JavaScript / TypeScript', level: 90 },
  { name: 'React / Next.js', level: 85 },
  { name: 'Node.js', level: 80 },
  { name: 'Python', level: 75 },
  { name: 'CSS / Tailwind', level: 85 },
  { name: 'SQL / 数据库', level: 70 },
]

const techStack = [
  { name: 'React', icon: '⚛️', color: 'bg-blue-500' },
  { name: 'Next.js', icon: '▲', color: 'bg-black dark:bg-white' },
  { name: 'TypeScript', icon: '📘', color: 'bg-blue-600' },
  { name: 'Node.js', icon: '🟢', color: 'bg-green-500' },
  { name: 'Python', icon: '🐍', color: 'bg-yellow-500' },
  { name: 'Tailwind', icon: '🎨', color: 'bg-cyan-500' },
  { name: 'PostgreSQL', icon: '🐘', color: 'bg-blue-700' },
  { name: 'Docker', icon: '🐳', color: 'bg-blue-400' },
  { name: 'Git', icon: '📦', color: 'bg-orange-500' },
  { name: 'AWS', icon: '☁️', color: 'bg-orange-400' },
  { name: 'GraphQL', icon: '◈', color: 'bg-pink-500' },
  { name: 'Redis', icon: '🔴', color: 'bg-red-500' },
]

const techStackRow1 = techStack.slice(0, 6)
const techStackRow2 = techStack.slice(6)

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false)
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

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="min-h-screen flex items-center justify-center px-6 py-20"
    >
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-zinc-900 dark:text-white mb-12">
          技能与技术栈
        </h2>

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200 mb-4">
              熟练程度
            </h3>
            {skills.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between mb-2">
                  <span className="text-zinc-700 dark:text-zinc-300 font-medium">{skill.name}</span>
                  <span className="text-zinc-500 dark:text-zinc-400">{skill.level}%</span>
                </div>
                <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: isVisible ? `${skill.level}%` : '0%',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200 mb-4">技术栈</h3>
            <div className="grid grid-cols-4 gap-4">
              {techStack.map((tech) => (
                <div
                  key={tech.name}
                  className={`flex flex-col items-center justify-center p-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all duration-300 hover:scale-105 cursor-pointer ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                  }`}
                >
                  <span className="text-2xl mb-2">{tech.icon}</span>
                  <span className="text-xs text-zinc-600 dark:text-zinc-400 text-center">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200 mb-4 text-center">
            更多技术
          </h3>
          <div className="relative overflow-hidden py-4">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white dark:from-zinc-950 to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white dark:from-zinc-950 to-transparent z-10" />
            <Marquee pauseOnHover className="[--duration:30s]">
              {techStackRow1.map((tech) => (
                <div
                  key={tech.name}
                  className="flex items-center gap-3 px-6 py-3 mx-3 bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-700 hover:shadow-md transition-shadow"
                >
                  <span className="text-2xl">{tech.icon}</span>
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {tech.name}
                  </span>
                </div>
              ))}
            </Marquee>
          </div>
          <div className="relative overflow-hidden py-4">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white dark:from-zinc-950 to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white dark:from-zinc-950 to-transparent z-10" />
            <Marquee pauseOnHover reverse className="[--duration:30s]">
              {techStackRow2.map((tech) => (
                <div
                  key={tech.name}
                  className="flex items-center gap-3 px-6 py-3 mx-3 bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-700 hover:shadow-md transition-shadow"
                >
                  <span className="text-2xl">{tech.icon}</span>
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {tech.name}
                  </span>
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  )
}
