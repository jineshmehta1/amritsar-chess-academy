import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const folderId = searchParams.get("folderId");
    const studentId = searchParams.get("studentId");
    const batchId = searchParams.get("batchId");

    const whereClause: any = {};
    if (folderId) {
      whereClause.folderId = folderId;
    }

    if (batchId) {
      whereClause.OR = [
        { assignedBatchId: batchId },
        { assignedBatchId: null }
      ];
    }

    const puzzles = await prisma.puzzle.findMany({
      where: whereClause,
      include: {
        assignedBatch: true,
        attempts: studentId ? { where: { studentId } } : false,
      },
      orderBy: { createdAt: "desc" },
    });

    // Map to client schema (assignedBatch as a string for compatibility)
    const formattedPuzzles = puzzles.map((p) => ({
      ...p,
      assignedBatch: p.assignedBatch ? p.assignedBatch.name : "",
      solved: p.attempts && p.attempts.length > 0 ? p.attempts[0].solved : false,
    }));

    return NextResponse.json(formattedPuzzles);
  } catch (error) {
    console.error("GET puzzles error:", error);
    return NextResponse.json({ error: "Failed to fetch puzzles" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Check if it's a batch import (Array)
    if (Array.isArray(body)) {
      const createdPuzzles = [];
      for (const item of body) {
        const {
          title,
          pgn,
          fen,
          level,
          assignedBatchId,
          solutionHint,
          description,
          folderId,
          data,
        } = item;

        if (!title || !pgn || !level || !folderId) {
          continue; // Skip invalid entries in batch
        }

        const puzzle = await prisma.puzzle.create({
          data: {
            title,
            pgn,
            fen: fen || null,
            level,
            assignedBatchId: assignedBatchId || null,
            solutionHint: solutionHint || null,
            description: description || null,
            folderId,
          },
        });
        createdPuzzles.push(puzzle);
      }
      return NextResponse.json({ success: true, count: createdPuzzles.length });
    }

    // Single puzzle creation
    const {
      title,
      pgn,
      fen,
      level,
      assignedBatchId,
      solutionHint,
      description,
      folderId,
    } = body;

    if (!title || !pgn || !level || !folderId) {
      return NextResponse.json({ error: "Title, PGN, Level, and Folder are required" }, { status: 400 });
    }

    const puzzle = await prisma.puzzle.create({
      data: {
        title,
        pgn,
        fen: fen || null,
        level,
        assignedBatchId: assignedBatchId || null,
        solutionHint: solutionHint || null,
        description: description || null,
        folderId,
      },
      include: {
        assignedBatch: true,
      },
    });

    return NextResponse.json({
      ...puzzle,
      assignedBatch: puzzle.assignedBatch ? puzzle.assignedBatch.name : "",
    });
  } catch (error) {
    console.error("POST puzzle error:", error);
    return NextResponse.json({ error: "Failed to create puzzle" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const {
      id,
      title,
      pgn,
      fen,
      level,
      assignedBatchId,
      solutionHint,
      description,
      folderId,
    } = await request.json();

    if (!id || !title || !pgn || !level || !folderId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const puzzle = await prisma.puzzle.update({
      where: { id },
      data: {
        title,
        pgn,
        fen: fen || null,
        level,
        assignedBatchId: assignedBatchId || null,
        solutionHint: solutionHint || null,
        description: description || null,
        folderId,
      },
      include: {
        assignedBatch: true,
      },
    });

    return NextResponse.json({
      ...puzzle,
      assignedBatch: puzzle.assignedBatch ? puzzle.assignedBatch.name : "",
    });
  } catch (error) {
    console.error("PUT puzzle error:", error);
    return NextResponse.json({ error: "Failed to update puzzle" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Puzzle ID is required" }, { status: 400 });
    }

    await prisma.puzzle.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE puzzle error:", error);
    return NextResponse.json({ error: "Failed to delete puzzle" }, { status: 500 });
  }
}
