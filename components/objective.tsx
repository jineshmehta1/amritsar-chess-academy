"use client"

import React from "react"
import { motion } from "framer-motion"
import { 
  GraduationCap, 
  Brain, 
  School, 
  Trophy, 
  Flag, 
  Globe, 
  UserCheck, 
  Users, 
  Zap, 
  Crown,
  CheckCircle
} from "lucide-react"

const navy = "#12123D"
const orange = "#FF6B00"

const ObjectivesSection: React.FC = () => {
  const objectives = [
    {
      icon: GraduationCap,
      title: "World-Class Coaching",
      desc: "Providing professional training for beginners, intermediate, and advanced players."
    },
    {
      icon: Brain,
      title: "Cognitive Development",
      desc: "Enhancing critical thinking, memory, creativity, and problem-solving through the game."
    },
    {
      icon: School,
      title: "School Integration",
      desc: "Introducing chess to educational institutions across Amritsar and Punjab."
    },
    {
      icon: Trophy,
      title: "Competitive Exposure",
      desc: "Organizing regular tournaments, workshops, and training camps for real-match experience."
    },
    {
      icon: Flag,
      title: "Tournament Readiness",
      desc: "Preparing players for district, state, national, and FIDE-rated competitions."
    },
    {
      icon: Globe,
      title: "Accessible Learning",
      desc: "Making quality education affordable through flexible online and offline coaching models."
    },
    {
      icon: UserCheck,
      title: "Talent Scouting",
      desc: "Identifying and nurturing young talents to represent Punjab and India at global levels."
    },
    {
      icon: Users,
      title: "Community Building",
      desc: "Fostering sportsmanship, discipline, and a strong chess culture in the region."
    },
    {
      icon: Zap,
      title: "Modern Methodology",
      desc: "Using game analysis, puzzles, and personalized plans to maximize improvement."
    }
  ]

  return (
    <section className="py-16 md:py-24 bg-slate-50 px-4 md:px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- HEADER --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="h-[2px] w-8" style={{ backgroundColor: orange }} />
              <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">Strategic Goals</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 leading-tight uppercase">
              Our <span style={{ color: orange }}>Objectives</span>
            </h2>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-slate-500 font-medium text-lg lg:max-w-md lg:pb-2"
          >
            Promoting chess as a powerful educational tool and a competitive sport while helping players of all ages reach their full potential.
          </motion.p>
        </div>

        {/* --- OBJECTIVES GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {objectives.map((obj, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300 group"
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300" 
                style={{ backgroundColor: `${navy}10` }}
              >
                <obj.icon size={24} style={{ color: navy }} />
              </div>
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-3 group-hover:text-[#FF6B00] transition-colors">
                {obj.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                {obj.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* --- HOLISTIC GOAL SUMMARY --- */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 md:mt-24 bg-[#12123D] rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-16 text-white relative overflow-hidden shadow-2xl"
        >
          {/* Decorative background circle */}
          <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-shrink-0">
               <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-dashed border-orange-500 flex items-center justify-center animate-[spin_10s_linear_infinite]">
                 <CheckCircle size={40} style={{ color: orange }} />
               </div>
            </div>
            
            <div className="space-y-4 text-center md:text-left">
              <h4 className="text-xl md:text-2xl font-bold uppercase tracking-widest text-orange-500">Beyond the Board</h4>
              <p className="text-lg md:text-3xl font-serif italic text-slate-200 leading-relaxed">
                "Our objective is not only to create stronger chess players but also to develop 
                <span className="text-white font-bold"> confident, disciplined, and intelligent individuals </span> 
                who apply these skills to academics, careers, and everyday life."
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default ObjectivesSection;