"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Trophy, Star, Calendar, CheckCircle } from "lucide-react"
import { useBookDemo } from "@/components/BookDemoProvider"

export default function ClassesPage() {
  const { openBookDemoModal } = useBookDemo()
  const [activeTab, setActiveTab] = useState("all")

  const classes = [
    {
      id: 1,
      title: "Beginner Foundations",
      level: "beginner",
      duration: "8 weeks",
      students: "6-8",
      price: "$199",
      rating: 4.9,
      image: "/placeholder.svg?height=300&width=400&text=Beginner+Class",
      features: [
        "Learn basic piece movements",
        "Understanding the board",
        "Simple tactics and strategies",
        "Fun games and puzzles",
        "Certificate upon completion",
      ],
      description:
        "Perfect for complete beginners aged 6 and up. Learn the fundamentals in a fun, supportive environment.",
    },
    {
      id: 2,
      title: "Intermediate Strategy",
      level: "intermediate",
      duration: "10 weeks",
      students: "4-6",
      price: "$299",
      rating: 4.8,
      image: "/placeholder.svg?height=300&width=400&text=Intermediate+Class",
      features: [
        "Advanced tactics training",
        "Opening principles",
        "Endgame fundamentals",
        "Tournament preparation",
        "Rating improvement focus",
      ],
      description: "For players with basic knowledge ready to take their game to the next level.",
    },
    {
      id: 3,
      title: "Advanced Mastery",
      level: "advanced",
      duration: "12 weeks",
      students: "2-4",
      price: "$499",
      rating: 5.0,
      image: "/placeholder.svg?height=300&width=400&text=Advanced+Class",
      features: [
        "Complex strategic concepts",
        "Deep opening analysis",
        "Advanced endgame theory",
        "Psychological aspects",
        "Master-level insights",
      ],
      description: "Elite training for serious players aiming for competitive excellence.",
    },
    {
      id: 4,
      title: "Tournament Preparation",
      level: "intermediate",
      duration: "6 weeks",
      students: "4-6",
      price: "$249",
      rating: 4.9,
      image: "/placeholder.svg?height=300&width=400&text=Tournament+Prep",
      features: [
        "Time management skills",
        "Pressure handling techniques",
        "Opening repertoire building",
        "Practical game analysis",
        "Mental preparation",
      ],
      description: "Specialized program to prepare students for competitive tournament play.",
    },
    {
      id: 5,
      title: "Private Coaching",
      level: "all",
      duration: "Flexible",
      students: "1-on-1",
      price: "$99/hr",
      rating: 5.0,
      image: "/placeholder.svg?height=300&width=400&text=Private+Coaching",
      features: [
        "Personalized curriculum",
        "Flexible scheduling",
        "Rapid improvement",
        "Individual attention",
        "Customized pace",
      ],
      description: "One-on-one sessions tailored to your specific needs and goals.",
    },
    {
      id: 6,
      title: "Family Chess Program",
      level: "beginner",
      duration: "6 weeks",
      students: "Families",
      price: "$149",
      rating: 4.8,
      image: "/placeholder.svg?height=300&width=400&text=Family+Program",
      features: [
        "Learn together as a family",
        "Age-appropriate instruction",
        "Family tournament",
        "Bonding through chess",
        "Take-home materials",
      ],
      description: "A wonderful way for families to learn and bond through the game of chess.",
    },
  ]

  const filteredClasses =
    activeTab === "all" ? classes : classes.filter((cls) => cls.level === activeTab || cls.level === "all")

  const tabs = [
    { id: "all", label: "All Classes" },
    { id: "beginner", label: "Beginner" },
    { id: "intermediate", label: "Intermediate" },
    { id: "advanced", label: "Advanced" },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-20 bg-gradient-to-br from-white to-[#FFF7EC]">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#C9A227] mb-6">Our Chess Programs</h1>
          <p className="text-lg sm:text-xl text-[#2B2B2B] max-w-3xl mx-auto mb-8">
            From complete beginners to advanced players, we have the perfect program to elevate your chess journey
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                variant={activeTab === tab.id ? "default" : "outline"}
                className={`px-4 py-2 sm:px-6 sm:py-3 rounded-full font-semibold transition-all duration-300 text-sm sm:text-base ${
                  activeTab === tab.id
                    ? "bg-[#C9A227] text-white hover:bg-[#B8911F]"
                    : "border-[#C9A227] text-[#C9A227] hover:bg-[#C9A227] hover:text-white"
                }`}
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Classes Grid */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredClasses.map((cls) => (
              <Card
                key={cls.id}
                className="bg-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 overflow-hidden flex flex-col"
              >
                <div className="relative">
                  <img src={cls.image || "/placeholder.svg"} alt={cls.title} className="w-full h-48 object-cover" />
                  <div className="absolute top-4 left-4">
                    <Badge
                      className={`${
                        cls.level === "beginner"
                          ? "bg-green-500"
                          : cls.level === "intermediate"
                            ? "bg-blue-500"
                            : cls.level === "advanced"
                              ? "bg-purple-500"
                              : "bg-[#C9A227]"
                      } text-white`}
                    >
                      {cls.level === "all" ? "All Levels" : cls.level.charAt(0).toUpperCase() + cls.level.slice(1)}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-[#C9A227] text-[#C9A227]" />
                      <span className="text-sm font-semibold">{cls.rating}</span>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6 flex-grow flex flex-col">
                  <h3 className="text-2xl font-bold text-[#2B2B2B] mb-3">{cls.title}</h3>
                  <p className="text-[#2B2B2B] opacity-80 mb-4 flex-grow">{cls.description}</p>

                  <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                    <div>
                      <Clock className="w-5 h-5 text-[#C9A227] mx-auto mb-1" />
                      <div className="text-sm font-semibold text-[#2B2B2B]">{cls.duration}</div>
                    </div>
                    <div>
                      <Users className="w-5 h-5 text-[#C9A227] mx-auto mb-1" />
                      <div className="text-sm font-semibold text-[#2B2B2B]">{cls.students}</div>
                    </div>
                    <div>
                      <Trophy className="w-5 h-5 text-[#C9A227] mx-auto mb-1" />
                      <div className="text-sm font-semibold text-[#2B2B2B]">{cls.price}</div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    {cls.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-[#C9A227] flex-shrink-0" />
                        <span className="text-sm text-[#2B2B2B]">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button onClick={openBookDemoModal} className="w-full mt-auto bg-[#FFB347] hover:bg-[#E89A24] text-white font-semibold py-3 rounded-lg">
                    <Calendar className="w-4 h-4 mr-2" />
                    Enroll Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Classes */}
      <section className="py-16 md:py-20 bg-[#FFF7EC]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#C9A227] mb-6">Why Our Classes Work</h2>
            <p className="text-lg sm:text-xl text-[#2B2B2B] max-w-3xl mx-auto">
              Our proven methodology ensures every student achieves their chess goals
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Users, title: "Small Class Sizes", description: "Maximum 8 students per class ensures personalized attention" },
              { icon: Trophy, title: "Proven Results", description: "95% of students improve their rating within 3 months" },
              { icon: Star, title: "Expert Instruction", description: "Learn directly from a Grandmaster with 20+ years experience" },
              { icon: CheckCircle, title: "Structured Curriculum", description: "Progressive learning path designed for optimal skill development" },
            ].map((benefit, index) => (
              <Card key={index} className="bg-white shadow-lg border-0 text-center p-6">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-[#C9A227] rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2B2B2B] mb-3">{benefit.title}</h3>
                  <p className="text-[#2B2B2B] opacity-80">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}