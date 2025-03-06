import { NextResponse } from "next/server";
import { CityService } from "../../../services/CityService";
import { z } from "zod";

const createCitySchema = z.object({
  name: z.string().min(2, "City name must be at least 2 characters"),
  distance: z.number().min(1, "Distance must be greater than 0"),
});

export async function GET() {
  try {
    const cities = await CityService.listCities();
    return NextResponse.json(cities, { status: 200 });
  } catch (error) {
    console.error("Error fetching cities:", error);
    return NextResponse.json(
      { error: "Failed to fetch cities" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = createCitySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.format() },
        { status: 400 }
      );
    }

    const newCity = await CityService.createCity(parsed.data);
    return NextResponse.json(newCity, { status: 201 });
  } catch (error) {
    console.error("Error creating city:", error);
    return NextResponse.json(
      { error: "Failed to create city" },
      { status: 500 }
    );
  }
}
