import { Award, Medal, Globe, GraduationCap, CheckCircle2, Trophy } from "lucide-react";

export default function FMAwardSection() {
  return (
    <section className="py-12 md:py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Media Side-by-Side (Vertical) */}
          {/* order-2 lg:order-1 ensures media comes after text on mobile if you prefer, 
              but usually, the visual is better first. Keeping it as is for impact. */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-3 md:gap-6">
            {/* Vertical Video */}
            <div className="relative aspect-[9/16] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden bg-violet-950 shadow-2xl shadow-purple-200 border-2 md:border-4 border-violet-50">
              <video 
                autoPlay 
                muted 
                loop 
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/manv.mp4" type="video/mp4" />
              </video>
              <div className="absolute top-3 left-3 md:top-5 md:left-5">
                <span className="bg-orange-500 text-white text-[8px] md:text-[10px] font-black px-2 md:px-3 py-1 rounded-full uppercase tracking-widest">
                  Live Action
                </span>
              </div>
            </div>

            {/* Vertical Photo */}
            <div className="relative aspect-[9/16] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden bg-violet-100 shadow-2xl shadow-purple-200 border-2 md:border-4 border-violet-50">
              <img 
                src="/fide-manvendra.jpeg" 
                alt="Madhvendra Pratap Sharma" 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 md:top-5 md:left-5">
                <span className="bg-violet-600 text-white text-[8px] md:text-[10px] font-black px-2 md:px-3 py-1 rounded-full uppercase tracking-widest">
                  Official
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Text Content */}
          <div className="lg:col-span-5 space-y-6 md:space-y-8 text-center lg:text-left">
            <div className="space-y-3 md:space-y-4">
              <div className="inline-flex items-center gap-2 text-orange-600 font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs justify-center lg:justify-start">
                <Trophy size={16} className="md:w-[18px]" /> International Achievement
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-violet-950 uppercase tracking-tighter leading-[1] md:leading-[0.9]">
                Congratulations <br />
                <span className="text-orange-500">Madhvendra Pratap Sharma</span>
              </h2>
              <p className="text-lg md:text-xl font-bold text-violet-800/60 uppercase tracking-widest">
                FIDE Master (FM) Title
              </p>
            </div>

            {/* FIDE Details Card */}
            <div className="bg-violet-50 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 border border-violet-100 relative overflow-hidden text-left">
              <div className="absolute -right-4 -top-4 opacity-10 text-violet-900 hidden sm:block">
                <Award size={120} />
              </div>
              
              <div className="relative z-10 space-y-4">
                <h3 className="text-violet-900 font-black uppercase text-xs md:text-sm tracking-widest border-b border-violet-200 pb-2">
                  FIDE Official Record
                </h3>
                <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                  <div>
                    <p className="text-[9px] md:text-[10px] font-bold text-violet-400 uppercase tracking-widest">FIDE ID</p>
                    <p className="text-sm md:text-base font-black text-violet-900">25985663</p>
                  </div>
                  <div>
                    <p className="text-[9px] md:text-[10px] font-bold text-violet-400 uppercase tracking-widest">Country</p>
                    <p className="text-sm md:text-base font-black text-violet-900 flex items-center gap-1">
                      <Globe size={14} className="text-orange-500" /> India
                    </p>
                  </div>
                  <div>
                    <p className="text-[9px] md:text-[10px] font-bold text-violet-400 uppercase tracking-widest">FIDE Rating</p>
                    <p className="text-sm md:text-base font-black text-violet-900">2353</p>
                  </div>
                  <div>
                    <p className="text-[9px] md:text-[10px] font-bold text-violet-400 uppercase tracking-widest">Status</p>
                    <p className="text-sm md:text-base font-black text-orange-600 uppercase">Confirmed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievement Text */}
            <div className="space-y-4">
              <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
                This remarkable achievement is a result of his dedication, hard work, and consistent performance in international chess tournaments.
              </p>
              
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 justify-center lg:justify-start">
                 <div className="flex items-center gap-3 text-xs md:text-sm font-bold text-violet-900">
                    <CheckCircle2 className="text-orange-500 shrink-0" size={18} />
                    High Performance Training
                 </div>
                 <div className="flex items-center gap-3 text-xs md:text-sm font-bold text-violet-900">
                    <CheckCircle2 className="text-orange-500 shrink-0" size={18} />
                    International Tournament Success
                 </div>
              </div>
            </div>

            {/* Club Branding */}
            <div className="bg-orange-500 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 text-white shadow-xl shadow-orange-100 text-left">
              <div className="flex items-center gap-3 mb-2">
                <GraduationCap size={24} className="shrink-0" />
                <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest opacity-80">Proudly Trained At</p>
              </div>
              <h4 className="text-lg md:text-xl font-black uppercase leading-tight">
                Amritsar Chess Club
              </h4>
              <p className="text-xs md:text-sm font-bold opacity-90 leading-tight mt-1">
                International School of Chess <br />
                (Bari-Sadri, Chittorgarh)
              </p>
            </div>

            <p className="text-[9px] md:text-[10px] font-black text-violet-300 uppercase tracking-[0.3em] md:tracking-[0.4em]">
              Gens Una Sumus ♟️👏
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}