import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/service/prisma.service';
import { User } from '../models/user.model';
import { UpdateInfomationBodyRequestDto } from '../dto/request/body/update-infomation.body.request.dto';

@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService) {}
    async getUserByUsername(username: string) {
        try {
            
        } catch (error) {
            throw error;
        }
    }

    async updateUserById(id: string, data: UpdateInfomationBodyRequestDto): Promise<User> {
        try {
            return await this.prismaService.users.update({
                where: {
                    id: id
                },
                data: data
            })
        } catch (error) {
            throw error;
        }
    }

    async getUsers(page: number = 0, limit: number = 10): Promise<User[]> {
        try {
            return await this.prismaService.users.findMany({
                select: {
                    id: true,
                    username: true,
                    fullName: true,
                    roles : {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                },
                skip: Number((page - 1) * limit),
                take: Number(limit),
            });
        } catch (error) {
            throw error;
        };
    };

    async getUserById(id: string): Promise<User> {
        try {
            return await this.prismaService.users.findUnique({
                select: {
                    id: true,
                    username: true,
                    fullName: true,
                    roles : {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                },
                where: {
                    id: id
                }
            });
        } catch (error) {
            throw error;
        }
    }
}
