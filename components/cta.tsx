"use client"

import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sparkles, Phone, User, Baby, Send } from "lucide-react"

export default function DemoCTA() {
  const navy = "#12123D"
  const orange = "#FF6B00"

  return (
    <section className="py-12 md:py-20 px-4 md:px-6 relative overflow-hidden bg-white">
      <div className="max-w-6xl mx-auto">
        
        {/* THE COMPACT CARD */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(18,18,61,0.2)]"
          style={{ backgroundColor: navy }}
        >
          
          {/* MODERN DOT GRID OVERLAY */}
          <div 
            className="absolute inset-0 opacity-10 md:opacity-20 pointer-events-none"
            style={{ 
              backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
              backgroundSize: '24px 24px' 
            }}
          />

          <div className="relative z-10 grid lg:grid-cols-2 items-center gap-10 md:gap-12 p-6 md:p-16">
            
            {/* LEFT: CONTENT */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                <Sparkles className="w-3 h-3 md:w-3.5 md:h-3.5" style={{ color: orange }} />
                Limited Slots Available
              </div>
              
              <h2 className="text-3xl md:text-5xl font-black text-white leading-[1.1] mb-6 tracking-tighter">
                Book Your <span style={{ color: orange }}>Free Demo</span> <br className="hidden md:block" /> 
                Class Today
              </h2>
              
              <p className="text-slate-400 text-sm md:text-base font-medium mb-8 max-w-sm mx-auto lg:mx-0">
                Join Amritsar's most prestigious chess community. Start your journey with a 1-on-1 evaluation session.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 text-white/60 text-xs md:text-sm font-bold">
                 <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-[#12123D] bg-slate-800 overflow-hidden">
                        <img 
                          src={`https://i.pravatar.cc/100?img=${i+10}`} 
                          alt="student" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                 </div>
                 <span>Joined by 500+ students in Amritsar</span>
              </div>
            </div>

            {/* RIGHT: COMPACT FORM */}
            <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-8 shadow-2xl w-full max-w-md mx-auto">
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                
                {/* NAME FIELD */}
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Student Name"
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3.5 md:py-4 pl-12 pr-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 transition-all placeholder:text-slate-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* PHONE FIELD */}
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="tel" 
                      placeholder="Phone Number"
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3.5 md:py-4 pl-12 pr-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 transition-all placeholder:text-slate-400"
                    />
                  </div>

                  {/* AGE FIELD */}
                  <div className="relative">
                    <Baby className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="number" 
                      placeholder="Age"
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3.5 md:py-4 pl-12 pr-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* SUBMIT BUTTON */}
                <Button 
                  className="w-full py-7 md:py-8 rounded-xl font-black text-[10px] md:text-xs tracking-[0.2em] shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3"
                  style={{ backgroundColor: orange, color: '#fff' }}
                >
                  SCHEDULE NOW <Send className="w-4 h-4" />
                </Button>

                <p className="text-[9px] md:text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest mt-4">
                  No credit card required • Instant confirmation
                </p>
              </form>
            </div>

          </div>

          {/* BACKGROUND DECOR - Blurs adjusted for mobile performance */}
          <div className="absolute top-0 right-0 w-32 h-32 md:w-64 md:h-64 bg-white/5 rounded-full -mr-16 -mt-16 md:-mr-32 md:-mt-32 blur-2xl md:blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 md:w-64 md:h-64 rounded-full -ml-16 -mb-16 md:-ml-32 md:-mb-32 blur-2xl md:blur-3xl pointer-events-none" style={{ backgroundColor: `${orange}20` }} />

        </motion.div>
      </div>
    </section>
  )
}