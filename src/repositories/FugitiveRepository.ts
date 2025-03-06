import { prisma } from "@/lib/prisma";

export async function createFugitive(name: string, cityId: string) {
  return prisma.fugitive.create({
    data: { name, cityId },
  });
}

export async function getAllFugitives() {
  return prisma.fugitive.findMany({
    include: { city: true },
  });
}

export async function getFugitiveById(id: string) {
  return prisma.fugitive.findUnique({
    where: { id },
    include: { city: true },
  });
}

export async function isFugitiveCaptured(gameplayId: string) {
  const fugitives = await prisma.fugitive.findMany({
    include: { city: true },
  });

  const copAssignments = await prisma.copAssignment.findMany({
    where: { gameplayId },
    include: {
      cop: { select: { name: true } },
      city: { select: { id: true, name: true, distance: true } },
      vehicle: { select: { id: true, kind: true, range: true } },
    },
  });

  for (const fugitive of fugitives) {
    for (const assignment of copAssignments) {
      const roundTripDistance = assignment.city.distance * 2;

      if (
        assignment.city.id === fugitive.cityId &&
        assignment.vehicle.range >= roundTripDistance
      ) {
        return {
          captured: true,
          copName: assignment.cop.name,
          fugitive: fugitive.name,
        };
      }
    }
  }

  return { captured: false };
}
