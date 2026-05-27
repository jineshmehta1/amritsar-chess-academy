"use client"

import { motion } from "framer-motion"
import { 
  Trophy, 
  Medal, 
  Flag, 
  MapPin, 
  Star, 
  Quote, 
  Share2 
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function AchievementShowcase() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-amber-50 to-white">
      {/* Background Animated Elements (Confetti/Glitter) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full w-3 h-3 opacity-40"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: -20, 
              scale: Math.random() 
            }}
            animate={{ 
              y: "120vh", 
              rotate: 360,
              x: `+=${Math.random() * 100 - 50}px` 
            }}
            transition={{ 
              duration: 5 + Math.random() * 5, 
              repeat: Number.POSITIVE_INFINITY, 
              delay: Math.random() * 5,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-white border border-amber-200 px-6 py-2 rounded-full mb-6 shadow-md">
            <Trophy className="w-5 h-5 text-amber-600" />
            <span className="font-bold text-amber-800 uppercase tracking-wide text-xs sm:text-sm">
              Amritsar Chess Club Pride
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
            Congratulations
          </h2>
          <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Fide Master Madhvendra Pratap Sharma
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Player Profile Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-md"
            >
              <Card className="bg-white border-0 shadow-2xl overflow-hidden ring-4 ring-amber-100 relative group">
                {/* Card Header Background */}
                <div className="absolute top-0 w-full h-32 bg-gradient-to-r from-purple-700 to-blue-700">
                   <div className="absolute inset-0 opacity-20 bg-[url('/chess-pattern.svg')]"></div>
                </div>
                
                <CardContent className="pt-20 pb-8 px-6 text-center relative">
                  {/* Profile Image Container */}
                  <div className="relative inline-block mb-4">
                    <div className="w-48 h-48 mx-auto rounded-full p-1.5 bg-gradient-to-tr from-amber-300 via-yellow-500 to-amber-300 shadow-xl">
                      <div className="w-full h-full rounded-full overflow-hidden border-4 border-white bg-gray-100">
                        {/* REPLACE WITH ACTUAL IMAGE PATH */}
                        <img 
                          src="/man-4.jpg" 
                          alt="CM Madhvendra Pratap Sharma" 
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    </div>
                    {/* ELO Badge */}
                    <div className="absolute -bottom-2 -right-2 bg-white px-3 py-1 rounded-full shadow-lg border border-gray-100 flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-bold text-gray-900">ELO 2273</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-black text-gray-900 mb-1">Madhvendra Pratap Sharma</h3>
                  <p className="text-purple-600 font-bold mb-6 text-sm tracking-wider">FIDE MASTER</p>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-amber-50 rounded-xl p-3 border border-amber-100">
                      <Trophy className="w-6 h-6 text-amber-600 mx-auto mb-1" />
                      <span className="block text-xs font-bold text-amber-800">Gold Medal</span>
                      <span className="text-[10px] text-amber-600">Asian Youth 2025</span>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
                      <Trophy className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                      <span className="block text-xs font-bold text-blue-800">Gold Medal</span>
                      <span className="text-[10px] text-blue-600">Commonwealth</span>
                    </div>
                  </div>

                  <p className="text-gray-500 text-sm italic border-t pt-4">
                    "A shining example of dedication and strategic brilliance at Amritsar Chess Club."
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Achievement Details */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Achievement 1: Asian Youth */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border-l-8 border-amber-400 flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                <div className="flex-shrink-0 bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center">
                  <Medal className="w-8 h-8 text-amber-600" />
                </div>
                <div className="text-center sm:text-left">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    Gold Medalist - Asian Youth Chess Championship 2025
                  </h4>
                  <div className="flex flex-wrap gap-3 justify-center sm:justify-start mb-3">
                    <span className="inline-flex items-center text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                      <MapPin className="w-3 h-3 mr-1" /> Thailand
                    </span>
                    <span className="inline-flex items-center text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                      Category: U12
                    </span>
                  </div>
                  <p className="text-gray-600">
                    Securing the top position representing India against the best young minds in Asia. A historic win for the club!
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Achievement 2: Commonwealth */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border-l-8 border-blue-500 flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                <div className="flex-shrink-0 bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center">
                  <Flag className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-center sm:text-left">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    Gold Medalist - Commonwealth Championship
                  </h4>
                  <div className="flex flex-wrap gap-3 justify-center sm:justify-start mb-3">
                    <span className="inline-flex items-center text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                      <MapPin className="w-3 h-3 mr-1" /> Malaysia
                    </span>
                    <span className="inline-flex items-center text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                      International Squad
                    </span>
                  </div>
                  <p className="text-gray-600">
                    Selected to carry the Indian flag at the prestigious Commonwealth Chess Championship.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="pt-4 flex justify-center sm:justify-start"
            >
              <Link href="/book-demo">
                <Button className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-6 rounded-full text-lg font-bold shadow-lg transition-all hover:scale-105">
                  Train With Champions
                </Button>
              </Link>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}