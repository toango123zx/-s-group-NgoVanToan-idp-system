import { PrismaClient } from "@prisma/client"

interface PermissionDB {
    name: string;
    description: string;
    roles: {
        connect: {
            name: string;
        }[];
    };
};

const permissions: PermissionDB[] = [
    {
        name: "viewMyProfile",
        description: "View my profile",
        roles: {
            connect: [
                {
                    name: "superAdmin"
                },
                {
                    name: "admin"

                },
                {
                    name: "user"

                }
            ]
        }
    },    
    {
        name: "viewListUser",
        description: "View all users",
        roles: {
            connect: [{
                name: "admin"
            },
            {
                name: "superAdmin"

            }]
        }
    },
    {
        name: "searchUser",
        description: "Search users",
        roles: {
            connect: [{
                name: "admin"
            },
            {
                name: "superAdmin"

            }]
        }
    }
];

export const permissionsSeed = async () => {
    const prisma = new PrismaClient();

    for (let permission of permissions) {
        await prisma.permissions.create({
            data: permission
        });
    };
    
    console.log("Permissions seeded successfully");
};