'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Project } from '@/lib/data'

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
          <h2 className="text-3xl md:text-4xl font-bold text-center text-zinc-900 dark:text-white mb-12">
            项目作品
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group p-6 bg-white dark:bg-zinc-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer hover:scale-[1.02]"
              >
                <div className="aspect-video bg-zinc-100 dark:bg-zinc-700 rounded-lg mb-4 overflow-hidden flex items-center justify-center">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={80}
                    height={80}
                    className="opacity-50 group-hover:opacity-80 transition-opacity"
                  />
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm line-clamp-2 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative bg-white dark:bg-zinc-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video bg-zinc-100 dark:bg-zinc-700 rounded-t-2xl flex items-center justify-center">
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
                className="absolute top-4 right-4 p-2 bg-white dark:bg-zinc-800 rounded-full shadow-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
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
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">{selectedProject.description}</p>
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
                  className="flex-1 text-center py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg font-medium hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
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
        </div>
      )}
    </>
  )
}
