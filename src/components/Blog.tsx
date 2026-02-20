'use client'

import Link from 'next/link'
import type { PostMeta } from '@/lib/posts'

interface BlogProps {
  posts: PostMeta[]
}

export default function Blog({ posts }: BlogProps) {
  const recentPosts = posts.slice(0, 3)

  return (
    <section id="blog" className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-zinc-900 dark:text-white mb-12">
          最新文章
        </h2>
        {recentPosts.length === 0 ? (
          <p className="text-center text-zinc-600 dark:text-zinc-400">暂无文章，请稍后再来！</p>
        ) : (
          <div className="space-y-6">
            {recentPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block p-6 bg-white dark:bg-zinc-800 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <time className="text-sm text-zinc-500 dark:text-zinc-400">
                  {new Date(post.date).toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mt-2 mb-2">
                  {post.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">{post.excerpt}</p>
                <div className="flex gap-2 mt-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        )}
        {posts.length > 3 && (
          <div className="text-center mt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium rounded-full hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all duration-300 hover:scale-105"
            >
              查看全部文章
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
