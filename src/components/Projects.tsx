'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Project } from '@/lib/data'
import { Card3D } from '@/components/aceternity/card-3d'
import { SpotlightCard } from '@/components/aceternity/spotlight-card'

interface ProjectsProps {
  projects: Project[]
}

export default function Projects({ projects }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <>
      <section
        id="projects"
        className="min-h-screen flex items-center justify-center px-6 py-20 bg-zinc-50 dark:bg-zinc-900"
      >
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-zinc-900 dark:text-white mb-4">
            项目作品
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-center mb-12">悬停卡片查看3D效果</p>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <Card3D key={project.id} containerClassName="h-full">
                <SpotlightCard
                  className="h-full cursor-pointer"
                  spotlightColor="rgba(59, 130, 246, 0.1)"
                >
                  <div onClick={() => setSelectedProject(project)} className="group p-6 h-full">
                    <div className="aspect-video bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700 rounded-lg mb-4 overflow-hidden flex items-center justify-center relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={80}
                        height={80}
                        className="opacity-50 group-hover:opacity-80 group-hover:scale-110 transition-all duration-300"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm line-clamp-2 mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              </Card3D>
            ))}
          </div>
        </div>
      </section>

      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={() => setSelectedProject(null)}
        >
          <Card3D containerClassName="max-w-2xl w-full">
            <div
              className="relative bg-white dark:bg-zinc-800 rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-video bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-700 dark:to-zinc-800 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  width={120}
                  height={120}
                  className="opacity-50"
                />
              </div>
              <div className="p-6">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 bg-white dark:bg-zinc-800 rounded-full shadow-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors z-10"
                >
                  <svg
                    className="w-5 h-5 text-zinc-600 dark:text-zinc-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4 pr-10">
                  {selectedProject.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                  {selectedProject.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-[1.02]"
                  >
                    查看代码
                  </a>
                  {selectedProject.demo && (
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-3 border border-zinc-300 dark:border-zinc-600 text-zinc-900 dark:text-white rounded-lg font-medium hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
                    >
                      在线演示
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Card3D>
        </div>
      )}
    </>
  )
}
