'use client'

import { useState, useEffect, useRef } from 'react'
import { Marquee } from '@/components/magicui/marquee'
import { AnimatedGradientText } from '@/components/magicui/animated-gradient-text'
import { Meteors } from '@/components/magicui/meteors'

const roles = ['全栈开发者', '前端工程师', '开源爱好者', '技术博主']

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/qaqms',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'Bilibili',
    url: 'https://space.bilibili.com',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373z" />
      </svg>
    ),
  },
  {
    name: 'Email',
    url: 'mailto:hello@example.com',
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
]

const techStack = [
  { name: 'React', icon: '⚛️' },
  { name: 'Next.js', icon: '▲' },
  { name: 'TypeScript', icon: '📘' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'Python', icon: '🐍' },
  { name: 'Tailwind', icon: '🎨' },
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'Docker', icon: '🐳' },
  { name: 'Git', icon: '📦' },
  { name: 'AWS', icon: '☁️' },
]

function useTypingEffect(
  words: string[],
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000
) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const mountedRef = useRef(true)

  useEffect(() => {
    return () => {
      mountedRef.current = false
    }
  }, [])

  useEffect(() => {
    const currentWord = words[currentIndex]

    const timeout = setTimeout(
      () => {
        if (!mountedRef.current) return

        if (!isDeleting) {
          if (displayText.length < currentWord.length) {
            setDisplayText(currentWord.slice(0, displayText.length + 1))
          } else {
            setTimeout(() => {
              if (mountedRef.current) setIsDeleting(true)
            }, pauseDuration)
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1))
          } else {
            setIsDeleting(false)
            setCurrentIndex((prev) => (prev + 1) % words.length)
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    )

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentIndex, words, typingSpeed, deletingSpeed, pauseDuration])

  return displayText
}

export default function Hero() {
  const displayText = useTypingEffect(roles)

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <Meteors number={15} />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8 max-w-3xl mx-auto text-center">
        <div className="relative">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-1 animate-pulse">
            <div className="w-full h-full rounded-full bg-white dark:bg-zinc-900 flex items-center justify-center overflow-hidden">
              <AnimatedGradientText
                className="text-4xl md:text-5xl font-bold"
                colorFrom="#3b82f6"
                colorTo="#a855f7"
              >
                QAQ
              </AnimatedGradientText>
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-zinc-900 animate-pulse"></div>
        </div>

        <div className="space-y-4">
          <p className="text-zinc-500 dark:text-zinc-400 text-sm uppercase tracking-wider">
            你好，我是
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white">你的名字</h1>
          <div className="h-8 md:h-10 flex items-center justify-center">
            <span className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-300">
              我是一名{' '}
              <AnimatedGradientText className="font-medium" colorFrom="#3b82f6" colorTo="#a855f7">
                {displayText}
                <span className="animate-blink">|</span>
              </AnimatedGradientText>
            </span>
          </div>
        </div>

        <p className="text-zinc-600 dark:text-zinc-400 text-lg max-w-xl leading-relaxed">
          我在互联网上分享编程、技术和生活的故事。欢迎来到我的个人空间。
        </p>

        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-white transition-all duration-300 hover:scale-110"
              aria-label={link.name}
            >
              {link.icon}
            </a>
          ))}
        </div>

        <a
          href="#about"
          className="mt-4 px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
        >
          了解更多关于我
        </a>
      </div>

      <div className="absolute bottom-10 left-0 right-0">
        <Marquee className="opacity-30" pauseOnHover>
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className="flex items-center gap-2 px-6 py-2 mx-2 bg-zinc-100 dark:bg-zinc-800 rounded-full"
            >
              <span className="text-xl">{tech.icon}</span>
              <span className="text-sm text-zinc-600 dark:text-zinc-400">{tech.name}</span>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  )
}
