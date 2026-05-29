"use client"

import React from "react"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const clubGallery = [
  { 
    src: "/chess1.jpeg", 
    // Small screens: top left | Large screens: specific percentage
    pos: "top-10 -left-10 md:top-[10%] md:left-[5%]", 
    delay: 0, 
    size: "w-32 h-44 md:w-48 md:h-64",
    rotate: "-12deg"
  },
  { 
    src: "/chess2.jpeg", 
    // Small screens: top right | Large screens: specific percentage
    pos: "top-20 -right-10 md:top-[10%] md:right-[5%]", 
    delay: 0.2, 
    size: "w-32 h-44 md:w-48 md:h-64",
    rotate: "12deg"
  },
  { 
    src: "/chess3.jpeg", 
    // Small screens: bottom left | Large screens: specific percentage
    pos: "bottom-20 -left-10 md:bottom-[10%] md:left-[8%]", 
    delay: 0.4, 
    size: "w-32 h-44 md:w-48 md:h-64",
    rotate: "8deg"
  },
  { 
    src: "https://images.unsplash.com/photo-1560174038-da43ac74f01b?w=500&h=700&fit=crop", 
    pos: "bottom-10 -right-10 md:bottom-[10%] md:right-[8%]", 
    delay: 0.6, 
    size: "w-32 h-44 md:w-48 md:h-64",
    rotate: "-8deg"
  },
]

export default function ClubAbout() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-white py-20 px-6">
      
      {/* 1. RESPONSIVE FLOATING IMAGES */}
      <div className="absolute inset-0 pointer-events-none">
        {clubGallery.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
            whileInView={{ 
                opacity: 1, 
                scale: 1, 
                rotate: img.rotate 
            }}
            viewport={{ once: true }}
            transition={{ 
                duration: 1, 
                delay: img.delay,
                ease: [0.21, 0.47, 0.32, 0.98] 
            }}
            className={`absolute z-0 ${img.pos} ${img.size} rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-xl border-4 border-white transform-gpu`}
          >
            <img 
              src={img.src} 
              alt="Club Gallery" 
              className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500"
            />
          </motion.div>
        ))}
      </div>

      {/* 2. CENTRAL CONTENT */}
      <div className="relative z-10 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          {/* Label */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2 font-black text-xs md:text-sm tracking-[0.2em] uppercase mb-6 md:mb-8 cursor-pointer group" 
            style={{ color: "#7C3AED" }}
          >
            The Club Legacy 
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </motion.div>

          {/* Heading */}
          <h2 
            className="text-4xl md:text-6xl font-black tracking-tighter mb-6 md:mb-8 leading-[1.1] md:leading-[1.05]" 
            style={{ color: "#12123D" }}
          >
            A Legacy of Excellence: <br className="hidden md:block" />
            Our Dedication <span className="text-slate-400">Fuels Your Move</span>
          </h2>

          {/* Description */}
          <p className="text-base md:text-xl text-slate-500 max-w-xl md:max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed font-medium px-4">
            At Amritsar Chess Club, we believe chess is more than a game—it&apos;s a blueprint for life. 
            From grandmaster-led sessions to our community of rising stars.
          </p>

          {/* Button */}
          <Link href="/about">
            <Button 
              className="px-8 py-6 md:px-12 md:py-8 rounded-full text-xs md:text-sm font-black tracking-widest shadow-2xl transition-all hover:scale-105 active:scale-95 text-white"
              style={{ backgroundColor: "#12123D" }}
            >
              EXPLORE OUR STORY
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* 3. WAVY DECORATION */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[200%] md:w-full h-[40px] md:h-[60px] fill-slate-50">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.2,35.26,69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
        </svg>
      </div>

    </section>
  )
}