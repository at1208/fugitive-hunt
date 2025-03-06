import { prisma } from "@/lib/prisma";
import { Cop } from "@prisma/client";

export class CopRepository {
  static async createCop(name: string): Promise<Cop> {
    return prisma.cop.create({ data: { name } });
  }

  static async getAllCops(): Promise<Cop[]> {
    return prisma.cop.findMany();
  }

  static async findCopById(id: string): Promise<Cop | null> {
    return prisma.cop.findUnique({ where: { id } });
  }
}
