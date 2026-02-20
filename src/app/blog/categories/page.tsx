import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function CategoriesPage() {
  const posts = getAllPosts();
  const categoryMap: Record<string, { count: number; posts: Array<{ slug: string; title: string; date: string }> }> = {};

  posts.forEach((post) => {
    const category = post.tags[0] || "未分类";

    if (!categoryMap[category]) {
      categoryMap[category] = { count: 0, posts: [] };
    }
    categoryMap[category].count++;
    categoryMap[category].posts.push({
      slug: post.slug,
      title: post.title,
      date: post.date,
    });
  });

  const categories = Object.entries(categoryMap).sort((a, b) => b[1].count - a[1].count);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-8">
          分类
        </h1>

        {categories.length === 0 ? (
          <p className="text-zinc-600 dark:text-zinc-400">暂无分类。</p>
        ) : (
          <div className="space-y-6">
            {categories.map(([category, data]) => (
              <div key={category} className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
                    {category}
                  </h2>
                  <span className="text-zinc-500 dark:text-zinc-400">
                    {data.count} 篇文章
                  </span>
                </div>
                <div className="space-y-2">
                  {data.posts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="block text-zinc-600 dark:text-zinc-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                    >
                      {post.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <Link
          href="/blog"
          className="inline-flex items-center gap-2 mt-8 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          返回博客
        </Link>
      </div>
    </div>
  );
}
