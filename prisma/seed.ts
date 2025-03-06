const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Database...");

  const citiesData = [
    { name: "Yapkashnagar", distance: 60 },
    { name: "Lihaspur", distance: 50 },
    { name: "Narmis City", distance: 40 },
    { name: "Shekharvati", distance: 30 },
    { name: "Nuravgram", distance: 20 },
  ];

  await prisma.city.createMany({
    data: citiesData,
    skipDuplicates: true,
  });

  const cities = await prisma.city.findMany();
  console.log(`Seeded Cities: ${cities.length}`);

  await prisma.vehicle.createMany({
    data: [
      { kind: "EV Bike", range: 60, count: 2 },
      { kind: "EV Car", range: 100, count: 1 },
      { kind: "EV SUV", range: 120, count: 1 },
    ],
    skipDuplicates: true,
  });

  const vehicles = await prisma.vehicle.findMany();
  console.log(`🚓 Seeded Vehicles: ${vehicles.length}`);

  const copData = [
    { name: "Officer John" },
    { name: "Officer Jane" },
    { name: "Officer Mike" },
  ];

  for (const cop of copData) {
    await prisma.cop.upsert({
      where: { name: cop.name },
      update: {},
      create: { name: cop.name },
    });
  }

  const cops = await prisma.cop.findMany();
  console.log(`👮 Seeded ${cops.length} Cops`);

  const randomCity = cities[Math.floor(Math.random() * cities.length)];

  await prisma.fugitive.upsert({
    where: { name: "Fugitive X" },
    update: {},
    create: {
      name: "Fugitive X",
      cityId: randomCity.id,
    },
  });

  const fugitives = await prisma.fugitive.findMany();
  console.log(
    `🏃‍♂️ Seeded ${fugitives.length} Fugitive(s) in ${randomCity.name}`
  );

  console.log("Seeding Completed!");
}

main()
  .catch((error) => {
    console.error("Seeding Failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
