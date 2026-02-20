import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import AdminLayout from "@/components/AdminLayout";

export default function AdminPostsPage() {
  const posts = getAllPosts();

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
          文章管理
        </h2>
        <Link
          href="/admin/posts/new"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
        >
          新建文章
        </Link>
      </div>

      <div className="bg-white dark:bg-zinc-800 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-zinc-50 dark:bg-zinc-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                标题
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                日期
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                标签
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
            {posts.map((post) => (
              <tr key={post.slug} className="hover:bg-zinc-50 dark:hover:bg-zinc-700/50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-zinc-900 dark:text-white font-medium">
                    {post.title}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-zinc-500 dark:text-zinc-400">
                  {new Date(post.date).toLocaleDateString("zh-CN")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-1">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <Link
                    href={`/admin/posts/${post.slug}`}
                    className="text-blue-500 hover:text-blue-600 mr-4"
                  >
                    编辑
                  </Link>
                  <button className="text-red-500 hover:text-red-600">
                    删除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
