"use client"

import React, { useState } from "react"
import { Trophy, Calendar } from "lucide-react"
import { motion } from "framer-motion"

interface PlayerProps {
  name: string
  prize: string
  image: string
  initials: string
  place: "1st" | "2nd" | "3rd"
}

function WinnerRow({ name, prize, image, initials, place }: PlayerProps) {
  const [imgError, setImgError] = useState(false)

  const placeBadge = {
    "1st": "🥇",
    "2nd": "🥈",
    "3rd": "🥉",
  }[place]

  const ringColor = {
    "1st": "border-amber-400 bg-amber-50 text-amber-600",
    "2nd": "border-slate-300 bg-slate-100 text-slate-600",
    "3rd": "border-amber-600/30 bg-amber-50/30 text-amber-700",
  }[place]

  return (
    <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-slate-50/60 border border-slate-100 hover:bg-slate-50 transition-all duration-300">
      <div className="relative shrink-0">
        <div className={`w-16 h-16 rounded-full overflow-hidden border-2 flex items-center justify-center font-bold text-lg ${ringColor}`}>
          {!imgError ? (
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <span>{initials}</span>
          )}
        </div>
        <span className="absolute -top-1 -left-1 bg-white text-sm w-6 h-6 rounded-full flex items-center justify-center shadow-sm font-bold border border-slate-100">
          {placeBadge}
        </span>
      </div>
      <div>
        <h4 className="font-bold text-[#12123D] text-base leading-tight">{name}</h4>
        <p className={`${place === "1st" ? "text-[#FF6B00]" : "text-slate-500"} text-xs font-bold mt-1 uppercase tracking-wide`}>
          {prize}
        </p>
      </div>
    </div>
  )
}

export function CompletedTournaments() {
  const [u17ThirdPlace1Error, setU17ThirdPlace1Error] = useState(false)
  const [u17ThirdPlace2Error, setU17ThirdPlace2Error] = useState(false)

  return (
    <section className="pt-16 border-t border-slate-200/80 space-y-12">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-orange-100 text-[#FF6B00] rounded-full px-4 py-1.5 text-sm font-bold mb-2">
          <Trophy className="w-4 h-4" />
          Championship History
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-[#12123D] tracking-tight">
          Tournament Winners & Standings
        </h2>
        <p className="text-slate-500 text-sm max-w-xl mx-auto">
          Honoring the champions of our local chess tournaments. Select division to review winners.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Under 11 Division */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-slate-100 space-y-6 flex flex-col justify-between"
        >
          <div className="space-y-6">
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-black text-[#FF6B00] tracking-widest uppercase">Division U-11</span>
                <h3 className="text-2xl font-black text-[#12123D] mt-0.5">Under 11 Champion</h3>
              </div>
              <div className="flex items-center gap-1.5 bg-[#12123D] text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                <Calendar className="w-3.5 h-3.5" />
                19 July 2026
              </div>
            </div>

            <div className="text-slate-500 text-sm font-medium">
              Amritsar Chess Club Under 11 Tournament held on 19 July 2026.
            </div>

            <div className="space-y-3">
              <WinnerRow
                name="Krishaang Gupta"
                prize="First Prize Winner"
                image="/111.jpeg"
                initials="KG"
                place="1st"
              />
              <WinnerRow
                name="Prabnoor Singh"
                prize="Second Prize Winner"
                image="/112.jpeg"
                initials="PS"
                place="2nd"
              />
              <WinnerRow
                name="Devarsh"
                prize="Third Prize Winner"
                image="/113.jpeg"
                initials="D"
                place="3rd"
              />
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2">
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-wide">Tournament Group Photo</p>
              <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm bg-slate-50 aspect-[16/10]">
                <img
                  src="/g11.jpeg"
                  alt="Under 11 Tournament Group Photo"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Under 17 Division */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-slate-100 space-y-6 flex flex-col justify-between"
        >
          <div className="space-y-6">
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-black text-[#FF6B00] tracking-widest uppercase">Division U-17</span>
                <h3 className="text-2xl font-black text-[#12123D] mt-0.5">Under 17 Champion</h3>
              </div>
              <div className="flex items-center gap-1.5 bg-[#12123D] text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                <Calendar className="w-3.5 h-3.5" />
                19 July 2026
              </div>
            </div>

            <div className="text-slate-500 text-sm font-medium">
              Amritsar Chess Club Under 17 Tournament held on 19 July 2026.
            </div>

            <div className="space-y-3">
              <WinnerRow
                name="Manraj Singh"
                prize="First Prize Winner"
                image="/images/manraj.png"
                initials="MS"
                place="1st"
              />
              <WinnerRow
                name="Prabnoor Singh"
                prize="Second Prize Winner"
                image="/images/prabnoor.png"
                initials="PS"
                place="2nd"
              />

              {/* Shared Third Prize */}
              <div className="flex flex-col gap-3.5 p-4 rounded-2xl bg-slate-50/60 border border-slate-100 hover:bg-slate-50 transition-all duration-300">
                <div className="flex items-center gap-2 pb-1 border-b border-slate-100/50">
                  <span className="text-sm">🥉</span>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-wide">Third Prize Winners (Shared)</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {/* Jaskaran Singh */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center font-bold text-slate-500 shrink-0">
                      {!u17ThirdPlace1Error ? (
                        <img
                          src="/images/jaskaran.png"
                          alt="Jaskaran Singh"
                          className="w-full h-full object-cover"
                          onError={() => setU17ThirdPlace1Error(true)}
                        />
                      ) : (
                        <span>JS</span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <h5 className="font-bold text-[#12123D] text-sm truncate">Jaskaran Singh</h5>
                      <p className="text-slate-400 text-[10px] font-medium leading-none mt-0.5">3rd Place</p>
                    </div>
                  </div>

                  {/* Devgya */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center font-bold text-slate-500 shrink-0">
                      {!u17ThirdPlace2Error ? (
                        <img
                          src="/images/devgya.png"
                          alt="Devgya"
                          className="w-full h-full object-cover"
                          onError={() => setU17ThirdPlace2Error(true)}
                        />
                      ) : (
                        <span>DG</span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <h5 className="font-bold text-[#12123D] text-sm truncate">Devgya</h5>
                      <p className="text-slate-400 text-[10px] font-medium leading-none mt-0.5">3rd Place</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2">
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-wide">Tournament Group Photo</p>
              <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm bg-slate-50 aspect-[16/10]">
                <img
                  src="/g17.jpeg"
                  alt="Under 17 Tournament Group Photo"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
