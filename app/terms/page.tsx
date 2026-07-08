"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 py-32">
        <h1 className="text-4xl font-black text-[#12123D] mb-6">Terms of Service</h1>
        <p className="text-slate-600 leading-relaxed mb-6">
          By using the Amritsar Chess Club website and enrolling in our programs, you agree to
          follow club policies, class schedules, and payment terms communicated at registration.
        </p>
        <p className="text-slate-600 leading-relaxed mb-8">
          Demo sessions and classes are subject to availability. The club reserves the right to
          update schedules, fees, and program content with prior notice to enrolled students.
        </p>
        <Link href="/contact" className="text-[#FF6B00] font-bold hover:underline">
          Contact Us
        </Link>
      </main>
      <Footer />
    </div>
  )
}
