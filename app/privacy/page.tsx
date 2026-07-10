"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 py-32">
        <h1 className="text-4xl font-black text-[#12123D] mb-6">Privacy Policy</h1>
        <p className="text-slate-600 leading-relaxed mb-6">
          Amritsar Chess Club respects your privacy. Information you share through demo booking,
          contact forms, or enrollment inquiries is used only to respond to your request and
          provide chess coaching services.
        </p>
        <p className="text-slate-600 leading-relaxed mb-8">
          We do not sell personal data. For questions about your information, contact us at{" "}
          <a href="mailto:info@amritsarchessclub.in" className="text-[#FF6B00] font-bold">
            info@amritsarchessclub.in
          </a>.
        </p>
        <Link href="/contact" className="text-[#FF6B00] font-bold hover:underline">
          Contact Us
        </Link>
      </main>
      <Footer />
    </div>
  )
}
