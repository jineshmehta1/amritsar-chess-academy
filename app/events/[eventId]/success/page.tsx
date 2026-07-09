"use client"

import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CheckCircle2, MessageCircle, MapPin, Download } from "lucide-react";
import { getEventById } from "@/lib/data/events";
import Link from "next/link";

export default function SuccessPage({ params }: { params: { eventId: string } }) {
  const searchParams = useSearchParams();
  const regId = searchParams.get("regId") || "PENDING";
  const event = getEventById(params.eventId);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919592004076"; // From user's config

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-2xl w-full text-center">
          <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-[#12123D] tracking-tight mb-4">
            Registration Successful!
          </h1>
          
          <p className="text-lg text-slate-500 font-medium mb-8">
            We'll confirm your registration for <strong className="text-[#12123D]">{event?.title || "the event"}</strong> within 24 hours after verifying your payment.
          </p>

          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Registration ID</p>
            <p className="text-3xl font-black text-[#FF6B00] tracking-wider">{regId}</p>
            <p className="text-sm text-slate-500 mt-4">Please save this ID for future reference.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <a 
              href={`https://wa.me/${whatsappNumber}?text=Hi, I have registered for the tournament. My Registration ID is ${regId}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-6 bg-white border border-slate-100 rounded-2xl hover:border-green-500 hover:shadow-lg transition-all group"
            >
              <MessageCircle className="w-8 h-8 text-green-500 mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#12123D]">WhatsApp Us</span>
            </a>

            <a 
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-6 bg-white border border-slate-100 rounded-2xl hover:border-blue-500 hover:shadow-lg transition-all group"
            >
              <MapPin className="w-8 h-8 text-blue-500 mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#12123D]">Google Maps</span>
            </a>

            {event?.brochureUrl && (
              <a 
                href={event.brochureUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-6 bg-white border border-slate-100 rounded-2xl hover:border-orange-500 hover:shadow-lg transition-all sm:col-span-2 md:col-span-1 group"
              >
                <Download className="w-8 h-8 text-orange-500 mb-3 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#12123D]">Brochure</span>
              </a>
            )}
          </div>

          <div className="mt-12">
            <Link 
              href="/events" 
              className="text-sm font-bold text-slate-500 hover:text-[#FF6B00] transition-colors"
            >
              &larr; Back to Events
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
