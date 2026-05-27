"use client"

import React from "react"
import { motion } from "framer-motion"
import { Star, Quote, Users, Trophy, Globe, StarHalf } from "lucide-react"

const testimonials = [
  {
    text: "The coaching here is exceptional! My son has improved not just in chess, but in confidence and concentration as well.",
    name: "Arjun Mehta",
    role: "Parent of U-12 Student",
    image: "/b1.webp",
    accent: "#FF6B00" // Orange
  },
  {
    text: "I've learned strategies that helped me win my first national tournament. Grateful to my coach for believing in me!",
    name: "Vihaan Kapoor",
    role: "U-14 State Champion",
    image: "/b2.avif",
    accent: "#12123D" // Navy
  },
  {
    text: "Professional approach, personal attention and regular tournaments — the perfect place for any chess enthusiast.",
    name: "Rahul Sharma",
    role: "Parent of U-16 Student",
    image: "/b3.webp",
    accent: "#FF6B00" // Orange
  }
]

const statsBar = [
  { icon: Users, label: "Happy Families", value: "500+", color: "#FF6B00" },
  { icon: Trophy, label: "Championships Won", value: "25+", color: "#12123D" },
  { icon: Globe, label: "Cities Impacted", value: "10+", color: "#FF6B00" },
  { icon: Star, label: "Average Rating", value: "4.9/5", color: "#12123D" },
]

export default function TestimonialSection() {
  const navy = "#12123D"
  const orange = "#FF6B00"

  return (
    <section className="py-24 bg-slate-50/50 px-6 overflow-hidden relative">
      {/* Background Decorative Quote Mark */}
      <div className="absolute top-10 left-10 text-slate-100 -z-0 opacity-50">
        <Quote size={300} fill="currentColor" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
            <span className="text-[11px] font-black uppercase tracking-[0.3em]" style={{ color: orange }}>
              Testimonials
            </span>
            <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-black tracking-tighter mb-4"
            style={{ color: navy }}
          >
            Voices of Our <span style={{ color: orange }}>Chess Family</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-slate-500 font-medium max-w-2xl mx-auto"
          >
            Real stories from real students and parents who are part of our journey of growth, learning and success.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* LEFT INTRO COLUMN */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="lg:col-span-3 hidden lg:flex flex-col"
          >
            <Quote size={60} style={{ color: orange }} className="mb-6" />
            <h3 className="text-2xl font-black leading-tight mb-4" style={{ color: navy }}>
              More than a game, <br />
              it's a transformation <br />
              we build together.
            </h3>
            <div className="h-1 w-16 bg-orange-500 rounded-full mb-10" />
            <img 
              src="/king1.png" 
              alt="Chess King" 
              className="w-48 h-auto opacity-90 drop-shadow-2xl"
            />
          </motion.div>

          {/* TESTIMONIAL CARDS */}
          <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl transition-all duration-500 relative flex flex-col group"
                style={{ borderBottom: `6px solid ${item.accent}` }}
              >
                {/* Top Row: Quote & Stars */}
                <div className="flex justify-between items-start mb-8">
                  <Quote size={32} style={{ color: item.accent }} className="opacity-80" />
                  <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-full">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} size={12} fill={orange} stroke={orange} />
                    ))}
                    <span className="text-[10px] font-bold text-slate-700 ml-1">5.0</span>
                  </div>
                </div>

                <p className="text-slate-600 font-medium leading-relaxed mb-8 flex-grow">
                  "{item.text}"
                </p>

                <div className="h-px w-full bg-slate-100 mb-8" />

                {/* User Info */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-4 border-slate-50 shadow-sm transition-transform group-hover:scale-110">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-black text-[#12123D]">{item.name}</div>
                    <div className="text-[11px] font-bold" style={{ color: orange }}>{item.role}</div>
                  </div>
                </div>

                {/* Bottom Pointer Arrow */}
                <div 
                  className="absolute bottom-[-14px] left-1/2 -translate-x-1/2 w-4 h-4 rotate-45"
                  style={{ backgroundColor: item.accent }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        
      </div>
    </section>
  )
}