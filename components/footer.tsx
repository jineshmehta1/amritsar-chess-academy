"use client"

import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, MessageCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

export function Footer() {
  const navy = "#12123D"
  const orange = "#FF6B00"
  const purple = "#7C3AED"

  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/curriculum", label: "Curriculum" },
    { href: "/gallery", label: "Gallery" },
    { href: "/achievements", label: "Achievements" },
    { href: "/blog", label: "Chess Blog" },
  ]

  const programs = [
    { href: "/online-classes", label: "Online Classes" },
    { href: "/puzzle-arena", label: "Puzzle Arena" },
    { href: "/tournaments", label: "Tournaments" },
    { href: "/results", label: "Tournament Results" },
    { href: "/analysis", label: "Analysis Board" },
  ]

  return (
    <footer style={{ backgroundColor: navy }} className="text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Column 1: Brand Identity */}
          <div className="space-y-6 flex flex-col items-start">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12 duration-300">
                <img src="/logo.png" alt="ACA Logo" className="h-10 w-10 object-contain rounded-lg" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tighter leading-none">
                  AMRITSAR {" "}<span style={{ color: orange }}>CHESS</span>
                </span>
                <span className="text-[10px] font-bold text-white/50 tracking-[0.2em] uppercase">Club</span>
              </div>
            </Link>
            
            <p className="text-white/60 text-sm leading-relaxed max-w-xs font-medium">
              Amritsar's premier chess institution dedicated to building brilliant minds through FIDE-standard training and grandmaster mentorship.
            </p>

            {/* Social Media Buttons */}
            <div className="flex items-center gap-3">
              {[
                { icon: Facebook, href: "https://facebook.com/..." },
                { icon: Instagram, href: "https://instagram.com/..." },
                { icon: Youtube, href: "https://youtube.com/..." },
              ].map((social, i) => (
                <Link key={i} href={social.href}>
                  <Button 
                    size="icon" 
                    variant="outline" 
                    className="border-white/10 text-white hover:bg-[#FF6B00] hover:text-white hover:border-[#FF6B00] bg-white/5 rounded-xl transition-all"
                  >
                    <social.icon className="w-4 h-4" />
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:pl-8">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-8" style={{ color: orange }}>Quick Links</h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/60 hover:text-white flex items-center gap-2 group transition-all text-sm font-bold">
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" style={{ color: orange }} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Advanced Programs */}
          <div className="lg:pl-8">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-8" style={{ color: orange }}>Arena & Learning</h4>
            <ul className="space-y-4">
              {programs.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/60 hover:text-white flex items-center gap-2 group transition-all text-sm font-bold">
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" style={{ color: orange }} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Information */}
          <div className="space-y-6">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-8" style={{ color: orange }}>Reach Out</h4>
            <div className="space-y-5 text-sm font-bold">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-white/5">
                   <MapPin className="w-4 h-4" style={{ color: orange }} />
                </div>
                <p className="text-white/60 leading-relaxed">
                  Elite Training Wing, Main Market Road,<br /> Amritsar, Punjab - 143001
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/5">
                  <Phone className="w-4 h-4" style={{ color: orange }} />
                </div>
                <p className="text-white/60">+91-9988775581</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/5">
                  <Mail className="w-4 h-4" style={{ color: orange }} />
                </div>
                <p className="text-white/60 break-all">info@amritsarchessclub.com</p>
              </div>
              
              <Link href="https://wa.me/919988775581" className="block pt-2">
                <Button className="w-full bg-[#25D366] hover:bg-[#20B858] text-white font-black rounded-xl py-6 shadow-xl shadow-[#25D366]/20">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WHATSAPP US
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Bottom: Copyright and Credits */}
        <div className="mt-20 pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-white/40 text-[11px] font-bold tracking-wider uppercase">
              © 2026 Amritsar Chess Club. All rights reserved.
            </p>
            
            <div className="flex items-center gap-6">
               <Link href="/privacy" className="text-white/40 hover:text-white text-[11px] font-bold transition-colors">Privacy</Link>
               <Link href="/terms" className="text-white/40 hover:text-white text-[11px] font-bold transition-colors">Terms</Link>
               
               {/* CREDIT: JINESH MEHTA */}
               <div className="h-4 w-px bg-white/10 hidden md:block" />
               <p className="text-white/40 text-[11px] font-bold">
                Designed by{" "}
                <a 
                  href="https://wa.me/917851988964" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  style={{ color: orange }}
                >
                  Jinesh Mehta
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}