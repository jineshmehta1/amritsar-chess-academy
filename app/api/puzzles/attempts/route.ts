import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { studentId, puzzleId, solved } = await request.json();

    if (!studentId || !puzzleId) {
      return NextResponse.json({ error: "Student ID and Puzzle ID are required" }, { status: 400 });
    }

    const attempt = await prisma.puzzleAttempt.upsert({
      where: {
        studentId_puzzleId: {
          studentId,
          puzzleId,
        },
      },
      update: {
        solved,
      },
      create: {
        studentId,
        puzzleId,
        solved,
      },
    });

    return NextResponse.json(attempt);
  } catch (error) {
    console.error("POST attempt error:", error);
    return NextResponse.json({ error: "Failed to save puzzle attempt" }, { status: 500 });
  }
}
