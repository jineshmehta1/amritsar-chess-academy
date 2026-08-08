import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get("studentId");

    const folders = await prisma.puzzleFolder.findMany({
      include: {
        _count: {
          select: { puzzles: true },
        },
      },
      orderBy: { name: "asc" },
    });

    if (studentId) {
      const foldersWithSolved = await Promise.all(
        folders.map(async (folder) => {
          const solvedCount = await prisma.puzzleAttempt.count({
            where: {
              studentId,
              solved: true,
              puzzle: {
                folderId: folder.id,
              },
            },
          });
          return {
            ...folder,
            solvedCount,
          };
        })
      );
      return NextResponse.json(foldersWithSolved);
    }

    return NextResponse.json(folders);
  } catch (error) {
    console.error("GET folders error:", error);
    return NextResponse.json({ error: "Failed to fetch folders" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    if (!name || !name.trim()) {
      return NextResponse.json({ error: "Folder name is required" }, { status: 400 });
    }

    const folder = await prisma.puzzleFolder.create({
      data: { name: name.trim() },
    });

    return NextResponse.json(folder);
  } catch (error) {
    console.error("POST folder error:", error);
    return NextResponse.json({ error: "Failed to create folder" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Folder ID is required" }, { status: 400 });
    }

    await prisma.puzzleFolder.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE folder error:", error);
    return NextResponse.json({ error: "Failed to delete folder" }, { status: 500 });
  }
}
