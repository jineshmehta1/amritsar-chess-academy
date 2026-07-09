import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Generate a unique registration ID
    const registrationId = `ACC-${Math.floor(1000 + Math.random() * 9000)}`;
    
    // Add the generated ID to the data payload
    const payload = {
      registrationId,
      timestamp: new Date().toISOString(),
      ...data
    };

    console.log("New Registration Received:", payload);

    // This is where we send the data to the Google Apps Script Webhook.
    // The user needs to set GOOGLE_SCRIPT_WEBHOOK_URL in their .env file.
    const webhookUrl = process.env.GOOGLE_SCRIPT_WEBHOOK_URL;
    
    if (webhookUrl) {
      try {
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
          redirect: "follow",
        });
        
        const responseText = await response.text();
        console.log("Google Webhook Response Status:", response.status);
        console.log("Google Webhook Response Text:", responseText);
        
        if (!response.ok) {
          console.error("Webhook returned non-OK status");
        } else {
          console.log("Successfully sent data to Google Sheets Webhook.");
        }
      } catch (webhookError) {
        console.error("Failed to send data to webhook:", webhookError);
        // We might not want to fail the whole request if just the webhook fails, 
        // but it depends on strictness. Let's proceed to return success to user.
      }
    } else {
      console.warn("GOOGLE_SCRIPT_WEBHOOK_URL is not set. Data was not sent to Google Sheets.");
    }

    // Return the generated registration ID to the client
    return NextResponse.json({ success: true, registrationId });

  } catch (error) {
    console.error("Registration API Error:", error);
    return NextResponse.json(
      { error: "Failed to process registration" },
      { status: 500 }
    );
  }
}
