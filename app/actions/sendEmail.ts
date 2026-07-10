"use server"

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// 1. Action for Contact Page
export async function sendContactEmail(formData: any) {
  try {
    const { name, email, phone, age, experience, program, message } = formData;

    const { data, error } = await resend.emails.send({
      from: "Amritsar Chess Club <onboarding@resend.dev>",
      to: ["info@amritsarchessclub.in"],
      subject: `New Contact Inquiry: ${name}`,
      replyTo: email,
      html: `
        <h1>New Contact Inquiry</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Age:</strong> ${age}</p>
        <p><strong>Experience:</strong> ${experience}</p>
        <p><strong>Program:</strong> ${program}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    if (error) return { success: false, error };
    return { success: true };
  } catch (err) {
    return { success: false, error: err };
  }
}

// 2. Action for Book Demo Page
export async function sendDemoBookingEmail(formData: any) {
  try {
    const { studentName, parentName, email, phone, age, experience } = formData;

    const { data, error } = await resend.emails.send({
      from: "Amritsar Chess Club <onboarding@resend.dev>",
      to: ["info@amritsarchessclub.in"],
      subject: `FREE DEMO BOOKED: ${studentName}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 2px solid #f97316;">
          <h1 style="color: #f97316;">New Demo Class Booking</h1>
          <p><strong>Student Name:</strong> ${studentName}</p>
          <p><strong>Parent Name:</strong> ${parentName}</p>
          <p><strong>Age:</strong> ${age}</p>
          <p><strong>Experience:</strong> ${experience}</p>
          <hr />
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>
        </div>
      `,
    });

    if (error) return { success: false, error };
    return { success: true };
  } catch (err) {
    return { success: false, error: err };
  }
}