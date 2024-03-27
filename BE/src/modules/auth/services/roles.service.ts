import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/service/prisma.service'; 
import { Role } from '../models/role.model';

@Injectable()
export class RolesService {
    constructor(private readonly prismaService: PrismaService) { }

    async getRoles(): Promise<Role[]> {
        try {
            return await this.prismaService.roles.findMany({
                select: {
                    id: true,
                    name: true,
                    description: true,
                    isEditable: true
                }
            });
        } catch (error) {
            throw error;
        };
    };

    async getRoleById(id: string): Promise<Role> {
        try {
            return await this.prismaService.roles.findUnique({
                where: {
                    id: id
                }
            });
        } catch (error) {
            throw error;
        };
    };

    // async updateRole(user: User, idRole: string): Promise<void> {
    //     try {
    //         await this.prismaService.users.update({
    //             where: {
    //                 id: user.id
    //             },
    //             data: {
    //                 roles: {
    //                     connect: {
    //                         id: idRole
    //                     },
    //                     disconnect: {
    //                         id: user.roles[0].id
    //                     }
    //                 }
    //             }
    //         });
    //     } catch (error) {
    //         throw error;
    //     };
    // };
};