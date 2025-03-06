import { NextResponse } from "next/server";
import { CopService } from "../../../services/CopService";
import { z } from "zod";

const createCopSchema = z.object({
  name: z.string().min(2, "Cop name must be at least 2 characters"),
});

const assignCopSchema = z.object({
  cityId: z.string().optional(),
  vehicleId: z.string().optional(),
});

export async function GET() {
  try {
    const cops = await CopService.listCops();
    return NextResponse.json(cops);
  } catch (error) {
    console.error("Error fetching cops:", error);
    return NextResponse.json(
      { error: "Failed to fetch cops" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = createCopSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.format() },
        { status: 400 }
      );
    }

    const newCop = await CopService.createCop(parsed.data.name);
    return NextResponse.json(newCop, { status: 201 });
  } catch (error) {
    console.error("Error creating cop:", error);
    return NextResponse.json(
      { error: "Failed to create cop" },
      { status: 500 }
    );
  }
}
