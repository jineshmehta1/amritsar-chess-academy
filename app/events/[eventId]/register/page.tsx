"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getEventById } from "@/lib/data/events";
import { ArrowLeft, Send } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export default function RegisterPage({ params }: { params: { eventId: string } }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // MOCK: Since this is a client component and we aren't fetching the event server-side,
  // we use our local mock data function. In a real app, you might fetch this via API.
  const event = getEventById(params.eventId);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Event not found</h1>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    // Add event info
    data.eventId = event.id;
    data.eventTitle = event.title;
    data.entryFee = event.entryFee.toString();

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const result = await response.json();
      
      // Redirect to success page with the registration ID
      router.push(`/events/${event.id}/success?regId=${result.registrationId}`);
    } catch (error) {
      toast({
        title: "Registration Error",
        description: "There was a problem submitting your registration. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/events" 
            className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-orange-500 mb-8 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Events
          </Link>

          <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-slate-100 p-8 md:p-12">
            <div className="mb-10 border-b border-slate-100 pb-8">
              <h1 className="text-3xl md:text-4xl font-black text-[#12123D] tracking-tight mb-2">
                Tournament Registration
              </h1>
              <p className="text-lg font-bold text-[#FF6B00]">{event.title}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-12">
              
              {/* 1. Player Details */}
              <section>
                <h2 className="text-xl font-black text-[#12123D] uppercase tracking-widest mb-6 flex items-center">
                  <span className="bg-orange-100 text-[#FF6B00] w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">1</span>
                  Player Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Full Name *</label>
                    <input required type="text" name="fullName" className="w-full bg-slate-50 border-none h-12 rounded-xl px-4 font-bold focus:ring-2 focus:ring-orange-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Date of Birth *</label>
                    <input required type="date" name="dob" className="w-full bg-slate-50 border-none h-12 rounded-xl px-4 font-bold focus:ring-2 focus:ring-orange-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Gender *</label>
                    <select required name="gender" className="w-full bg-slate-50 border-none h-12 rounded-xl px-4 font-bold focus:ring-2 focus:ring-orange-500">
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Category *</label>
                    <select required name="category" className="w-full bg-slate-50 border-none h-12 rounded-xl px-4 font-bold focus:ring-2 focus:ring-orange-500">
                      <option value="">Select Category</option>
                      <option value="U-7">Under 7</option>
                      <option value="U-9">Under 9</option>
                      <option value="U-11">Under 11</option>
                      <option value="U-13">Under 13</option>
                      <option value="U-15">Under 15</option>
                      <option value="Open">Open</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">School / Club</label>
                    <input type="text" name="schoolClub" className="w-full bg-slate-50 border-none h-12 rounded-xl px-4 font-bold focus:ring-2 focus:ring-orange-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">City & State</label>
                    <input type="text" name="cityState" className="w-full bg-slate-50 border-none h-12 rounded-xl px-4 font-bold focus:ring-2 focus:ring-orange-500" />
                  </div>
                </div>
              </section>

              {/* 2. Chess Information */}
              <section>
                <h2 className="text-xl font-black text-[#12123D] uppercase tracking-widest mb-6 flex items-center">
                  <span className="bg-orange-100 text-[#FF6B00] w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">2</span>
                  Chess Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">FIDE ID (Optional)</label>
                    <input type="text" name="fideId" className="w-full bg-slate-50 border-none h-12 rounded-xl px-4 font-bold focus:ring-2 focus:ring-orange-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">AICF ID (Optional)</label>
                    <input type="text" name="aicfId" className="w-full bg-slate-50 border-none h-12 rounded-xl px-4 font-bold focus:ring-2 focus:ring-orange-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">FIDE Rating (Optional)</label>
                    <input type="number" name="fideRating" className="w-full bg-slate-50 border-none h-12 rounded-xl px-4 font-bold focus:ring-2 focus:ring-orange-500" />
                  </div>
                </div>
              </section>

              {/* 3. Contact Details */}
              <section>
                <h2 className="text-xl font-black text-[#12123D] uppercase tracking-widest mb-6 flex items-center">
                  <span className="bg-orange-100 text-[#FF6B00] w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">3</span>
                  Contact Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Parent/Guardian Name (for minors)</label>
                    <input type="text" name="parentName" className="w-full bg-slate-50 border-none h-12 rounded-xl px-4 font-bold focus:ring-2 focus:ring-orange-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Mobile Number *</label>
                    <input required type="tel" name="mobileNumber" className="w-full bg-slate-50 border-none h-12 rounded-xl px-4 font-bold focus:ring-2 focus:ring-orange-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">WhatsApp Number *</label>
                    <input required type="tel" name="whatsappNumber" className="w-full bg-slate-50 border-none h-12 rounded-xl px-4 font-bold focus:ring-2 focus:ring-orange-500" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Email Address</label>
                    <input type="email" name="email" className="w-full bg-slate-50 border-none h-12 rounded-xl px-4 font-bold focus:ring-2 focus:ring-orange-500" />
                  </div>
                </div>
              </section>

              {/* 4. Payment */}
              <section>
                <h2 className="text-xl font-black text-[#12123D] uppercase tracking-widest mb-6 flex items-center">
                  <span className="bg-orange-100 text-[#FF6B00] w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">4</span>
                  Payment Details
                </h2>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-6 flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-1 text-center md:text-left">
                    <p className="text-sm text-slate-500 font-bold mb-2 uppercase tracking-widest">Entry Fee</p>
                    <p className="text-4xl font-black text-[#12123D]">₹{event.entryFee}</p>
                    <p className="text-xs text-slate-400 mt-2">Please scan the QR code to transfer the amount to the academy UPI / Bank Account before submitting.</p>
                  </div>
                  <div className="flex-shrink-0 bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
                    <img src="/qr.jpeg" alt="Academy Payment QR" className="w-32 h-32 md:w-40 md:h-40 object-contain rounded-xl" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Payment Method *</label>
                    <select required name="paymentMethod" className="w-full bg-slate-50 border-none h-12 rounded-xl px-4 font-bold focus:ring-2 focus:ring-orange-500">
                      <option value="">Select Method</option>
                      <option value="UPI">UPI</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Cash">Cash (At Academy)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">UTR / Transaction ID *</label>
                    <input required type="text" name="transactionId" placeholder="e.g. 123456789012" className="w-full bg-slate-50 border-none h-12 rounded-xl px-4 font-bold focus:ring-2 focus:ring-orange-500" />
                  </div>
                </div>
              </section>

              {/* 5. Consent */}
              <section>
                <h2 className="text-xl font-black text-[#12123D] uppercase tracking-widest mb-6 flex items-center">
                  <span className="bg-orange-100 text-[#FF6B00] w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">5</span>
                  Consent
                </h2>
                <div className="space-y-4 bg-slate-50 p-6 rounded-2xl">
                  <label className="flex items-start cursor-pointer">
                    <input required type="checkbox" name="consentRules" className="mt-1 w-5 h-5 rounded border-slate-300 text-orange-500 focus:ring-orange-500" />
                    <span className="ml-3 text-sm font-bold text-slate-700">I agree to the tournament rules and regulations. *</span>
                  </label>
                  <label className="flex items-start cursor-pointer">
                    <input required type="checkbox" name="consentMedia" className="mt-1 w-5 h-5 rounded border-slate-300 text-orange-500 focus:ring-orange-500" />
                    <span className="ml-3 text-sm font-bold text-slate-700">I agree to photography/videography during the event for promotional use. *</span>
                  </label>
                </div>
              </section>

              {/* 6. Submit */}
              <div className="pt-8 border-t border-slate-100">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto inline-flex items-center justify-center px-10 py-5 bg-[#FF6B00] hover:bg-[#e66000] disabled:bg-slate-400 text-white rounded-full font-black uppercase tracking-widest text-sm shadow-lg shadow-orange-500/30 transition-all hover:-translate-y-1"
                >
                  {isSubmitting ? "Submitting..." : "Submit Registration"}
                  {!isSubmitting && <Send className="w-5 h-5 ml-3" />}
                </button>
              </div>

            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
