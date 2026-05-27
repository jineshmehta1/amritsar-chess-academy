"use client"

import React from "react"
import { motion } from "framer-motion"
import { MessageCircle, Users, Award, ChevronDown } from "lucide-react"

export default function CoachesHero() {
  const whatsappNumber = "919988775581"

  return (
    <section className="relative h-[85vh] min-h-[100vh] w-full overflow-hidden flex items-center justify-center pt-20">
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1560174038-da43ac74f01b?q=80&w=2070&auto=format&fit=crop')`, // Background showing mentorship/teaching
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        {/* Deep Overlay */}
        <div className="absolute inset-0 bg-black/70 bg-gradient-to-t from-black/90 via-transparent to-black/80" />
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
              Amritsar Chess Club • Expert Mentorship
            </span>
            <span className="w-8 h-[1px] bg-[#2b5292]" />
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif italic tracking-tight leading-[1.1]">
            Learn from the Masters, <br />
            <span className="font-sans not-italic font-light tracking-wide text-zinc-200">
              Become a Champion.
            </span>
          </h1>

          {/* Refined Body Text */}
          <p className="max-w-3xl mx-auto text-sm md:text-lg text-zinc-400 font-light tracking-wide leading-relaxed">
            Our coaches aren't just players; they are architects of strategy and 
            mentors of character. With decades of combined international experience, 
            we bring professional-grade training to the heart of Amritsar.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-5 pt-6">
            {/* Primary Action */}
            <motion.button
              onClick={() => document.getElementById('coaches-list')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#2b5292] hover:bg-[#1e3a6d] text-white px-10 py-4 rounded-full flex items-center gap-3 transition-all duration-300 shadow-2xl"
            >
              <Users size={18} />
              <span className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase">
                Meet the Team
              </span>
            </motion.button>

            {/* WhatsApp Integration */}
            <motion.a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white px-10 py-4 rounded-full flex items-center gap-3 transition-all duration-300"
            >
              <MessageCircle size={18} className="text-green-400" />
              <span className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase">
                Direct Consultation
              </span>
            </motion.a>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-10 pt-12 border-t border-white/10 w-full max-w-2xl">
            <div className="flex flex-col items-center gap-2">
              <Award className="text-[#2b5292]" size={24} />
              <span className="text-[9px] tracking-[0.2em] uppercase text-zinc-400 font-bold">FIDE Certified</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Users className="text-[#2b5292]" size={24} />
              <span className="text-[9px] tracking-[0.2em] uppercase text-zinc-400 font-bold">1-on-1 Mentoring</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Hint */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-zinc-500 cursor-pointer"
        onClick={() => document.getElementById('coaches-list')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <ChevronDown size={32} strokeWidth={1} />
      </motion.div>
    </section>
  )
}