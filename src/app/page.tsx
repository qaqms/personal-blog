import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Stats from '@/components/Stats'
import Blog from '@/components/Blog'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import { getProjects } from '@/lib/data'
import { getAllPosts } from '@/lib/posts'

export default function Home() {
  const projects = getProjects()
  const posts = getAllPosts()

  return (
    <>
      <Navbar />
      <main className="bg-white dark:bg-zinc-950">
        <Hero />
        <About />
        <Skills />
        <Projects projects={projects} />
        <Stats />
        <Blog posts={posts} />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
