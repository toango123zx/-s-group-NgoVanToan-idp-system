import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthGuard } from './guards/auth.guard';
import { RedisModule } from '../redis/redis.module';
import { JwtService } from './services/jwt.service';

@Module({
  imports: [PrismaModule, RedisModule],
  controllers: [AuthController],
  providers: [AuthService, JwtService, AuthGuard],
  exports: [RedisModule, AuthService, JwtService, AuthGuard]
})
export class AuthModule { }
