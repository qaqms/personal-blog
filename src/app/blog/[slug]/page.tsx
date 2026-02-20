import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getAllPosts } from "@/lib/posts";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return { title: "文章未找到" };
  }
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 py-20 px-6">
      <article className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors mb-8"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          返回博客
        </Link>

        <header className="mb-8">
          <time className="text-sm text-zinc-500 dark:text-zinc-400">
            {new Date(post.date).toLocaleDateString("zh-CN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mt-2">
            {post.title}
          </h1>
          <div className="flex gap-2 mt-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="prose prose-zinc dark:prose-invert max-w-none prose-headings:text-zinc-900 dark:prose-headings:text-white prose-a:text-blue-500 dark:prose-a:text-blue-400 prose-code:bg-zinc-100 dark:prose-code:bg-zinc-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-zinc-900 dark:prose-pre:bg-zinc-950">
          <MDXContent content={post.content} />
        </div>
      </article>
    </div>
  );
}

function MDXContent({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeContent = "";
  let codeLanguage = "";

  lines.forEach((line, index) => {
    if (line.startsWith("```")) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeLanguage = line.slice(3).trim();
        codeContent = "";
      } else {
        inCodeBlock = false;
        elements.push(
          <pre key={index} className="bg-zinc-900 dark:bg-zinc-950 rounded-lg p-4 overflow-x-auto">
            <code className={`language-${codeLanguage} text-sm text-zinc-100`}>
              {codeContent.trim()}
            </code>
          </pre>
        );
      }
      return;
    }

    if (inCodeBlock) {
      codeContent += line + "\n";
      return;
    }

    if (line.startsWith("# ")) {
      elements.push(
        <h1 key={index} className="text-3xl font-bold mt-8 mb-4 text-zinc-900 dark:text-white">
          {line.slice(2)}
        </h1>
      );
    } else if (line.startsWith("## ")) {
      elements.push(
        <h2 key={index} className="text-2xl font-bold mt-6 mb-3 text-zinc-900 dark:text-white">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3 key={index} className="text-xl font-bold mt-4 mb-2 text-zinc-900 dark:text-white">
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith("- ")) {
      elements.push(
        <li key={index} className="text-zinc-600 dark:text-zinc-400 ml-4">
          {parseInlineStyles(line.slice(2))}
        </li>
      );
    } else if (line.trim() === "") {
      elements.push(<br key={index} />);
    } else {
      elements.push(
        <p key={index} className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {parseInlineStyles(line)}
        </p>
      );
    }
  });

  return <>{elements}</>;
}

function parseInlineStyles(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    const codeMatch = remaining.match(/`([^`]+)`/);
    const boldMatch = remaining.match(/\*\*([^*]+)\*\*/);
    const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);

    const matches = [
      codeMatch && { type: "code", match: codeMatch, index: codeMatch.index! },
      boldMatch && { type: "bold", match: boldMatch, index: boldMatch.index! },
      linkMatch && { type: "link", match: linkMatch, index: linkMatch.index! },
    ].filter(Boolean) as { type: string; match: RegExpMatchArray; index: number }[];

    if (matches.length === 0) {
      parts.push(remaining);
      break;
    }

    const earliest = matches.sort((a, b) => a.index - b.index)[0];

    if (earliest.index > 0) {
      parts.push(remaining.slice(0, earliest.index));
    }

    if (earliest.type === "code") {
      parts.push(
        <code key={key++} className="bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded text-sm">
          {earliest.match[1]}
        </code>
      );
      remaining = remaining.slice(earliest.index + earliest.match[0].length);
    } else if (earliest.type === "bold") {
      parts.push(
        <strong key={key++} className="font-semibold text-zinc-900 dark:text-white">
          {earliest.match[1]}
        </strong>
      );
      remaining = remaining.slice(earliest.index + earliest.match[0].length);
    } else if (earliest.type === "link") {
      parts.push(
        <a key={key++} href={earliest.match[2]} className="text-blue-500 dark:text-blue-400 hover:underline">
          {earliest.match[1]}
        </a>
      );
      remaining = remaining.slice(earliest.index + earliest.match[0].length);
    }
  }

  return parts;
}
