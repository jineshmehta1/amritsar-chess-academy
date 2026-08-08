import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/password";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const leaderboard = searchParams.get("leaderboard");

    if (id) {
      const student = await prisma.user.findUnique({
        where: { id },
        include: {
          batch: true,
          attempts: {
            where: { solved: true }
          }
        }
      });
      return NextResponse.json(student);
    }

    if (leaderboard === "true") {
      const students = await prisma.user.findMany({
        where: { role: "STUDENT" },
        include: {
          batch: true,
          attempts: {
            where: { solved: true }
          }
        },
        orderBy: { rating: "desc" },
      });
      return NextResponse.json(students);
    }

    const students = await prisma.user.findMany({
      where: { role: "STUDENT" },
      include: {
        batch: true,
      },
      orderBy: { name: "asc" },
    });
    return NextResponse.json(students);
  } catch (error) {
    console.error("GET students error:", error);
    return NextResponse.json({ error: "Failed to fetch students" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { username, password, name, parentName, dob, email, phone, rating, batchId } = await request.json();

    if (!username || !password || !name) {
      return NextResponse.json({ error: "Username, password, and name are required" }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({
      where: { username: username.trim().toLowerCase() },
    });

    if (existing) {
      return NextResponse.json({ error: "Username already exists" }, { status: 400 });
    }

    const student = await prisma.user.create({
      data: {
        username: username.trim().toLowerCase(),
        password: hashPassword(password),
        name: name.trim(),
        role: "STUDENT",
        parentName: parentName || null,
        dob: dob || null,
        email: email || null,
        phone: phone || null,
        rating: rating ? parseInt(rating) : 0,
        batchId: batchId || null,
      },
      include: {
        batch: true,
      },
    });

    return NextResponse.json(student);
  } catch (error) {
    console.error("POST student error:", error);
    return NextResponse.json({ error: "Failed to create student" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Student ID is required" }, { status: 400 });
    }

    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE student error:", error);
    return NextResponse.json({ error: "Failed to delete student" }, { status: 500 });
  }
}
