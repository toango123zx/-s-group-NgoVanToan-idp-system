import { PrismaClient } from "@prisma/client"

interface RoleDB {
    name: string;
    description: string;
    isEditable: boolean;
};

const prisma = new PrismaClient()
export const rolesSeed = async () => {
    const roles: RoleDB[] = [
        {
            name: "superAdmin",
            description: "superAdmin",
            isEditable: true,
        },
        {
            name: "admin",
            description: "admin",
            isEditable: true,
        },
        {
            name: "user",
            description: "user",
            isEditable: false,
        }
    ];

    for (let role of roles) {
        await prisma.roles.create({
            data: role
        });
    };

    console.log("Roles seeded successfully");
};
