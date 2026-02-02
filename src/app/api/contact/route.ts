import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Body = {
  fullName?: string;
  email?: string;
  subject?: string;
  message?: string;
};

// Maximum message length for security
const MAX_MESSAGE_LENGTH = 5000;
const MAX_SUBJECT_LENGTH = 200;
const MAX_NAME_LENGTH = 100;

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;
    const { fullName, email, subject, message } = body;

    // Validate required fields
    if (!fullName || !email || !message) {
      return NextResponse.json(
        { error: "Full name, email, and message are required" },
        { status: 400 }
      );
    }

    // Trim and sanitize inputs
    const trimmedFullName = fullName.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedSubject = subject?.trim() || "";
    const trimmedMessage = message.trim();

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(trimmedEmail)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Validate field lengths
    if (trimmedFullName.length === 0 || trimmedFullName.length > MAX_NAME_LENGTH) {
      return NextResponse.json(
        { error: `Full name must be between 1 and ${MAX_NAME_LENGTH} characters` },
        { status: 400 }
      );
    }

    if (trimmedSubject.length > MAX_SUBJECT_LENGTH) {
      return NextResponse.json(
        { error: `Subject must not exceed ${MAX_SUBJECT_LENGTH} characters` },
        { status: 400 }
      );
    }

    if (trimmedMessage.length === 0 || trimmedMessage.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { error: `Message must be between 1 and ${MAX_MESSAGE_LENGTH} characters` },
        { status: 400 }
      );
    }

    // Save to database
    const contactMessage = await prisma.contactMessage.create({
      data: {
        fullName: trimmedFullName,
        email: trimmedEmail,
        subject: trimmedSubject || null,
        message: trimmedMessage,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been sent successfully. We'll get back to you soon!",
        id: contactMessage.id,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
