"use client"

import React from "react"
import { motion } from "framer-motion"
import { 
  Calendar, Clock, User, Share2, 
  ChevronLeft, ArrowRight, Quote, CheckCircle2 
} from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const navy = "#12123D"
const orange = "#FF6B00"

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* BLOG POST HERO */}
      <header className="pt-32 pb-16 bg-slate-50 px-6 border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <Link href="/blog" className="inline-flex items-center gap-2 text-orange-500 font-black text-[10px] uppercase tracking-widest mb-10 hover:-translate-x-2 transition-transform">
            <ChevronLeft size={16} /> Back to Blog
          </Link>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-orange-500 text-white text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
              Strategy & Openings
            </div>
            <span className="text-slate-300">•</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">8 Min Read</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-[#12123D] leading-tight mb-8">
            The Silent Assassin: Mastering the Ruy Lopez Opening
          </h1>

          <div className="flex items-center gap-6 border-t border-slate-200 pt-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-slate-200" />
              <div>
                <p className="text-xs font-black text-[#12123D]">Coach</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Chief Mentor • Oct 12, 2023</p>
              </div>
            </div>
            <button className="ml-auto w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-orange-500 transition-all">
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* ARTICLE CONTENT */}
      <article className="py-20 px-6">
        <div className="max-w-3xl mx-auto prose prose-slate prose-lg">
          <div className="rounded-[2.5rem] overflow-hidden mb-16 shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80&w=2071&auto=format&fit=crop" 
              alt="Chess Pieces" 
              className="w-full h-auto"
            />
          </div>

          <p className="text-xl font-medium text-slate-600 leading-relaxed mb-10">
            Named after a 16th-century Spanish priest, the Ruy Lopez is arguably the most analyzed opening in chess history. 
            For five hundred years, it has stood the test of time, challenging the world's greatest minds to solve its strategic complexities.
          </p>

          <h3 className="text-3xl font-black text-[#12123D] mt-16 mb-6">Why It Works</h3>
          <p className="text-slate-600 font-medium mb-8">
            The power of the Ruy Lopez (1. e4 e5 2. Nf3 Nc6 3. Bb5) lies in the immediate pressure White puts on Black's central defender. 
            It’s not just about winning a pawn; it’s about controlling the tempo and forcing Black to make concessions early on.
          </p>

          <div className="bg-slate-50 p-10 rounded-[2rem] border-l-8 border-orange-500 my-12 relative overflow-hidden">
             <Quote size={60} className="absolute -top-4 -right-4 text-orange-100" />
             <p className="text-2xl font-serif italic text-[#12123D] relative z-10 leading-relaxed">
               "If you want to understand chess strategy, you must understand the Ruy Lopez. It is the curriculum of a Grandmaster."
             </p>
          </div>

          <h3 className="text-2xl font-black text-[#12123D] mb-4">Key Takeaways for Students</h3>
          <ul className="space-y-4 mb-12">
            {[
              "Control of the center (e4 and d4) is paramount.",
              "Development should never be sacrificed for early attacks.",
              "The Light-Squared Bishop is White's most valuable strategic tool.",
              "Patience in the middlegame leads to endgame superiority."
            ].map((point, i) => (
              <li key={i} className="flex items-start gap-4 text-slate-600 font-medium">
                <CheckCircle2 size={24} className="text-orange-500 shrink-0" /> {point}
              </li>
            ))}
          </ul>

          <h3 className="text-3xl font-black text-[#12123D] mt-16 mb-6">Conclusion</h3>
          <p className="text-slate-600 font-medium mb-12">
            Whether you're a beginner or an expert, practicing the Ruy Lopez teaches you the relationship between 
            tactics and positional long-term planning. Start with the exchange variation if you're a beginner, 
            and work your way into the complex closed lines as your rating grows.
          </p>
        </div>
      </article>

      {/* NEXT MOVES CTA */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto bg-[#12123D] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl border-b-[12px] border-orange-500">
           <img src="/king1.png" className="absolute -bottom-10 -right-10 w-64 opacity-10 pointer-events-none" />
           <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tighter">
            Apply Strategy to <br /> <span style={{ color: orange }}>Your Game.</span>
           </h2>
           <p className="text-slate-400 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
             Reading about it is the first step. Practicing with a FIDE-certified coach is where 
             the transformation happens. Join our next workshop.
           </p>
           <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <Link href="https://wa.me/919988775581">
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs transition-all hover:scale-105 shadow-lg">
                  Book Free Demo
                </button>
              </Link>
           </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}