import { PrismaClient } from "@prisma/client";
import { hash } from "argon2";

const prisma = new PrismaClient();
async function main() {
  const admin = await prisma.user.upsert({
    where: {
      email: "frost.75.asafarhan@gmail.com",
    },
    update: {},
    create: {
      email: "frost.75.asafarhan@gmail.com",
      username: "admin",
      name: "Admin",
      password: await hash("admin"),
      role: "ADMIN",
    },
  });
  if (admin) console.log(`${admin.name} created`);

}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
