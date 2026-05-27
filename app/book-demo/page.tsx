"use client"

import type React from "react"
import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Clock,
  Users,
  Trophy,
  CheckCircle,
  Star,
  Target,
  Heart,
  BookOpen,
  Video,
} from "lucide-react"

import { sendDemoBookingEmail } from "@/app/actions/sendEmail"

export default function BookDemoPage() {
  const [formData, setFormData] = useState({
    studentName: "",
    parentName: "",
    email: "",
    phone: "",
    age: "",
    experience: "",
  })

  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<string | null>(null)

  const validateForm = (): boolean => {
    return !!(
      formData.studentName &&
      formData.parentName &&
      formData.email &&
      formData.phone &&
      formData.age &&
      formData.experience
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setSubmitStatus(null)

    if (!validateForm()) {
      setError("Please fill out all required fields.")
      setIsSubmitting(false)
      return
    }

    // Call Resend Server Action
    const result = await sendDemoBookingEmail(formData)

    if (result.success) {
      setSubmitStatus("success")
      setFormData({
        studentName: "",
        parentName: "",
        email: "",
        phone: "",
        age: "",
        experience: "",
      })
    } else {
      setError("Something went wrong. Please try again or call us.")
      setSubmitStatus("error")
    }

    setIsSubmitting(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const benefits = [
    {
      icon: Trophy,
      title: "Meet Our Top Coaches",
      description: "Personal introduction from our founder and master instructor",
      gradient: "from-purple-500 to-blue-500",
    },
    {
      icon: Target,
      title: "Skill Assessment",
      description: "Comprehensive evaluation of current chess knowledge and potential",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: BookOpen,
      title: "Customized Learning Plan",
      description: "Personalized roadmap designed specifically for your chess journey",
      gradient: "from-cyan-500 to-green-500",
    },
    {
      icon: Heart,
      title: "Interactive Experience",
      description: "Hands-on chess puzzles and mini-lessons to experience our methodology",
      gradient: "from-green-500 to-yellow-500",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-20 bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6">
            Book Your{" "}
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              FREE Demo Class
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Experience Our revolutionary teaching methodology firsthand. Get personalized guidance, skill
            assessment, and a customized learning plan - absolutely free!
          </p>

          {/* Demo Benefits */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-12">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="bg-white/80 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${benefit.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                  >
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Value Proposition */}
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
              <Star className="w-8 h-8 fill-white" />
              <span className="text-xl sm:text-2xl font-black">100% FREE • No Commitment</span>
            </div>
            <p className="text-base sm:text-xl">
              Worth ₹2,000 - Get personalized chess assessment, meet our founder, and receive a custom learning plan
              tailored just for you!
            </p>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h2 className="text-3xl sm:text-4xl font-black text-gray-800 mb-4">
                  Book Your Demo
                </h2>
              </div>

              <Card className="shadow-2xl border-0 bg-gradient-to-br from-white to-purple-50/30">
                <CardContent className="p-6 sm:p-10">
                  {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl">
                      {error}
                    </div>
                  )}
                  {submitStatus === "success" && (
                    <div className="mb-6 p-4 bg-green-50 text-green-600 rounded-xl">
                      Form submitted successfully!
                    </div>
                  )}
                  {submitStatus === "error" && (
                    <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl">
                      Failed to submit. Please try again.
                    </div>
                  )}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-6">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Enter Your Details</h3>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="studentName" className="block text-sm font-bold text-gray-800 mb-2">
                            Student Name *
                          </label>
                          <Input
                            id="studentName"
                            name="studentName"
                            type="text"
                            required
                            value={formData.studentName}
                            onChange={handleChange}
                            className="border-2 border-gray-200 focus:border-purple-600 focus:ring-purple-600 rounded-xl py-3 px-4 text-base"
                            placeholder="Enter student's name"
                          />
                        </div>
                        <div>
                          <label htmlFor="parentName" className="block text-sm font-bold text-gray-800 mb-2">
                            Parent/Guardian Name *
                          </label>
                          <Input
                            id="parentName"
                            name="parentName"
                            type="text"
                            required
                            value={formData.parentName}
                            onChange={handleChange}
                            className="border-2 border-gray-200 focus:border-purple-600 focus:ring-purple-600 rounded-xl py-3 px-4 text-base"
                            placeholder="Enter parent's name"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="email" className="block text-sm font-bold text-gray-800 mb-2">
                            Email Address *
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="border-2 border-gray-200 focus:border-purple-600 focus:ring-purple-600 rounded-xl py-3 px-4 text-base"
                            placeholder="Enter email address"
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-bold text-gray-800 mb-2">
                            Phone Number *
                          </label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            className="border-2 border-gray-200 focus:border-purple-600 focus:ring-purple-600 rounded-xl py-3 px-4 text-base"
                            placeholder="Enter phone number"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="age" className="block text-sm font-bold text-gray-800 mb-2">
                            Student Age *
                          </label>
                          <Input
                            id="age"
                            name="age"
                            type="number"
                            required
                            value={formData.age}
                            onChange={handleChange}
                            className="border-2 border-gray-200 focus:border-purple-600 focus:ring-purple-600 rounded-xl py-3 px-4 text-base"
                            placeholder="Enter age"
                          />
                        </div>
                        <div>
                          <label htmlFor="experience" className="block text-sm font-bold text-gray-800 mb-2">
                            Chess Experience *
                          </label>
                          <select
                            id="experience"
                            name="experience"
                            required
                            value={formData.experience}
                            onChange={handleChange}
                            className="w-full border-2 border-gray-200 focus:border-purple-600 focus:ring-purple-600 rounded-xl py-3 px-4 text-base bg-white"
                          >
                            <option value="">Select experience level</option>
                            <option value="complete-beginner">Complete Beginner</option>
                            <option value="some-knowledge">Some Knowledge</option>
                            <option value="intermediate">Intermediate Player</option>
                            <option value="advanced">Advanced Player</option>
                            <option value="fide-rated">FIDE Rated Player</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-6 py-3 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                      >
                        {isSubmitting ? (
                          "Submitting..."
                        ) : (
                          <>
                            <Calendar className="w-5 h-5 mr-2" />
                            Book My FREE Demo
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* What to Expect */}
              <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-purple-50/30">
                <CardContent className="p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">What to Expect</h3>
                  <div className="space-y-4">
                    {[
                      { icon: Users, text: "Personal meeting with our top coaches" },
                      { icon: Target, text: "Comprehensive skill assessment" },
                      { icon: BookOpen, text: "Sample lesson with our methodology" },
                      { icon: Trophy, text: "Customized learning roadmap" },
                      { icon: Clock, text: "60-minute interactive session" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-gray-700">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Testimonial */}
              <Card className="shadow-xl border-0 bg-gradient-to-br from-orange-50 to-red-50">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-4">
                    "The demo class was incredible! Our top coaches immediately identified my daughter's strengths and gave
                    us a clear path forward. She's been excited about chess ever since!"
                  </p>
                  <div className="flex items-center space-x-3">
                    <img
                      src="/parent-1.jpg"
                      alt="Parent"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-bold text-gray-800">Mrs Reena paliwal</p>
                      <p className="text-sm text-gray-600">Parent of Himadri </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Preview */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-purple-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6">
              Join Our{" "}
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Success Stories
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              See what students achieve after their demo class with our top coaches
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Master Madvendra Pratap Sharma", age: 10, achievement: "Gold medal in Asian Youth Chess Championship 2022 (U-10) in Indonesia", image: "/student-1.jpg", quote: "The demo class changed everything for me!" },
              { name: "Suhani Munet", age: 17, achievement: "SGFI National Bronze Medalist (2023-24) and proudly representing India at the Chess Olympiad (2022)", image: "/student-2.jpg", quote: "Best decision we ever made!" },
            ].map((story, index) => (
              <Card
                key={index}
                className="bg-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0"
              >
                <CardContent className="p-8 text-center">
                  <img
                    src={story.image || "/placeholder.svg"}
                    alt={story.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-purple-200"
                  />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{story.name}</h3>
                  <p className="text-gray-600 mb-4">{story.achievement}</p>
                  <p className="text-gray-700 italic">"{story.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/chess-pattern.svg')] opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-8">
            Don't Wait -{" "}
            <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Book Today!
            </span>
          </h2>
          <p className="text-lg sm:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Limited demo slots available each week. Secure your spot and start your chess transformation journey with
            Our proven methodology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <Button
              onClick={() => setFormData({ ...formData })}
              className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-5 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
            >
              <Calendar className="w-6 h-6 mr-2" />
              Book FREE Demo Now
            </Button>
            <Button
              variant="outline"
              className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-5 rounded-full bg-transparent transition-all duration-300"
            >
              Call: +91-9988775581
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}