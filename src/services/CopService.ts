import { prisma } from "@/lib/prisma";

export class CopService {
  static async createCop(name: string) {
    return prisma.cop.create({
      data: { name },
    });
  }

  static async listCops() {
    return prisma.cop.findMany();
  }

  static async assignCop(id: string, cityId?: string, vehicleId?: string) {
    return prisma.cop.update({
      where: { id },
      data: {
        ...(cityId !== undefined && { cityId }),
        ...(vehicleId !== undefined && { vehicleId }),
      },
    });
  }
}
