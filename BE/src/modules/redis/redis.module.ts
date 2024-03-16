import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisOptions } from './config/redis.config';
import { RedisService } from './services/redis.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.registerAsync(RedisOptions),
  ],
  controllers: [],
  providers: [RedisService],
  exports: [RedisService],
})

export class RedisModule {}