import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { gameplayId, assignments } = await req.json();

    if (
      !gameplayId ||
      !Array.isArray(assignments) ||
      assignments.length === 0
    ) {
      return NextResponse.json(
        { error: "Invalid request. gameplayId and assignments are required." },
        { status: 400 }
      );
    }

    console.log("📝 Insert Data:", assignments);

    const existingAssignments = await prisma.copAssignment.findMany({
      where: {
        gameplayId,
        copId: { in: assignments.map((a) => a.copId) },
      },
    });

    console.log("🔍 Existing Assignments:", existingAssignments);

    const newAssignments = assignments.filter(
      (a) => !existingAssignments.some((e) => e.copId === a.copId)
    );

    if (newAssignments.length === 0) {
      return NextResponse.json(
        { error: "No new assignments inserted. Duplicates detected." },
        { status: 400 }
      );
    }

    await prisma.copAssignment.createMany({
      data: newAssignments.map(({ copId, cityId, vehicleId }) => ({
        gameplayId,
        copId,
        cityId,
        vehicleId,
      })),
    });

    const insertedAssignments = await prisma.copAssignment.findMany({
      where: {
        gameplayId,
        copId: { in: newAssignments.map((a) => a.copId) },
      },
      include: {
        cop: { select: { id: true, name: true } },
        city: { select: { id: true, name: true, distance: true } },
        vehicle: { select: { id: true, kind: true, range: true } },
      },
    });

    return NextResponse.json(insertedAssignments, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create cop assignments" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const gameplayId = searchParams.get("gameplayId");

    if (!gameplayId) {
      return NextResponse.json(
        { error: "gameplayId is required" },
        { status: 400 }
      );
    }

    const assignments = await prisma.copAssignment.findMany({
      where: { gameplayId },
      include: {
        cop: { select: { id: true, name: true } },
        city: { select: { id: true, name: true, distance: true } },
        vehicle: { select: { id: true, kind: true, range: true } },
      },
    });

    return NextResponse.json(assignments, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch assignments" },
      { status: 500 }
    );
  }
}
