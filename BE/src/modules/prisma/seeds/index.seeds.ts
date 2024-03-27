import { PrismaClient } from "@prisma/client"
import { rolesSeed } from "./roles.seede"
import { usersSeed } from "./users.seede";
import { permissionsSeed } from "./permissions.seed";

const prisma = new PrismaClient()
const main = async () => {
    await rolesSeed();
    await permissionsSeed();
    await usersSeed();
};

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })