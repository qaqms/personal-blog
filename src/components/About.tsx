"use client";

import { useEffect, useRef, useState } from "react";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const currentRef = sectionRef.current;
    if (!currentRef) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(currentRef);

    return () => {
      observer.unobserve(currentRef);
    };
  }, []);

  return (
    <section ref={sectionRef} id="about" className="min-h-screen flex items-center justify-center px-6 py-20 bg-zinc-50 dark:bg-zinc-900">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-zinc-900 dark:text-white mb-12">
          关于我
        </h2>
        <div className="space-y-6 text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed">
          <p className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
            你好！我是一名热爱编程的开发者，喜欢用代码构建各种有趣的东西。
            我的编程之旅始于发现用代码从无到有创造事物的乐趣。
          </p>
          <p className={`transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
            我热衷于探索新技术和新框架。不写代码的时候，
            你会发现我在阅读技术博客、玩游戏，或者了解科技世界的最新动态。
          </p>
          <p className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
            我相信持续学习和与社区分享知识的力量。
            这个博客是我记录旅程和分享所学知识的空间。
          </p>
        </div>
      </div>
    </section>
  );
}
