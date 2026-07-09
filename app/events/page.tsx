import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { eventsData } from "@/lib/data/events";
import { Calendar, MapPin, Clock, Download, ChevronRight, Trophy } from "lucide-react";

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-[#12123D]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[20%] left-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-orange-500/20 to-transparent blur-3xl" />
          <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] rounded-full bg-gradient-to-bl from-blue-500/20 to-transparent blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1 mb-6 md:mb-8 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
            <Trophy className="w-4 h-4 text-orange-500" />
            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-white/90">
              Tournaments & Events
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-6">
            Upcoming <span className="text-[#FF6B00]">Battles.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-sm md:text-lg text-slate-300 font-medium leading-relaxed">
            Join the most prestigious chess tournaments in the region. Test your skills, improve your ELO rating, and claim the championship.
          </p>
        </div>
      </section>

      {/* Events List Section */}
      <section className="py-16 md:py-24 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-8 md:space-y-12">
          {eventsData.map((event) => (
            <div key={event.id} className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden flex flex-col md:flex-row hover:shadow-2xl transition-shadow duration-300">
              {/* Event Details */}
              <div className="p-8 md:p-10 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="inline-block px-3 py-1 text-[10px] font-black tracking-widest text-[#FF6B00] uppercase bg-orange-50 rounded-full border border-orange-100">
                      {event.status}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-[#12123D] tracking-tight mb-4">
                    {event.title}
                  </h3>
                  <p className="text-slate-500 font-medium leading-relaxed mb-6">
                    {event.description}
                  </p>
                  
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center text-sm font-semibold text-slate-600">
                      <Calendar className="w-5 h-5 mr-3 text-orange-500" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-sm font-semibold text-slate-600">
                      <Clock className="w-5 h-5 mr-3 text-orange-500" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-sm font-semibold text-slate-600">
                      <MapPin className="w-5 h-5 mr-3 text-orange-500" />
                      {event.location}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                  <a 
                    href={event.brochureUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 border-2 border-[#12123D] text-[#12123D] hover:bg-[#12123D] hover:text-white rounded-full font-black uppercase tracking-widest text-xs transition-colors"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Brochure
                  </a>
                  <Link 
                    href={`/events/${event.id}/register`}
                    className="inline-flex items-center justify-center px-6 py-3 bg-[#FF6B00] hover:bg-[#e66000] text-white rounded-full font-black uppercase tracking-widest text-xs shadow-lg shadow-orange-500/30 transition-colors"
                  >
                    Register Now
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
              
              {/* Event Price Callout */}
              <div className="bg-[#12123D] md:w-64 p-8 flex flex-col items-center justify-center text-white border-t md:border-t-0 md:border-l border-slate-700">
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Entry Fee</p>
                <p className="text-4xl md:text-5xl font-black text-orange-500">₹{event.entryFee}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
