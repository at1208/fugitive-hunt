import { prisma } from "@/lib/prisma";

export class CopAssignmentService {
  static async createAssignment(
    copId: string,
    cityId: string,
    vehicleId: string,
    gameplayId: string
  ) {
    return prisma.copAssignment.create({
      data: { copId, cityId, vehicleId, gameplayId },
    });
  }

  static async getAllAssignments() {
    return prisma.copAssignment.findMany({
      include: { cop: true, city: true, vehicle: true },
    });
  }

  static async getAssignmentByCopId(copId: string) {
    return prisma.copAssignment.findFirst({
      where: { copId: copId },
      include: { cop: true, city: true, vehicle: true },
    });
  }
}
