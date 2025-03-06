import { prisma } from "@/lib/prisma";
import { Vehicle } from "@prisma/client";

export class VehicleRepository {
  static async getAllVehicles(): Promise<Vehicle[]> {
    return prisma.vehicle.findMany();
  }
}
