import { PrismaClient, Prisma } from '@prisma/client';

export class PrismaService extends PrismaClient<Prisma.PrismaClientOptions, 'query'> {
  constructor() {
    super({
      log: ['query'],
    });
  }
}       