import { NextResponse } from "next/server";
import { VehicleService } from "../../../services/VehicleService";
import { z } from "zod";

const vehicleSchema = z.object({
  kind: z.string().min(2, "Vehicle kind must be at least 2 characters long"),
  range: z.number().min(1, "Range must be greater than 0"),
  count: z.number().min(1, "Count must be greater than 0"),
});

export async function GET() {
  try {
    const vehicles = await VehicleService.getAllVehicles();
    return NextResponse.json(vehicles, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch vehicles" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = vehicleSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.format() },
        { status: 400 }
      );
    }

    const { kind, range, count } = result.data;
    const newVehicle = await VehicleService.createVehicle(kind, range, count);
    return NextResponse.json(newVehicle, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create vehicle" },
      { status: 500 }
    );
  }
}
