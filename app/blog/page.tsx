"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Calendar, Clock, ChevronRight, Search, 
  BookOpen, Brain, Trophy, Users, Star, ArrowRight
} from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import BlogHero from "@/components/blogBanner"

const navy = "#12123D"
const orange = "#FF6B00"

const blogPosts = [
  {
    id: 1,
    title: "The Silent Assassin: Mastering the Ruy Lopez Opening",
    excerpt: "Discover why the Ruy Lopez remains the most respected opening at the Grandmaster level and how you can use it.",
    category: "Strategy",
    date: "Oct 12, 2023",
    readTime: "8 min read",
    author: "Coach",
    image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Cognitive Gains: How Chess Shapes Young Minds",
    excerpt: "A deep dive into the psychological benefits of chess for children, from improved focus to logical reasoning.",
    category: "For Parents",
    date: "Oct 05, 2023",
    readTime: "6 min read",
    author: "Amritsar Club Team",
    image: "https://images.unsplash.com/photo-1586165368502-1bad197a6461?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Under Pressure: Managing the Clock in Blitz Games",
    excerpt: "Time management is as important as the moves you make. Learn how to stay calm when the clock hits 10 seconds.",
    category: "Analysis",
    date: "Sep 28, 2023",
    readTime: "5 min read",
    author: "Vikram Singh",
    image: "https://images.unsplash.com/photo-1580541832626-2a7131ee809f?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "The Rise of Indian Chess: From Anand to Gukesh",
    excerpt: "Exploring the revolution of Indian chess and how our local academies are feeding the global talent pool.",
    category: "News",
    date: "Sep 20, 2023",
    readTime: "10 min read",
    author: "Coach",
    image: "https://images.unsplash.com/photo-1528819622765-d6bcf132f793?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Common Middlegame Mistakes and How to Avoid Them",
    excerpt: "Even intermediate players struggle with planning. We analyze three common blunders that lose games.",
    category: "Strategy",
    date: "Sep 15, 2023",
    readTime: "7 min read",
    author: "Vikram Singh",
    image: "/inter.webp"
  },
  {
    id: 6,
    title: "Preparing Your Child for Their First Tournament",
    excerpt: "A practical guide for parents on logistics, mindset, and what to pack for a two-day chess tournament.",
    category: "For Parents",
    date: "Sep 08, 2023",
    readTime: "5 min read",
    author: "Amritsar Club Team",
    image: "https://images.unsplash.com/photo-1560174038-da43ac74f01b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 7,
    title: "The Psychology of Resilience: Bouncing Back After a Loss",
    excerpt: "Losing is part of the game. We share mental techniques used by champions to stay motivated after a defeat.",
    category: "Analysis",
    date: "Aug 30, 2023",
    readTime: "6 min read",
    author: "Coach",
    image: "https://images.unsplash.com/photo-1611195974226-a6a9be9dd763?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 8,
    title: "Diet and Fitness: The Physical Side of Grandmaster Play",
    excerpt: "You can't think clearly if you aren't healthy. Discover the fitness routines of the world's top players.",
    category: "Lifestyle",
    date: "Aug 22, 2023",
    readTime: "4 min read",
    author: "Health & Mind Desk",
    image: "/ad.webp"
  }
]

const categories = ["All", "Strategy", "Analysis", "For Parents", "News"]

export default function BlogListing() {
  const [activeFilter, setActiveFilter] = useState("All")

  const filteredPosts = activeFilter === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeFilter)

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <BlogHero/>

      {/* CATEGORY FILTER */}
      <section className="py-12 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${
                activeFilter === cat 
                  ? "text-white shadow-xl scale-105" 
                  : "bg-white text-slate-500 border border-slate-200 hover:border-orange-500"
              }`}
              style={{ backgroundColor: activeFilter === cat ? navy : "" }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* BLOG GRID */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post, i) => (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05 }}
                  className="group flex flex-col bg-white rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 overflow-hidden"
                  style={{ borderBottom: `6px solid ${i % 2 === 0 ? orange : navy}` }}
                >
                  <Link href={`/blog/${post.id}`} className="relative h-64 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-[#12123D]">
                      {post.category}
                    </div>
                  </Link>

                  <div className="p-10 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                      <div className="flex items-center gap-1.5"><Calendar size={14} /> {post.date}</div>
                      <div className="flex items-center gap-1.5"><Clock size={14} /> {post.readTime}</div>
                    </div>

                    <Link href={`/blog/${post.id}`}>
                      <h3 className="text-2xl font-black text-[#12123D] leading-tight mb-4 group-hover:text-orange-600 transition-colors">
                        {post.title}
                      </h3>
                    </Link>

                    <p className="text-slate-500 font-medium text-sm leading-relaxed mb-8 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                      <div className="text-[10px] font-black uppercase text-slate-400">By {post.author}</div>
                      <Link href={`/blog/${post.id}`} className="text-orange-500 flex items-center gap-2 group/btn">
                        <span className="text-xs font-black uppercase tracking-widest">Read More</span>
                        <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}