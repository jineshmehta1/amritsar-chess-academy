"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { X, Camera, Award, Users, Trophy, Quote, Search } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import GalleryHero from "@/components/galleryBanner"
import { useBookDemo } from "@/components/BookDemoProvider"

const navy = "#12123D"
const orange = "#FF6B00"

export default function GalleryPage() {
  const { openBookDemoModal } = useBookDemo()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [activeFilter, setActiveFilter] = useState("all")

  const images = [
    { id: 1, src: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80&w=2071&auto=format&fit=crop", category: "tournaments", title: "Championship Focus", label: "National Stage" },
    { id: 2, src: "https://images.unsplash.com/photo-1586165368502-1bad197a6461?q=80&w=2070&auto=format&fit=crop", category: "club", title: "Training Hall", label: "Amritsar Base" },
    { id: 3, src: "https://images.unsplash.com/photo-1528819622765-d6bcf132f793?q=80&w=2070&auto=format&fit=crop", category: "achievements", title: "Golden Moments", label: "Trophy Wall" },
    { id: 4, src: "https://images.unsplash.com/photo-1560174038-da43ac74f01b?q=80&w=2070&auto=format&fit=crop", category: "classes", title: "Junior Session", label: "Future GMs" },
    { id: 5, src: "https://images.unsplash.com/photo-1580541832626-2a7131ee809f?q=80&w=2072&auto=format&fit=crop", category: "students", title: "Strategic Analysis", label: "Deep Study" },
    { id: 6, src: "https://images.unsplash.com/photo-1611195974226-a6a9be9dd763?q=80&w=1974&auto=format&fit=crop", category: "tournaments", title: "Blitz Battle", label: "Speed Chess" },
  ]

  const filters = [
    { id: "all", label: "All Moments" },
    { id: "tournaments", label: "Events" },
    { id: "classes", label: "Training" },
    { id: "achievements", label: "Wins" },
    { id: "students", label: "Our Family" },
  ]

  const stats = [
    { label: "High Res Photos", value: "500+", icon: Camera },
    { label: "Wins Captured", value: "150+", icon: Trophy },
    { label: "Years Recorded", value: "14+", icon: Award },
  ]

  const filteredImages = activeFilter === "all" ? images : images.filter((img) => img.category === activeFilter)

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <GalleryHero />

      {/* STATS STRIP - Testimonial Style */}
      <section className="relative -mt-12 z-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={i}
              className="bg-white p-8 rounded-[2rem] shadow-xl flex items-center gap-6"
              style={{ borderBottom: `6px solid ${i % 2 === 0 ? orange : navy}` }}
            >
              <div className="p-4 rounded-2xl bg-slate-50">
                <stat.icon size={32} style={{ color: i % 2 === 0 ? orange : navy }} />
              </div>
              <div>
                <div className="text-3xl font-black" style={{ color: navy }}>{stat.value}</div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* GALLERY HEADER */}
      <section id="gallery-grid" className="pt-24 pb-12 px-6 relative overflow-hidden">
        <div className="absolute top-20 right-10 text-slate-200/50 -z-0">
          <Quote size={200} fill="currentColor" className="rotate-180" />
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: orange }} />
            <span className="text-[11px] font-black uppercase tracking-[0.4em]" style={{ color: orange }}>
              Visual Excellence
            </span>
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: orange }} />
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-12" style={{ color: navy }}>
            Capture the <span style={{ color: orange }}>Movement.</span>
          </h2>

          {/* FILTERS - Testimonial Button Style */}
          <div className="flex flex-wrap justify-center gap-3">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-300 shadow-sm ${
                  activeFilter === filter.id 
                    ? "text-white scale-105" 
                    : "bg-white text-slate-500 hover:bg-slate-100"
                }`}
                style={{ 
                  backgroundColor: activeFilter === filter.id ? navy : "",
                  borderBottom: activeFilter === filter.id ? `4px solid ${orange}` : "none"
                }}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY GRID */}
      <section className="pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, i) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-[2.5rem] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 group"
                  style={{ borderBottom: `6px solid ${i % 2 === 0 ? orange : navy}` }}
                  onClick={() => setSelectedImage(image.src)}
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#12123D]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-10">
                      <div className="bg-orange-500 text-white text-[9px] font-black uppercase tracking-widest w-fit px-3 py-1 rounded-full mb-3">
                        {image.label}
                      </div>
                      <h3 className="text-2xl font-black text-white leading-tight">{image.title}</h3>
                    </div>
                    {/* Floating Zoom Icon */}
                    <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-md p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all">
                      <Search size={20} className="text-white" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#12123D]/95 flex items-center justify-center z-[100] p-6"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-10 right-10 text-white hover:rotate-90 transition-transform">
              <X size={40} />
            </button>
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              src={selectedImage}
              className="max-w-full max-h-[80vh] rounded-[2rem] shadow-2xl border-4 border-white/10"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA SECTION - Bold Navy/Orange */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-[#12123D] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl border-b-[12px] border-orange-500">
           {/* Decorative background king */}
           <img src="/king1.png" className="absolute -bottom-10 -right-10 w-64 opacity-10 pointer-events-none" />
           
           <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tighter">
            Ready to make your <span style={{ color: orange }}>next move?</span>
           </h2>
           <p className="text-slate-400 font-medium mb-12 max-w-2xl mx-auto">
             Join Amritsar's premier chess club and start building your own gallery of victories. 
             Book a free demo session today.
           </p>

           <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <button onClick={openBookDemoModal} className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-sm transition-all hover:scale-105 shadow-lg">
                  Book Free Demo
                </button>
              <Link href="/contact">
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-sm transition-all border border-white/20">
                  Contact Coach
                </button>
              </Link>
           </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}