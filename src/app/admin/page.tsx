import AdminLayout from "@/components/AdminLayout";

export default function AdminPage() {
  return (
    <AdminLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="文章总数" value="12" icon="📝" />
        <StatCard title="总浏览量" value="1,234" icon="👀" />
        <StatCard title="标签数量" value="8" icon="🏷️" />
        <StatCard title="项目数量" value="4" icon="🚀" />
      </div>

      <div className="mt-8 bg-white dark:bg-zinc-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
          最近动态
        </h3>
        <div className="space-y-4">
          <ActivityItem title="发布新文章" time="2 小时前" />
          <ActivityItem title="更新文章" time="5 小时前" />
          <ActivityItem title="收到新评论" time="1 天前" />
        </div>
      </div>
    </AdminLayout>
  );
}

function StatCard({ title, value, icon }: { title: string; value: string; icon: string }) {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{title}</p>
          <p className="text-2xl font-bold text-zinc-900 dark:text-white mt-1">{value}</p>
        </div>
        <span className="text-3xl">{icon}</span>
      </div>
    </div>
  );
}

function ActivityItem({ title, time }: { title: string; time: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-zinc-100 dark:border-zinc-700 last:border-0">
      <span className="text-zinc-700 dark:text-zinc-300">{title}</span>
      <span className="text-sm text-zinc-500 dark:text-zinc-400">{time}</span>
    </div>
  );
}
