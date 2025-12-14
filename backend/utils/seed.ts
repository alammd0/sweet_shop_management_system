import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  const password = await bcrypt.hash("123456", 10);

  await prisma.user.createMany({
    data: [
      {
        name: "Alam Khalid",
        email: "alamkhalid@gmail.com",
        password,
        role: "admin",
      }
    ],
    skipDuplicates: true,
  });
}


main()
  .then(() => console.log("User seed completed"))
  .catch(console.error)
  .finally(() => prisma.$disconnect());
