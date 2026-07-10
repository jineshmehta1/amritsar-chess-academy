"use server"

import { resend } from "@/lib/resend"

interface ContactFormData {
  name: string
  email: string
  phone: string
  age?: string
  experience?: string
  program: string
  message: string
}

export async function sendContactEmail(data: ContactFormData) {
  try {
    const { name, email, phone, program, message } = data

    const { error } = await resend.emails.send({
      from: "Amritsar Chess Club <onboarding@resend.dev>", // swap to your verified domain, e.g. "Amritsar Chess Club <no-reply@amritsarchessclub.in>"
      to: process.env.CONTACT_EMAIL_TO as string,
      replyTo: email,
      subject: `New Contact Enquiry from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color:#12123D;">New Website Enquiry</h2>
          <table style="width:100%; border-collapse: collapse;">
            <tr><td style="padding:8px 0; font-weight:bold; width:140px;">Name</td><td>${name}</td></tr>
            <tr><td style="padding:8px 0; font-weight:bold;">Email</td><td>${email}</td></tr>
            <tr><td style="padding:8px 0; font-weight:bold;">WhatsApp</td><td>${phone}</td></tr>
            <tr><td style="padding:8px 0; font-weight:bold;">Program</td><td>${program || "Not specified"}</td></tr>
          </table>
          <p style="margin-top:16px; font-weight:bold;">Message:</p>
          <p style="background:#f8fafc; padding:16px; border-radius:8px;">${message}</p>
        </div>
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (err) {
    console.error("sendContactEmail error:", err)
    return { success: false, error: "Failed to send email" }
  }
}