"use client"

import React from "react"
import { motion } from "framer-motion"
import { MessageCircle, Rocket, ArrowRight, Trophy } from "lucide-react"
import Link from "next/link"

const navy = "#12123D"
const orange = "#FF6B00"

export default function AboutCTA() {
  return (
    <section className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[3rem] p-12 md:p-20 text-center overflow-hidden shadow-2xl border-b-[12px]"
          style={{ backgroundColor: navy, borderBottomColor: orange }}
        >
          {/* Decorative Background King Icon */}
          <div className="absolute -bottom-10 -right-10 opacity-10 pointer-events-none rotate-12">
            <img src="/king1.png" alt="" className="w-80 h-auto" />
          </div>

          <div className="relative z-10">
            {/* Top Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 mb-8"
            >
              <Trophy size={16} style={{ color: orange }} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">
                Your Legacy Starts Today
              </span>
            </motion.div>

            {/* Main Heading */}
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight mb-8">
              The Board is Set. <br />
              <span style={{ color: orange }}>Your Move is Next.</span>
            </h2>

            {/* Support Text */}
            <p className="text-slate-400 font-medium text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
              Don't just watch the game—master it. Join Amritsar's most prestigious chess community and 
              turn your curiosity into competitive brilliance. 
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Link href="https://wa.me/919988775581">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all shadow-xl text-white"
                  style={{ backgroundColor: orange }}
                >
                  Book Free Demo Class
                  <Rocket size={18} />
                </motion.button>
              </Link>

              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all border border-white/20 text-white bg-white/5 backdrop-blur-sm"
                >
                  Contact Coach
                  <MessageCircle size={18} className="text-green-400" />
                </motion.button>
              </Link>
            </div>

            {/* Trust Footer */}
            <div className="mt-12 pt-8 border-t border-white/5 flex flex-wrap justify-center gap-8 text-slate-500">
              <div className="flex items-center gap-2">
                <ArrowRight size={14} style={{ color: orange }} />
                <span className="text-[10px] font-bold uppercase tracking-widest">No Experience Required</span>
              </div>
              <div className="flex items-center gap-2">
                <ArrowRight size={14} style={{ color: orange }} />
                <span className="text-[10px] font-bold uppercase tracking-widest">All Ages Welcome</span>
              </div>
              <div className="flex items-center gap-2">
                <ArrowRight size={14} style={{ color: orange }} />
                <span className="text-[10px] font-bold uppercase tracking-widest">FIDE Certified Coaching</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}