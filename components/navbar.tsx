"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { 
  Menu, X, ChevronDown, 
  LayoutDashboard, Brain, 
  GraduationCap, Trophy,
  Search, Newspaper, Users, Image as ImageIcon,
  Star, ChevronRight, Sparkles
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import BookDemoModal from "@/components/BookDemoModal" // Import the Modal

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Club",
    children: [
      { href: "/about", label: "About Us", desc: "Our vision & mission", icon: GraduationCap },
      { href: "/coaches", label: "Our Coaches", desc: "Meet the Grandmasters", icon: Users },
      { href: "/gallery", label: "Gallery", desc: "Tournament highlights", icon: ImageIcon },
    ],
  },
  {
    label: "Programs",
    children: [
      { href: "/curriculum", label: "Curriculum", desc: "Level-wise study plan", icon: Search },
      { href: "/tournaments", label: "Tournaments", desc: "Compete and win", icon: Trophy },
      { href: "/achievements", label: "Achievements", desc: "Student achievements", icon: Star },
    ],
  },
  {
    label: "Resources",
    children: [
      { href: "/puzzle-arena", label: "Puzzle Arena", desc: "Daily chess tactics", icon: Brain },
      { href: "/analysis", label: "Analysis Board", desc: "Analyze your games", icon: LayoutDashboard },
      { href: "/blog", label: "Chess Blog", desc: "Tips & strategies", icon: Newspaper },
    ],
  },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false) // Modal State
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header className="fixed top-0 w-full z-50 flex justify-center transition-all duration-500 pt-0">
        <nav 
          className={cn(
            "transition-all duration-500 ease-in-out flex items-center justify-between",
            scrolled 
              ? "w-[95%] max-w-6xl mt-4 rounded-full border border-slate-200 bg-white/95 backdrop-blur-md shadow-[0_10px_40px_rgba(18,18,61,0.1)] px-6 py-2" 
              : "w-full bg-white border-b border-slate-100 px-8 py-5"
          )}
        >
          <Link href="/" className="flex items-center gap-2 group">
            <div className={cn("flex items-center justify-center bg-[#12123D] rounded-xl transition-all duration-300", scrolled ? "h-10 w-10" : "h-12 w-12 group-hover:scale-105")}>
              <img src="/logo.png" alt="Logo" className="w-full h-full object-cover rounded-xl"/>
            </div>
            <span className={cn("font-bold tracking-tight whitespace-nowrap transition-all", scrolled ? "text-sm" : "text-lg text-[#12123D]")}>
              AMRITSAR <span className="text-[#FF6B00]">CHESS</span> CLUB
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden xl:flex items-center gap-2">
            {navLinks.map((item) => (
              <div key={item.label} className="relative group">
                {item.children ? (
                  <div className="flex items-center">
                    <button className="px-4 py-2 text-sm font-bold text-[#12123D] hover:text-[#FF6B00] flex items-center gap-1 transition-colors rounded-full">
                      {item.label}
                      <ChevronDown className="w-4 h-4 opacity-40 group-hover:rotate-180 transition-transform" />
                    </button>
                    
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                      <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(18,18,61,0.15)] border border-slate-50 p-3 min-w-[280px]">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="flex items-start gap-4 px-4 py-3 rounded-2xl hover:bg-slate-50 transition-all group/item"
                          >
                            <div className="p-2 bg-slate-50 rounded-lg text-[#12123D] group-hover/item:bg-[#FF6B00] group-hover/item:text-white transition-colors">
                              <child.icon className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-[#12123D]">{child.label}</p>
                              <p className="text-xs text-slate-500 whitespace-nowrap">{child.desc}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "px-4 py-2 text-sm font-bold rounded-full transition-all",
                      pathname === item.href ? "text-[#FF6B00] bg-orange-50" : "text-[#4B5563] hover:text-[#12123D]"
                    )}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <Link href="/contact" className="px-4 py-2 text-sm font-bold text-[#4B5563] hover:text-[#12123D]">Contact</Link>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden lg:flex items-center gap-2 text-sm font-bold text-[#12123D] hover:text-[#FF6B00] px-4 transition-colors">
              <LayoutDashboard className="w-4 h-4" />
              Classroom
            </Link>
            
            {/* Modal Trigger Button */}
            <Button 
              onClick={() => setIsDemoModalOpen(true)}
              className={cn(
                "bg-[#FF6B00] hover:bg-[#E66000] text-white font-bold rounded-full transition-all duration-500 shadow-lg shadow-orange-100",
                scrolled ? "px-5 h-10 text-xs" : "px-7 h-12 text-sm"
              )}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Book Demo
            </Button>
            
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="xl:hidden p-2 text-[#12123D] bg-slate-50 rounded-full hover:bg-slate-100"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="xl:hidden absolute top-20 left-4 right-4 bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden z-50 p-6"
            >
              <div className="flex flex-col gap-6 max-h-[75vh] overflow-y-auto pr-2">
                {navLinks.map((group) => (
                  <div key={group.label} className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-50 pb-2">{group.label}</p>
                    <div className="grid grid-cols-1 gap-2">
                      {group.children ? (
                        group.children.map(child => (
                          <Link key={child.href} href={child.href} onClick={() => setIsOpen(false)} className="flex items-center justify-between p-4 font-bold text-[#12123D] bg-slate-50 rounded-2xl active:bg-orange-50 group">
                            <div className="flex items-center gap-3">
                              <child.icon className="w-5 h-5 text-[#FF6B00]" /> {child.label}
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-300" />
                          </Link>
                        ))
                      ) : (
                        <Link href={group.href!} onClick={() => setIsOpen(false)} className="block p-4 font-bold text-[#12123D] bg-slate-50 rounded-2xl">{group.label}</Link>
                      )}
                    </div>
                  </div>
                ))}
                <div className="pt-4 flex flex-col gap-3">
                  <Link href="/login" className="w-full text-center py-4 font-bold text-slate-600 bg-slate-100 rounded-2xl">Student Login</Link>
                  <button 
                    onClick={() => { setIsOpen(false); setIsDemoModalOpen(true); }} 
                    className="w-full text-center py-4 font-bold text-white bg-[#FF6B00] rounded-2xl shadow-xl shadow-orange-100"
                  >
                    Book FREE Class
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* THE MODAL COMPONENT */}
      <BookDemoModal 
        isOpen={isDemoModalOpen} 
        onClose={() => setIsDemoModalOpen(false)} 
      />
    </>
  )
}