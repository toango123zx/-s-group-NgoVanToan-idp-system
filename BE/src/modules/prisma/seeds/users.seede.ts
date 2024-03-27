import { PrismaClient } from "@prisma/client"

interface UserDB {
    username: string;
    password: string; // password: 1
    fullName: string;
    age: number;
    email: string;
    roles: {
        connect: {
            name: string;
        };
    };
};

const users: UserDB[] = [
    {
        username: "superAdmin",
        password: "$2b$10$MGWBzXIAmFrOrm1KgaOr8OAg6j1YWrVtq7n.PfQDvMBwbQpFy.gMy",
        fullName: "superAdmin",
        age: 12,
        email: "superAdmin@gmail.com",
        roles: {
            connect: {
                name: "superAdmin"
            }
        }
    },
    {
        username: "admin",
        password: "$2b$10$MGWBzXIAmFrOrm1KgaOr8OAg6j1YWrVtq7n.PfQDvMBwbQpFy.gMy",
        fullName: "admin",
        age: 12,
        email: "admin@gmail.com",
        roles: {
            connect: {
                name: "admin"
            }
        }
    },
    {
        username: "user",
        password: "$2b$10$MGWBzXIAmFrOrm1KgaOr8OAg6j1YWrVtq7n.PfQDvMBwbQpFy.gMy",
        fullName: "user",
        age: 12,
        email: "user@gmail.com",
        roles: {
            connect: {
                name: "user"
            }
        }
    }
];

export const usersSeed = async () => {
    const prisma = new PrismaClient()

    for (let i = 1; i < 400; i++) {
        users.push(
            {
                username: `superAdmin${i}`,
                password: `$2b$10$MGWBzXIAmFrOrm1KgaOr8OAg6j1YWrVtq7n.PfQDvMBwbQpFy.gMy`,
                fullName: `superAdmin${i}`,
                age: 12,
                email: `superAdmin${i}@gmail.com`,
                roles: {
                    connect: {
                        name: `superAdmin`
                    }
                }
            },
            {
                username: `admin${i}`,
                password: `$2b$10$MGWBzXIAmFrOrm1KgaOr8OAg6j1YWrVtq7n.PfQDvMBwbQpFy.gMy`,
                fullName: `admin${i}`,
                age: 12,
                email: `admin${i}@gmail.com`,
                roles: {
                    connect: {
                        name: `admin`
                    }
                }
            },
            {
                username: `user${i}`,
                password: `$2b$10$MGWBzXIAmFrOrm1KgaOr8OAg6j1YWrVtq7n.PfQDvMBwbQpFy.gMy`,
                fullName: `user${i}`,
                age: 12,
                email: `user${i}@gmail.com`,
                roles: {
                    connect: {
                        name: `user`
                    }
                }
            });
    };
    for (let user of users) {
        await prisma.users.create({
            data: user
        });
    };
    console.log("Users seeded successfully");
};