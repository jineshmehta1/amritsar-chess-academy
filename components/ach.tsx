"use client"

import React from "react"
import { motion } from "framer-motion"
import { Users, BarChart3, Trophy, Medal, Globe, GraduationCap } from "lucide-react"

const stats = [
  {
    label: "Students Trained",
    value: "500+",
    desc: "Nurtured young minds across all levels",
    icon: Users,
    color: "#FF6B00"
  },
  {
    label: "Tournaments Won",
    value: "50+",
    desc: "Outstanding performance in national events",
    icon: BarChart3,
    color: "#12123D"
  },
  {
    label: "Champions",
    value: "25+",
    desc: "Students who became tournament winners",
    icon: Trophy,
    color: "#FF6B00"
  },
  {
    label: "Awards & Medals",
    value: "1200+",
    desc: "Recognitions for excellence and dedication",
    icon: Medal,
    color: "#12123D"
  },
  {
    label: "Cities Reached",
    value: "10+",
    desc: "Growing our chess community every day",
    icon: Globe,
    color: "#FF6B00"
  }
]

const achievements = [
  {
    rank: "1st Place",
    event: "National Chess Championship",
    category: "U-12 Category",
    name: "Rahul Verma",
    img: "/b1.webp"
  },
  {
    rank: "1st Place",
    event: "Delhi Open Chess Tournament",
    category: "U-10 Category",
    name: "Ananya Sharma",
    img: "/g2.webp"
  },
  {
    rank: "2nd Place",
    event: "National Rapid Chess",
    category: "U-14 Category",
    name: "Arjun Mehta",
    img: "/b3.webp"
  },
  {
    rank: "1st Place",
    event: "State Chess Championship",
    category: "U-8 Category",
    name: "Vihaan Kapoor",
    img: "/b2.avif"
  },
  {
    rank: "1st Place",
    event: "Girls Chess Championship",
    category: "U-16 Category",
    name: "Mehak Bansal",
    img: "/g1.jpeg"
  }
]

export default function AchievementSection() {
  const navy = "#12123D"
  const orange = "#FF6B00"

  return (
    <section className="py-24 bg-white px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* TOP HEADER */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <div className="h-px w-8 bg-slate-200" />
            <span className="text-[11px] font-black uppercase tracking-[0.3em]" style={{ color: orange }}>
              Our Achievements
            </span>
            <div className="h-px w-8 bg-slate-200" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black tracking-tighter mb-4"
            style={{ color: navy }}
          >
            Building Champions, One Move at a Time
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-slate-500 font-medium"
          >
            Proud of our students and their incredible journey from learners to winners.
          </motion.p>
        </div>

        {/* STATS COUNTER GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-24">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm text-center flex flex-col items-center group hover:shadow-xl transition-all duration-500"
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 bg-slate-50 transition-transform group-hover:scale-110">
                <stat.icon size={28} style={{ color: stat.color }} />
              </div>
              <div className="text-4xl font-black mb-1" style={{ color: orange }}>
                {stat.value}
              </div>
              <div className="text-sm font-black mb-2" style={{ color: navy }}>
                {stat.label}
              </div>
              <div className="text-[11px] text-slate-400 font-medium leading-relaxed">
                {stat.desc}
              </div>
            </motion.div>
          ))}
        </div>

        {/* RECENT ACHIEVEMENTS SUB-HEADER */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-black relative inline-block pb-3" style={{ color: navy }}>
            Recent Achievements
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full" style={{ backgroundColor: orange }} />
          </h3>
        </div>

        {/* ACHIEVEMENTS CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {achievements.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group"
            >
              {/* Photo Area */}
              <div className="relative h-64">
                <img 
                  src={item.img} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-3 left-3 bg-[#12123D]/90 backdrop-blur-md px-3 py-1 rounded-lg text-white text-[10px] font-bold">
                  {item.rank}
                </div>
              </div>

              {/* Bottom Info */}
              <div className="p-5 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Trophy size={14} style={{ color: orange }} />
                  <span className="text-[11px] font-black text-[#12123D] tracking-tight truncate">
                    {item.event}
                  </span>
                </div>
                <div className="text-[10px] font-bold text-slate-400 mb-2">
                  {item.category}
                </div>
                <div className="text-sm font-black" style={{ color: orange }}>
                  {item.name}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}