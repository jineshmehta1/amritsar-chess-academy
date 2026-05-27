"use client"

import { motion } from "framer-motion"
import { 
  Award, 
  UserCheck, 
  Users, 
  ChevronRight, 
  Star
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function MinisterFelicitation() {
  
  // 5 Photos mapped to a 3-column, 3-row Bento Grid
  const photos = [
    { 
      src: "/program33.jpeg", 
      alt: "Main Ceremony", 
      className: "col-span-2 row-span-2" // Large main image
    },
    { 
      src: "/program9.jpeg", 
      alt: "Minister Interaction", 
      className: "col-span-1 row-span-1" 
    },
    { 
      src: "/program8.jpeg", // Replace with your actual path
      alt: "Ceremony Moment", 
      className: "col-span-1 row-span-1" 
    },
    { 
      src: "/program4.jpeg", // Replace with your actual path
      alt: "Club Pride", 
      className: "col-span-1 row-span-1" 
    },
    { 
      src: "/program18.jpeg", // Replace with your actual path
      alt: "Group Achievement", 
      className: "col-span-2 row-span-1" // Wide bottom image
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative Background Text */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 opacity-[0.02] select-none pointer-events-none hidden lg:block">
        <h2 className="text-[15vw] font-black uppercase leading-none">Excellence</h2>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center mb-16">
          
          {/* TEXT CONTENT: Spans 5 columns */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="inline-flex items-center gap-2 bg-amber-100 border border-amber-200 px-4 py-1.5 rounded-full">
              <Award className="w-4 h-4 text-amber-700" />
              <span className="text-amber-800 font-bold text-xs uppercase tracking-widest">Global Achievement</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-[1.1]">
              A Remarkable Recognition by <span className="text-blue-700 font-serif italic">State Leadership</span>
            </h2>

            <div className="space-y-4 text-slate-600 text-base md:text-lg leading-relaxed">
              <p>
                We are immensely proud to share that our star student, 
                <span className="text-slate-900 font-bold"> Madhvendra Pratap Sharma</span>, 
                was recently facilitated in a prestigious program for his outstanding international chess achievements.
              </p>
              <div className="bg-white p-5 rounded-2xl border-l-4 border-blue-600 shadow-sm space-y-3">
                <p className="font-medium text-slate-800">The ceremony was graced by:</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-blue-700 font-bold">
                    <ChevronRight className="w-4 h-4" /> Shri Goutam Dak (Minister)
                  </li>
                  <li className="flex items-center gap-2 text-blue-700 font-bold">
                    <ChevronRight className="w-4 h-4" /> Shri Babulal Kharadi (Cabinet Minister)
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 pt-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-slate-700" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Honoree</p>
                  <p className="text-sm font-bold text-slate-900">Madhvendra Pratap</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
                  <Users className="w-5 h-5 text-slate-700" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Event</p>
                  <p className="text-sm font-bold text-slate-900">Ministerial Program</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* BENTO IMAGE GRID: Spans 7 columns */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-3 grid-rows-3 gap-3 md:gap-4 h-[500px] md:h-[650px]">
              {photos.map((photo, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`${photo.className} relative rounded-2xl md:rounded-[2rem] overflow-hidden group shadow-lg border-2 border-white`}
                >
                  <img 
                    src={photo.src} 
                    alt={photo.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Subtle Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 md:p-6">
                    <p className="text-white text-xs md:text-sm font-semibold translate-y-2 group-hover:translate-y-0 transition-transform">
                      {photo.alt}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-slate-900 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl"
        >
          {/* Subtle glow effect in CTA */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl"></div>
          
          <div className="flex items-center gap-6 relative z-10">
            <div className="hidden sm:flex w-16 h-16 bg-blue-600 rounded-2xl items-center justify-center rotate-12 shadow-lg shadow-blue-500/20">
               <Star className="w-8 h-8 text-white fill-white" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">Inspired by Excellence?</h3>
              <p className="text-slate-400 max-w-md">Begin your journey at the club where champions are nurtured and recognized by the nation.</p>
            </div>
          </div>
          <Button className="bg-white text-slate-900 hover:bg-blue-50 px-8 h-14 rounded-full font-bold text-lg group relative z-10 shadow-xl">
            Book a Demo Class <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}