import { prisma } from "@/lib/prisma";

export class CityRepository {
  static async getAllCities() {
    return prisma.city.findMany();
  }

  static async getCityByName(name: string) {
    return prisma.city.findUnique({ where: { name } });
  }

  static async createCity(cityData: { name: string; distance: number }) {
    return prisma.city.create({ data: cityData });
  }
}
