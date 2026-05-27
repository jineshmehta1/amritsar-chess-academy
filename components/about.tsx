"use client"

import React from "react"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const clubGallery = [
  { 
    src: "/chess1.jpeg", 
    pos: "top-[10%] left-[5%]", 
    delay: 0, 
    size: "w-40 h-52 md:w-48 md:h-64" 
  },
  { 
    src: "/chess2.jpeg", 
    pos: "top-[10%] right-[5%]", 
    delay: 1.5, 
    size: "w-40 h-52 md:w-48 md:h-64" 
  },
  { 
    src: "/chess3.jpeg", 
    pos: "bottom-[10%] left-[8%]", 
    delay: 0.8, 
    size: "w-40 h-52 md:w-48 md:h-64" 
  },
  { 
    src: "https://images.unsplash.com/photo-1560174038-da43ac74f01b?w=500&h=700&fit=crop", 
    pos: "bottom-[10%] right-[8%]", 
    delay: 2.2, 
    size: "w-40 h-52 md:w-48 md:h-64" 
  },
]

export default function ClubAbout() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-white py-24 px-6">
      
      {/* 1. STABLE FLOATING IMAGES (No Flicker, Normal Colors) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {clubGallery.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 1, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={`absolute z-10 hidden lg:block ${img.pos} ${img.size} rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-4 border-white transform-gpu`}
          >
            <img 
              src={img.src} 
              alt="Club Gallery" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </div>

      {/* 2. CENTRAL CONTENT */}
      <div className="relative z-20 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          {/* Elite Purple Label */}
          <div 
            className="flex items-center gap-2 font-black text-sm tracking-[0.2em] uppercase mb-8 cursor-pointer group" 
            style={{ color: "#7C3AED" }}
          >
            The Club Legacy 
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </div>

          {/* Deep Navy Heading */}
          <h2 
            className="text-3xl md:text-5xl font-black tracking-tighter mb-8 leading-[1.05]" 
            style={{ color: "#12123D" }}
          >
            A Legacy of Excellence: <br />
            Our Dedication Fuels Your Move
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
            At Amritsar Chess Club, we believe chess is more than a game—it&apos;s a blueprint for life. 
            From our grandmaster-led sessions to our community of rising stars, 
            we are building the next generation of strategic thinkers.
          </p>

          {/* Deep Navy Button */}
          <Link href="/about">
            <Button 
              className="px-12 py-8 rounded-full text-sm font-black tracking-widest shadow-2xl transition-all hover:scale-105 active:scale-95 text-white"
              style={{ backgroundColor: "#12123D" }}
            >
              EXPLORE OUR STORY
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* 3. WAVY DECORATION (Optional - matches your previous design) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] fill-slate-50">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.2,35.26,69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
        </svg>
      </div>

    </section>
  )
}