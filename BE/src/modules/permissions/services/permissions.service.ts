import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/service/prisma.service';;

@Injectable()
export class PermissionsService {
    constructor(private readonly prismaService: PrismaService) {}

    async getAllPermissions() {
        try {
            return await this.prismaService.permissions.findMany();
        } catch (error) {
            throw error;
        }
    }
}