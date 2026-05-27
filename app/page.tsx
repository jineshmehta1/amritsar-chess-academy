"use client"

import { useState } from "react"
import Head from "next/head"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { Sparkles, Trophy, Star, ChevronRight, Users, ArrowRight, Pencil, Globe, BarChart3 } from "lucide-react"
import  ClubAbout  from "@/components/about"
import ClubWhyChoose from "@/components/why"
import ClubCourses from "@/components/course"
import AchievementSection from "@/components/ach"
import TestimonialSection from "@/components/review"
import BenefitsSection from "@/components/benefit"
import DemoCTA from "@/components/cta"
import FAQSection from "@/components/faq"

export default function HomePage() {
  // Brand Colors
  const navy = "#12123D"
  const orange = "#FF6B00"

  return (
    <>
      <Head>
        <title>Amritsar Chess Club | International Standard Chess Coaching</title>
      </Head>

      <div className="min-h-screen bg-white">
        <Navbar />

        <main>
          {/* JASPER-STYLE HERO SECTION */}
          <section className="relative flex flex-col items-center justify-start w-full min-h-screen pt-32 md:pt-40 pb-20 overflow-hidden bg-[#12123D]">
            
            {/* Background Video (Low Opacity) */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute top-0 left-0 w-full h-full object-cover opacity-60 pointer-events-none"
            >
              <source src="/video.mp4" type="video/mp4" />
            </video>

            {/* 1. JASPER ANNOUNCEMENT BAR */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="z-20 mb-8 flex items-center gap-3 rounded-full bg-white/10 backdrop-blur-md px-4 py-2 border border-white/20 cursor-pointer hover:bg-white/15 transition-all"
            >
              <div className="flex items-center gap-1 rounded-full bg-[#FF6B00] px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-white">
                <Sparkles className="h-3 w-3" />
                New
              </div>
              <p className="text-sm font-medium text-slate-200">
                Introducing <span className="text-white font-bold tracking-tight">Grandmaster IQ</span>: Amritsar&apos;s first AI Analysis
              </p>
              <ArrowRight className="h-4 w-4 text-slate-400" />
            </motion.div>

            {/* 2. TEXT CONTENT (FIXED CUTTING) */}
            <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-[1.2] tracking-tighter">
                  The chess training <br />
                  {/* Added py-4 and block to prevent clipping on the gradient text */}
                  <span className="block py-4 text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] via-white to-[#FF6B00] bg-[length:200%_auto] animate-gradient italic">
                    your mind deserves
                  </span>
                </h1>
                
                <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                  Experience world-class chess coaching designed to transform beginners into masters. Join the elite community in Amritsar.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/book-demo">
                    <Button
                      size="lg"
                      className="bg-[#FF6B00] hover:bg-[#e66000] text-white font-black text-lg px-10 py-8 rounded-2xl shadow-2xl shadow-[#FF6B00]/20 transition-all hover:scale-105 active:scale-95"
                    >
                      Book FREE Demo
                    </Button>
                  </Link>
                  <Link href="/programs">
                    <Button
                      size="lg"
                      variant="outline"
                      className="bg-white/5 border-white/20 text-white hover:bg-white/10 font-bold text-lg px-10 py-8 rounded-2xl backdrop-blur-md"
                    >
                      Explore Courses
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* 3. JASPER 3D GRID FLOOR (The "Jasper" Look) */}
            <div className="absolute bottom-0 left-0 w-full h-[40vh] perspective-[1000px] z-10 pointer-events-none overflow-hidden">
              <div 
                className="absolute inset-0 grid grid-cols-8 md:grid-cols-12 gap-3 origin-bottom transform-gpu rotate-x-[60deg] rotate-z-[-10deg] scale-150 translate-y-20"
              >
                {[...Array(48)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 20 }}
                    animate={{ height: [20, 50, 30, 60, 20][i % 5] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: i * 0.1,
                      ease: "easeInOut"
                    }}
                    className="relative w-full rounded-lg border border-white/10 bg-gradient-to-t from-[#FF6B00]/20 to-transparent backdrop-blur-sm"
                  />
                ))}
              </div>
            </div>

            {/* 4. FLOATING 3D ICON CUBES */}
            <FloatingCube icon={<Trophy className="w-6 h-6 text-[#FF6B00]" />} top="40%" left="15%" delay={0} />
            <FloatingCube icon={<Users className="w-6 h-6 text-[#FF6B00]" />} top="35%" right="15%" delay={1} />
            <FloatingCube icon={<Star className="w-6 h-6 text-[#FF6B00]" />} top="55%" right="10%" delay={0.5} />

          </section>
          <ClubAbout/>
          
          <ClubCourses/>
          <AchievementSection/>
          <TestimonialSection/>
          <BenefitsSection/>
          
          <ClubWhyChoose/>
          <FAQSection/>
          <DemoCTA/>

          {/* Rest of your sections go here (AchievementShowcase, etc.) */}

        </main>

        <Footer />
      </div>

      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 4s linear infinite;
        }
        .perspective-[1000px] {
          perspective: 1000px;
        }
      `}</style>
    </>
  )
}

function FloatingCube({ icon, top, left, right, delay }: any) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: [0, -25, 0], opacity: 1 }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay
      }}
      style={{ top, left, right }}
      className="absolute z-20 hidden md:flex items-center justify-center w-16 h-16 bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl rotate-[12deg]"
    >
      {icon}
    </motion.div>
  )
}