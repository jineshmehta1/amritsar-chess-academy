"use server"

import { resend } from "@/lib/resend"

interface DemoFormData {
  studentName: string
  studentAge: string
  parentName: string
  phone: string
  email: string
  level: string
  slot: string
  source: string
}

export async function sendDemoRequest(data: DemoFormData) {
  try {
    const { studentName, studentAge, parentName, phone, email, level, slot, source } = data

    const { error } = await resend.emails.send({
      from: "Amritsar Chess Club <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL_TO as string,
      replyTo: email,
      subject: `New Demo Booking: ${studentName} (Age ${studentAge})`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color:#12123D;">New Free Demo Class Request</h2>
          <table style="width:100%; border-collapse: collapse;">
            <tr><td style="padding:8px 0; font-weight:bold; width:160px;">Student Name</td><td>${studentName}</td></tr>
            <tr><td style="padding:8px 0; font-weight:bold;">Student Age</td><td>${studentAge}</td></tr>
            <tr><td style="padding:8px 0; font-weight:bold;">Parent/Guardian</td><td>${parentName}</td></tr>
            <tr><td style="padding:8px 0; font-weight:bold;">WhatsApp</td><td>${phone}</td></tr>
            <tr><td style="padding:8px 0; font-weight:bold;">Email</td><td>${email}</td></tr>
            <tr><td style="padding:8px 0; font-weight:bold;">Chess Level</td><td>${level}</td></tr>
            <tr><td style="padding:8px 0; font-weight:bold;">Preferred Slot</td><td>${slot}</td></tr>
            <tr><td style="padding:8px 0; font-weight:bold;">Heard Via</td><td>${source}</td></tr>
          </table>
        </div>
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (err) {
    console.error("sendDemoRequest error:", err)
    return { success: false, error: "Failed to send email" }
  }
}