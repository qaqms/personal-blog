"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-8 px-6 bg-zinc-100 dark:bg-zinc-800">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-zinc-600 dark:text-zinc-400 text-sm">
          © {year} QAQ 博客。使用 Next.js 和 Tailwind CSS 构建。
        </p>
      </div>
    </footer>
  );
}
