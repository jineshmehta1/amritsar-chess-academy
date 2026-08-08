import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const batches = await prisma.batch.findMany({
      include: {
        _count: {
          select: { students: true, puzzles: true },
        },
      },
      orderBy: { name: "asc" },
    });
    return NextResponse.json(batches);
  } catch (error) {
    console.error("GET batches error:", error);
    return NextResponse.json({ error: "Failed to fetch batches" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    if (!name || !name.trim()) {
      return NextResponse.json({ error: "Batch name is required" }, { status: 400 });
    }

    const existing = await prisma.batch.findUnique({
      where: { name: name.trim() },
    });

    if (existing) {
      return NextResponse.json({ error: "Batch name already exists" }, { status: 400 });
    }

    const batch = await prisma.batch.create({
      data: { name: name.trim() },
    });

    return NextResponse.json(batch);
  } catch (error) {
    console.error("POST batch error:", error);
    return NextResponse.json({ error: "Failed to create batch" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Batch ID is required" }, { status: 400 });
    }

    await prisma.batch.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE batch error:", error);
    return NextResponse.json({ error: "Failed to delete batch" }, { status: 500 });
  }
}
