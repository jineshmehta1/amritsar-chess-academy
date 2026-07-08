"use client"

import React from "react"
import { motion } from "framer-motion"
import { MessageCircle, Rocket, ArrowRight, Trophy } from "lucide-react"
import Link from "next/link"
import { useBookDemo } from "@/components/BookDemoProvider"

const navy = "#12123D"
const orange = "#FF6B00"

export default function AboutCTA() {
  const { openBookDemoModal } = useBookDemo()

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[2rem] md:rounded-[3rem] p-8 md:p-20 text-center overflow-hidden shadow-2xl border-b-[8px] md:border-b-[12px]"
          style={{ backgroundColor: navy, borderBottomColor: orange }}
        >
          {/* Decorative Background King Icon - Scaled for mobile */}
          <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 opacity-5 md:opacity-10 pointer-events-none rotate-12">
            <img 
              src="/king1.png" 
              alt="" 
              className="w-48 md:w-80 h-auto" 
            />
          </div>

          <div className="relative z-10">
            {/* Top Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 mb-6 md:mb-8"
            >
              <Trophy className="w-3.5 h-3.5 md:w-4 md:h-4" style={{ color: orange }} />
              <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">
                Your Legacy Starts Today
              </span>
            </motion.div>

            {/* Main Heading */}
            <h2 className="text-3xl md:text-6xl font-black text-white tracking-tighter leading-[1.1] mb-6 md:mb-8">
              The Board is Set. <br className="hidden md:block" />
              <span style={{ color: orange }}>Your Move is Next.</span>
            </h2>

            {/* Support Text */}
            <p className="text-slate-400 font-medium text-sm md:text-lg max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed px-2 md:px-0">
              Don't just watch the game—master it. Join Amritsar's most prestigious chess community and 
              turn your curiosity into competitive brilliance. 
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-5">
              <div className="w-full sm:w-auto">
              <motion.button
                onClick={openBookDemoModal}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-8 md:px-10 py-4 md:py-5 rounded-full font-black uppercase tracking-widest text-[10px] md:text-xs flex items-center justify-center gap-3 transition-all shadow-xl text-white"
                style={{ backgroundColor: orange }}
              >
                Book Free Demo Class
                <Rocket className="w-4 h-4 md:w-5 md:h-5" />
              </motion.button>
              </div>

              <Link href="/contact" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-8 md:px-10 py-4 md:py-5 rounded-full font-black uppercase tracking-widest text-[10px] md:text-xs flex items-center justify-center gap-3 transition-all border border-white/20 text-white bg-white/5 backdrop-blur-sm"
                >
                  Contact Coach
                  <MessageCircle className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
                </motion.button>
              </Link>
            </div>

            {/* Trust Footer */}
            <div className="mt-10 md:mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row flex-wrap justify-center items-center gap-4 md:gap-8 text-slate-500">
              <div className="flex items-center gap-2">
                <ArrowRight className="w-3.5 h-3.5" style={{ color: orange }} />
                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest">No Experience Required</span>
              </div>
              <div className="flex items-center gap-2">
                <ArrowRight className="w-3.5 h-3.5" style={{ color: orange }} />
                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest">All Ages Welcome</span>
              </div>
              <div className="flex items-center gap-2">
                <ArrowRight className="w-3.5 h-3.5" style={{ color: orange }} />
                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest">FIDE Certified Coaching</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}