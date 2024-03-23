import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';;
import { RedisModule } from './modules/redis/redis.module';

@Module({
  imports: [UsersModule, AuthModule, RedisModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
