"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Plus, 
  Minus, 
  ChevronDown, 
  HelpCircle, 
  Headset, 
  Mail, 
  Phone, 
  MessageSquare 
} from "lucide-react"

const faqData = [
  {
    question: "Who can join your chess coaching programs?",
    answer: "Our programs are designed for all ages and skill levels—from complete beginners to advanced players. Whether you're a child taking your first steps or a tournament player aiming for the next level, we have the right program for you."
  },
  {
    question: "What age groups do you work with?",
    answer: "We primarily work with children aged 5 and above, as well as adults. Our curriculum is tailored to the cognitive development stages of different age groups."
  },
  {
    question: "Are the classes online or offline?",
    answer: "We offer both! We have a physical club in Amritsar for local students and a robust online platform for students joining us from across the globe."
  },
  {
    question: "How are the classes structured?",
    answer: "Classes are a mix of theoretical lessons, tactical drills, and supervised play. Each session is designed to build on the previous one for a structured learning path."
  },
  {
    question: "Do you provide training for tournaments?",
    answer: "Yes, our advanced modules focus specifically on tournament preparation, including opening novelties, endgame mastery, and time management."
  },
  {
    question: "How can I get started?",
    answer: "Simply book a free demo class through our website. We will evaluate your current level and suggest the best program to begin your journey."
  }
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const navy = "#12123D"
  const orange = "#FF6B00"

  return (
    <section className="py-16 md:py-24 bg-white px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* TOP HEADER */}
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
            <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em]" style={{ color: orange }}>
              FAQ
            </span>
            <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black tracking-tighter mb-4"
            style={{ color: navy }}
          >
            Frequently Asked <span style={{ color: orange }}>Questions</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-slate-500 text-sm md:text-base font-medium max-w-2xl mx-auto px-4"
          >
            Find answers to common questions about our coaching programs and chess learning journey.
          </motion.p>
        </div>

        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mb-16 md:mb-20">
          
          {/* LEFT SUPPORT CARD */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 bg-slate-50 rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden flex flex-col min-h-[320px] lg:min-h-[600px]"
          >
            <div className="relative z-10">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 md:mb-8">
                <HelpCircle className="w-7 h-7 md:w-8 md:h-8" style={{ color: orange }} />
              </div>
              <h3 className="text-2xl md:text-3xl font-black leading-tight mb-4 md:mb-6 text-[#12123D]">
                Got Questions? <br />
                We're Here to Help!
              </h3>
              <div className="h-1 w-12 bg-orange-500 rounded-full mb-6 md:mb-8" />
              <p className="text-slate-500 text-sm md:text-base font-medium leading-relaxed max-w-xs">
                Whether you're just starting out or looking to compete at the highest level, we're with you every step of the way.
              </p>
            </div>

            {/* Decorative Chess Piece Image - Responsive positioning */}
            <img 
              src="/king1.png" 
              alt="Chess King" 
              className="absolute -bottom-4 -right-10 md:right-[-20%] w-48 md:w-[80%] h-auto opacity-40 md:opacity-100 grayscale pointer-events-none"
            />
          </motion.div>

          {/* RIGHT ACCORDION */}
          <div className="lg:col-span-8 space-y-4">
            {faqData.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-start gap-3 md:gap-4 p-5 md:p-6 text-left hover:bg-slate-50/50 transition-colors group"
                >
                  <div 
                    className="w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all mt-0.5"
                    style={{ backgroundColor: openIndex === index ? orange : "#F1F5F9" }}
                  >
                    {openIndex === index ? (
                      <Minus className="w-4 h-4 text-white" />
                    ) : (
                      <Plus className="w-4 h-4" style={{ color: orange }} />
                    )}
                  </div>
                  <span className="flex-grow font-black text-[#12123D] text-sm md:text-base pr-2">
                    {faq.question}
                  </span>
                  <ChevronDown 
                    className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-300 mt-1 ${openIndex === index ? "rotate-180" : ""}`} 
                  />
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="pl-14 md:pl-18 pr-6 pb-6 md:pb-8 text-slate-500 font-medium text-xs md:text-sm leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* BOTTOM CONTACT BAR */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 shadow-[0_10px_50px_rgba(0,0,0,0.05)] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4 border border-slate-50"
        >
          {/* Still Have Questions */}
          <div className="flex items-center gap-4 md:gap-5 px-2 md:px-4">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full flex-shrink-0 flex items-center justify-center bg-[#12123D] text-white">
              <Headset size={22} />
            </div>
            <div>
              <div className="text-sm md:text-base font-black text-[#12123D]">Still Have Questions?</div>
              <div className="text-[10px] md:text-xs font-bold text-slate-400">Our team is happy to help you find the path.</div>
            </div>
          </div>

          {/* Email Us */}
          <div className="flex items-center gap-4 md:gap-5 px-2 md:px-4 md:border-l border-slate-100">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full flex-shrink-0 flex items-center justify-center bg-white shadow-md">
              <Mail className="w-5 h-5 md:w-6 md:h-6 text-orange-500 fill-white" strokeWidth={2.5} />
            </div>
            <div>
              <div className="text-sm md:text-base font-black text-[#12123D]">Email Us</div>
              <div className="text-[10px] md:text-xs font-bold text-orange-600">info@amritsarchessclub.in</div>
            </div>
          </div>

          {/* Call Us */}
          <div className="flex items-center gap-4 md:gap-5 px-2 md:px-4 lg:border-l border-slate-100">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full flex-shrink-0 flex items-center justify-center bg-[#12123D] text-white">
              <Phone size={22} fill="white" />
            </div>
            <div>
              <div className="text-sm md:text-base font-black text-[#12123D]">Call Us</div>
              <div className="text-[10px] md:text-xs font-bold text-slate-500">+91 95920 04076</div>
            </div>
          </div>

          {/* Chat With Us */}
          <div className="flex items-center gap-4 md:gap-5 px-2 md:px-4 lg:border-l border-slate-100 relative group">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full flex-shrink-0 flex items-center justify-center bg-orange-500 text-white transition-transform group-hover:scale-110">
              <MessageSquare size={22} fill="white" />
            </div>
            <div>
              <div className="text-sm md:text-base font-black text-[#12123D]">Chat With Us</div>
              <div className="text-[10px] md:text-xs font-bold text-slate-500">Click the chat icon on our website</div>
            </div>
            <img src="https://cdn-icons-png.flaticon.com/512/3645/3645851.png" className="absolute right-0 bottom-0 w-6 h-6 md:w-8 md:h-8 opacity-10" alt="pawn" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}