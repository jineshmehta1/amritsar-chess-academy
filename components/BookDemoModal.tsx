"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, Sparkles, Calendar, User, Phone, Brain, Mail, Users, Clock } from "lucide-react"

const navy = "#12123D"
const orange = "#FF6B00"

interface BookDemoModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function BookDemoModal({ isOpen, onClose }: BookDemoModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API Call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      setTimeout(() => {
        onClose()
        setIsSuccess(false)
      }, 2500)
    }, 1500)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-6">
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#12123D]/90 backdrop-blur-sm"
          />

          {/* MODAL CONTAINER */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-5xl bg-white rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[95vh] md:max-h-none overflow-y-auto md:overflow-visible"
          >
            {/* LEFT SIDE: DOTTED PATTERN & INFO */}
            <div 
              className="md:w-5/12 p-10 text-white relative flex flex-col justify-between overflow-hidden min-h-[300px] md:min-h-full"
              style={{ backgroundColor: navy }}
            >
              {/* THE DOTTED PATTERN */}
              <div className="absolute inset-0 opacity-20 pointer-events-none" 
                   style={{ backgroundImage: `radial-gradient(${orange} 1.5px, transparent 0)`, backgroundSize: '24px 24px' }} 
              />
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles size={20} style={{ color: orange }} />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">Amritsar Club</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black tracking-tighter leading-tight mb-4">
                  Make Your <br /> <span style={{ color: orange }}>First Move.</span>
                </h2>
                <p className="text-slate-400 text-sm font-medium leading-relaxed">
                  Book a personalized 1-on-1 demo session to assess your current level and build your roadmap to chess mastery.
                </p>
              </div>

              <div className="relative z-10 space-y-4 mt-8">
                {[
                  { icon: Brain, text: "Skill Assessment" },
                  { icon: Clock, text: "45-Min Session" },
                  { icon: Send, text: "WhatsApp Updates" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest">
                    <item.icon size={16} style={{ color: orange }} />
                    {item.text}
                  </div>
                ))}
              </div>

              {/* Decorative King */}
              <img src="/king1.png" className="absolute -bottom-10 -left-10 w-48 opacity-10 pointer-events-none" alt="" />
            </div>

            {/* RIGHT SIDE: THE FORM */}
            <div className="md:w-7/12 p-8 md:p-12 bg-white relative overflow-y-auto">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 text-slate-300 hover:text-slate-900 transition-colors z-20"
              >
                <X size={24} />
              </button>

              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full min-h-[400px] flex flex-col items-center justify-center text-center space-y-4"
                >
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-4">
                    <Sparkles size={40} />
                  </div>
                  <h3 className="text-2xl font-black" style={{ color: navy }}>Checkmate!</h3>
                  <p className="text-slate-500 font-medium">Request received. Our team will contact you on WhatsApp to confirm your slot.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* STUDENT INFO GROUP */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Student Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                        <input required className="w-full bg-slate-50 border-none h-12 rounded-xl pl-11 pr-4 font-bold text-sm focus:ring-2 focus:ring-orange-500 transition-all" placeholder="Child's name" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Student Age</label>
                      <input required type="number" className="w-full bg-slate-50 border-none h-12 rounded-xl px-4 font-bold text-sm focus:ring-2 focus:ring-orange-500 transition-all" placeholder="Years" />
                    </div>
                  </div>

                  {/* PARENT INFO GROUP */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Parent/Guardian Name</label>
                      <div className="relative">
                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                        <input required className="w-full bg-slate-50 border-none h-12 rounded-xl pl-11 pr-4 font-bold text-sm focus:ring-2 focus:ring-orange-500 transition-all" placeholder="Parent's name" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">WhatsApp Number</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                        <input required type="tel" className="w-full bg-slate-50 border-none h-12 rounded-xl pl-11 pr-4 font-bold text-sm focus:ring-2 focus:ring-orange-500 transition-all" placeholder="+91 00000 00000" />
                      </div>
                    </div>
                  </div>

                  {/* CONTACT GROUP */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                      <input required type="email" className="w-full bg-slate-50 border-none h-12 rounded-xl pl-11 pr-4 font-bold text-sm focus:ring-2 focus:ring-orange-500 transition-all" placeholder="email@example.com" />
                    </div>
                  </div>

                  {/* EXPERIENCE & PREFERENCE GROUP */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Chess Level</label>
                      <select className="w-full bg-slate-50 border-none h-12 rounded-xl px-4 font-bold text-xs appearance-none cursor-pointer focus:ring-2 focus:ring-orange-500">
                        <option>Complete Beginner</option>
                        <option>Knows basics (Intermediate)</option>
                        <option>Rated Player (Advanced)</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Preferred Demo Slot</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                        <select className="w-full bg-slate-50 border-none h-12 rounded-xl pl-11 pr-4 font-bold text-xs appearance-none cursor-pointer focus:ring-2 focus:ring-orange-500">
                          <option>Weekday Evening</option>
                          <option>Weekend Morning</option>
                          <option>Weekend Evening</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* HOW DID YOU HEAR ABOUT US */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">How did you find us?</label>
                    <select className="w-full bg-slate-50 border-none h-12 rounded-xl px-4 font-bold text-xs appearance-none cursor-pointer focus:ring-2 focus:ring-orange-500">
                      <option>Social Media (Instagram/Facebook)</option>
                      <option>Google Search</option>
                      <option>Referral (Friend/Family)</option>
                      <option>Local Advertisement</option>
                    </select>
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 rounded-xl text-white font-black uppercase tracking-widest text-xs shadow-xl transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 mt-4"
                    style={{ backgroundColor: orange }}
                  >
                    {isSubmitting ? "Processing..." : "Confirm Free Demo Class"}
                  </button>
                  
                  <p className="text-center text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                    No payment required • 45-Minute Session
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}