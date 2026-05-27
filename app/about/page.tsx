"use client"

import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Trophy, Award, Users, Target, Calendar, Star, Heart, BookOpen, Lightbulb, Eye } from "lucide-react"
import { Footer } from "@/components/footer"
import AboutHero from "@/components/aboutBanner"
import AboutUsSection from "@/components/story"
import MissionVision from "@/components/vision"
import TeachingMethodology from "@/components/program"
import TestimonialSection from "@/components/review"
import AboutCTA from "@/components/aboutcta"
import FoundersSection from "@/components/founder"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      <AboutHero/>
      <AboutUsSection/>
      <FoundersSection/>
      <MissionVision/>
      <TeachingMethodology/>
      <TestimonialSection/>
      <AboutCTA/>

     


     
      <Footer/>
    </div>
  )
}