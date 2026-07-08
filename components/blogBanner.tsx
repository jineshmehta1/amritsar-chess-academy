"use client"

import React from "react"
import { motion } from "framer-motion"
import { MessageCircle, BookOpen, Newspaper, PenTool } from "lucide-react"
import { useBookDemo } from "@/components/BookDemoProvider"

export default function BlogHero() {
  const { openBookDemoModal } = useBookDemo()

  return (
    <section className="relative h-[85vh] min-h-[100vh] w-full overflow-hidden flex items-center justify-center pt-20">
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1580541832626-2a7131ee809f?q=80&w=2072&auto=format&fit=crop')`, // Background showing chess study/reading vibe
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        {/* Deep Overlay */}
        <div className="absolute inset-0 bg-black/75 bg-gradient-to-t from-black/95 via-transparent to-black/80" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center space-y-8"
        >
          {/* Top Label */}
          <div className="flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#2b5292]" />
            <span className="text-[10px] md:text-xs font-bold tracking-[0.5em] uppercase text-zinc-300">
              Amritsar Chess Club • Strategic Insights
            </span>
            <span className="w-8 h-[1px] bg-[#2b5292]" />
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif italic tracking-tight leading-[1.1]">
            Beyond the Board, <br />
            <span className="font-sans not-italic font-light tracking-wide text-zinc-200">
              The Art of Strategy Unfolded.
            </span>
          </h1>

          {/* Refined Body Text */}
          <p className="max-w-3xl mx-auto text-sm md:text-lg text-zinc-400 font-light tracking-wide leading-relaxed">
            From technical grandmaster analysis to tips for aspiring juniors. 
            Explore our collection of articles, news, and masterclasses designed 
            to sharpen your mind and keep you updated with the chess world.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-5 pt-6">
            {/* Primary Action */}
            <motion.button
              onClick={() => document.getElementById('blog-posts')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#2b5292] hover:bg-[#1e3a6d] text-white px-10 py-4 rounded-full flex items-center gap-3 transition-all duration-300 shadow-2xl"
            >
              <BookOpen size={18} />
              <span className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase">
                Read Articles
              </span>
            </motion.button>

            {/* WhatsApp Integration */}
            <motion.button
              onClick={openBookDemoModal}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white px-10 py-4 rounded-full flex items-center gap-3 transition-all duration-300"
            >
              <MessageCircle size={18} className="text-green-400" />
              <span className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase">
                Expert Advice
              </span>
            </motion.button>
          </div>

          {/* Blog Categories / Stats */}
          <div className="flex flex-wrap justify-center gap-10 pt-12 border-t border-white/10 w-full max-w-2xl">
            <div className="flex items-center gap-2">
              <PenTool className="text-[#2b5292]" size={18} />
              <span className="text-[10px] tracking-[0.2em] uppercase text-zinc-400">Master Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <Newspaper className="text-[#2b5292]" size={18} />
              <span className="text-[10px] tracking-[0.2em] uppercase text-zinc-400">Club News</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="text-[#2b5292]" size={18} strokeWidth={2.5} />
              <span className="text-[10px] tracking-[0.2em] uppercase text-zinc-400">Pro Tips</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent opacity-40" />
    </section>
  )
}

// Simple star icon used in the footer stats
function Star(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}