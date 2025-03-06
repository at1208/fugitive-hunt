import { prisma } from "@/lib/prisma";

export async function createAssignments(
  gameplayId: string,
  assignments: { copId: string; cityId: string; vehicleId: string }[]
) {
  try {
    if (!assignments || assignments.length === 0) {
      throw new Error("Assignments array is empty or invalid.");
    }

    await prisma.copAssignment.createMany({
      data: assignments.map(({ copId, cityId, vehicleId }) => ({
        gameplayId,
        copId,
        cityId,
        vehicleId,
      })),
      skipDuplicates: true,
    });

    return await getAssignmentsByGameplay(gameplayId);
  } catch (error) {
    throw new Error("Failed to create cop assignments.");
  }
}

export async function getAssignmentsByGameplay(gameplayId: string) {
  try {
    const assignments = await prisma.copAssignment.findMany({
      where: { gameplayId },
      include: {
        cop: { select: { id: true, name: true } },
        city: { select: { id: true, name: true, distance: true } },
        vehicle: { select: { id: true, kind: true, range: true } },
      },
    });

    return assignments;
  } catch (error) {
    throw new Error("Failed to fetch assignments.");
  }
}
