"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { MapPin, Phone, Mail, Send, Award, Users, Trophy, Sparkles } from "lucide-react"

import { sendContactEmail } from "@/app/actions/sendEmail"
import ContactHero from "@/components/contactBanner"
import FAQSection from "@/components/faq"

const navy = "#12123D"
const orange = "#FF6B00"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    experience: "",
    program: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    const result = await sendContactEmail(formData)

    if (result.success) {
      setSubmitStatus("success")
      setFormData({
        name: "", email: "", phone: "", age: "", experience: "", program: "", message: "",
      })
    } else {
      setSubmitStatus("error")
    }
    setIsSubmitting(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-orange-100 selection:text-orange-600">
      <Navbar />
      <ContactHero />

      {/* 1. STATS STRIP */}
      <section className="relative -mt-10 md:-mt-16 z-20 px-4 md:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {[
            { icon: Award, val: "14+", label: "Years of Mastery", color: navy },
            { icon: Users, val: "1500+", label: "Strategic Minds Trained", color: orange },
            { icon: Trophy, val: "50+", label: "National Champions", color: navy },
          ].map((stat, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              key={i}
              className="bg-white p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] shadow-xl flex items-center gap-5 md:gap-6 border-b-[6px]"
              style={{ borderBottomColor: stat.color }}
            >
              <div className="p-3 md:p-4 rounded-2xl bg-slate-50 shrink-0">
                <stat.icon className="w-6 h-6 md:w-8 md:h-8" style={{ color: stat.color }} />
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-black" style={{ color: navy }}>{stat.val}</div>
                <div className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 2. MAIN CONTACT SECTION */}
      <section className="py-16 md:py-32 bg-white px-4 md:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* LEFT: INFO COLUMN */}
            <div className="lg:col-span-5 space-y-8 md:space-y-12">
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                  <Sparkles className="w-4 h-4" style={{ color: orange }} />
                  <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em]" style={{ color: orange }}>Connect with Us</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight" style={{ color: navy }}>
                  Let’s Discuss Your <br className="hidden md:block" /> <span style={{ color: orange }}>Next Move.</span>
                </h2>
                <p className="mt-4 md:mt-6 text-slate-500 font-medium text-base md:text-lg leading-relaxed px-2 lg:px-0">
                  Have questions about our FIDE-certified curriculum? 
                  Our team is ready to guide you towards strategic excellence.
                </p>
              </div>

              <div className="space-y-4 md:space-y-6">
                {[
                  { icon: MapPin, title: "Our Club", detail: "Mall Road, Amritsar, Punjab 143001", color: navy },
                  { icon: Phone, title: "Call/WhatsApp", detail: "+91 99887 75581", color: orange },
                  { icon: Mail, title: "Email Address", detail: "contact@amritsarchess.com", color: navy },
                ].map((item, i) => (
                  <motion.div 
                    whileHover={{ x: 10 }}
                    key={i} 
                    className="flex items-start gap-4 md:gap-6 p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] bg-slate-50 border border-slate-100 transition-all"
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 text-white shadow-lg" style={{ backgroundColor: item.color }}>
                      <item.icon size={18} />
                    </div>
                    <div>
                      <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-1 text-slate-400">{item.title}</h4>
                      <p className="text-base md:text-lg font-bold break-words" style={{ color: navy }}>{item.detail}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* RIGHT: FORM COLUMN */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 shadow-2xl border border-slate-100 relative overflow-hidden"
              >
                {/* Decorative Background Icon - Responsive Size */}
                <Trophy className="absolute -bottom-10 -right-10 text-slate-50 -z-0 opacity-50 md:opacity-100" size={150} />
                
                <form onSubmit={handleSubmit} className="relative z-10 space-y-5 md:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                    <div className="space-y-2">
                      <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Full Name</label>
                      <Input
                        name="name" required value={formData.name} onChange={handleChange}
                        className="bg-slate-50 border-none h-12 md:h-14 rounded-xl md:rounded-2xl px-6 focus-visible:ring-2 focus-visible:ring-orange-500 font-bold"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Email</label>
                      <Input
                        name="email" type="email" required value={formData.email} onChange={handleChange}
                        className="bg-slate-50 border-none h-12 md:h-14 rounded-xl md:rounded-2xl px-6 focus-visible:ring-2 focus-visible:ring-orange-500 font-bold"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                    <div className="space-y-2">
                      <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">WhatsApp Number</label>
                      <Input
                        name="phone" required value={formData.phone} onChange={handleChange}
                        className="bg-slate-50 border-none h-12 md:h-14 rounded-xl md:rounded-2xl px-6 focus-visible:ring-2 focus-visible:ring-orange-500 font-bold"
                        placeholder="+91 00000 00000"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Interested Program</label>
                      <select
                        name="program" value={formData.program} onChange={handleChange}
                        className="w-full bg-slate-50 border-none h-12 md:h-14 rounded-xl md:rounded-2xl px-6 focus:ring-2 focus:ring-orange-500 font-bold text-sm appearance-none cursor-pointer"
                      >
                        <option value="">Select a program</option>
                        <option value="beginner">Chess Foundations</option>
                        <option value="intermediate">Strategic Mastery</option>
                        <option value="advanced">Grandmaster Path</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Message</label>
                    <Textarea
                      name="message" required rows={4} value={formData.message} onChange={handleChange}
                      className="bg-slate-50 border-none rounded-xl md:rounded-[1.5rem] p-6 focus-visible:ring-2 focus-visible:ring-orange-500 font-bold min-h-[120px]"
                      placeholder="How can we help you master the board?"
                    />
                  </div>

                  {submitStatus === "success" && (
                    <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="p-4 bg-green-50 text-green-700 rounded-xl md:rounded-2xl text-xs md:text-sm font-bold text-center">
                      ✓ Thank you! We will reach out shortly.
                    </motion.div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 md:h-16 rounded-full text-white font-black uppercase tracking-widest shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
                    style={{ backgroundColor: orange }}
                  >
                    {isSubmitting ? "Sending Move..." : "Send Message & Book Demo"}
                    <Send className="ml-3 w-4 h-4" />
                  </Button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MAP SECTION */}
      <section className="pb-16 md:pb-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center lg:items-end mb-8 md:mb-12 gap-6 text-center md:text-left">
             <div className="max-w-xl">
                <h2 className="text-2xl md:text-4xl font-black tracking-tighter" style={{ color: navy }}>
                   Visit the <span style={{ color: orange }}>Arena.</span>
                </h2>
                <p className="text-slate-500 font-medium mt-2 md:mt-4 text-sm md:text-base">
                  Located in the cultural heart of Amritsar, our club is easily accessible and designed to inspire.
                </p>
             </div>
             <Link href="https://maps.google.com" target="_blank" className="w-full md:w-auto">
                <Button variant="outline" className="w-full md:w-auto rounded-full px-8 py-6 border-slate-200 font-black uppercase tracking-widest text-[10px]">
                   Open in Google Maps
                </Button>
             </Link>
          </div>
          <div className="rounded-[1.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl border-[6px] md:border-[12px] border-slate-50 h-[300px] md:h-[500px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3396.6575000000003!2d74.87226!3d31.63398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDM4JzAyLjMiTiA3NMKwNTInMjAuMSJF!5e0!3m2!1sen!2sin!4v1625573456789!5m2!1sen!2sin"
              width="100%" height="100%" style={{ border: 0 }} loading="lazy"
            />
          </div>
        </div>
      </section>

      <FAQSection/>

      {/* 4. FINAL CTA */}
      <section className="py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-6xl mx-auto bg-[#12123D] rounded-[2rem] md:rounded-[3rem] p-8 md:p-20 text-center relative overflow-hidden shadow-2xl border-b-[8px] md:border-b-[12px] border-orange-500">
           <img src="/king1.png" className="absolute -bottom-10 -left-10 w-48 md:w-64 opacity-10 pointer-events-none" alt="" />
           <h2 className="text-2xl md:text-5xl font-black text-white mb-6 md:mb-8 tracking-tighter relative z-10 leading-tight">
            Ready to make your <span style={{ color: orange }}>next move?</span>
           </h2>
           <p className="text-slate-400 font-medium mb-10 md:mb-12 max-w-2xl mx-auto text-sm md:text-base relative z-10">
             Join Amritsar's premier chess club and start building your own gallery of victories. 
           </p>
           <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-20">
              <Link href="https://wa.me/919988775581" className="w-full sm:w-auto">
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 md:px-10 md:py-5 rounded-full font-black uppercase tracking-widest text-[10px] md:text-xs transition-all hover:scale-105 active:scale-95 shadow-lg">
                  Book Free Demo
                </button>
              </Link>
              <Button variant="outline" className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-8 py-4 md:px-10 md:py-5 rounded-full font-black uppercase tracking-widest text-[10px] md:text-[11px] transition-all border border-white/20 active:scale-95">
                Call: +91 99887 75581
              </Button>
           </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}