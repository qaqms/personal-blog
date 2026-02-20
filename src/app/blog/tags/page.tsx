import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function TagsPage() {
  const posts = getAllPosts();
  const tagCounts: Record<string, number> = {};

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  const sortedTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-8">
          标签
        </h1>

        {sortedTags.length === 0 ? (
          <p className="text-zinc-600 dark:text-zinc-400">暂无标签。</p>
        ) : (
          <div className="flex flex-wrap gap-3">
            {sortedTags.map(([tag, count]) => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              >
                <span className="text-zinc-900 dark:text-white font-medium">{tag}</span>
                <span className="text-zinc-500 dark:text-zinc-400 text-sm">{count}</span>
              </Link>
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
