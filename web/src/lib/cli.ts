import "dotenv/config";

import { Command } from "commander";
import { prisma } from "./prisma";

const program = new Command();

program
  .name("License CLI")
  .description("CLI to manage your License account")
  .version("1.0.0");

program
  .command("users:list")
  .description("List all users")
  .action(async () => {
    const users = await prisma.user.findMany({
      select: { id: true, email: true, name: true, admin: true },
    });

    if (!users.length) console.log("❌ No users found!");
    else console.table(users);
  });

program
  .command("users:delete")
  .description("Delete a user")
  .argument("<id>", "user id")
  .action(async (id) => {
    await prisma.user.delete({ where: { id } });
    console.log(`✅ User deleted successfully!`);
  });

program
  .command("admins:add")
  .description("Add an admin")
  .argument("<id>", "admin id")
  .action(async (id) => {
    await prisma.user.update({
      where: { id },
      data: { admin: true },
    });

    console.log(`✅ Admin added successfully!`);
  });

program
  .command("admins:delete")
  .description("Delete an admin")
  .argument("<id>", "admin id")
  .action(async (id) => {
    await prisma.user.update({
      where: { id },
      data: { admin: false },
    });

    console.log(`✅ Admin deleted successfully!`);
  });

program.parse();
