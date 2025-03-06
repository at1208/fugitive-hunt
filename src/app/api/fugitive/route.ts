import { NextResponse } from "next/server";
import {
  createFugitive,
  getAllFugitives,
  isFugitiveCaptured,
} from "../../../repositories/FugitiveRepository";

export async function POST(req: Request) {
  try {
    const { name, cityId } = await req.json();
    if (!name || !cityId) {
      return NextResponse.json(
        { error: "Name and cityId are required" },
        { status: 400 }
      );
    }

    const newFugitive = await createFugitive(name, cityId);
    return NextResponse.json(newFugitive, { status: 201 });
  } catch (error) {
    console.error("Error creating fugitive:", error);
    return NextResponse.json(
      { error: "Failed to create fugitive" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const gameplayId = searchParams.get("gameplayId");

    if (gameplayId) {
      const result = await isFugitiveCaptured(gameplayId);
      return NextResponse.json(result, { status: 200 });
    }

    const fugitives = await getAllFugitives();
    return NextResponse.json(fugitives, { status: 200 });
  } catch (error) {
    console.error("Error fetching fugitives:", error);
    return NextResponse.json(
      { error: "Failed to fetch fugitives" },
      { status: 500 }
    );
  }
}
