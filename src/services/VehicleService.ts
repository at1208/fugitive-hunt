import { prisma } from "@/lib/prisma";

export class VehicleService {
  static async getAllVehicles() {
    return prisma.vehicle.findMany();
  }

  static async createVehicle(kind: string, range: number, count: number) {
    return prisma.vehicle.create({
      data: { kind, range, count },
    });
  }
}
