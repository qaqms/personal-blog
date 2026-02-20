"use client";

export default function Contact() {
  return (
    <section id="contact" className="min-h-screen flex items-center justify-center px-6 py-20 bg-zinc-50 dark:bg-zinc-900">
      <div className="max-w-xl mx-auto w-full text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-6">
          联系我
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">
          如果你有任何问题或只是想打个招呼，欢迎随时联系我！
        </p>
        <a
          href="mailto:hello@example.com"
          className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium rounded-full hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all duration-300 hover:scale-105"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          发送邮件
        </a>
      </div>
    </section>
  );
}
