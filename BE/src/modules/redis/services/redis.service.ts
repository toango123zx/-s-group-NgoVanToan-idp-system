import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
    constructor(@Inject('CACHE_MANAGER') private cacheManager: Cache) {}

    async get<T>(key: string): Promise<any> {
        return await this.cacheManager.get<T>(key);
    }
    
    async set(key: string, value: any): Promise<void> {
        return await this.cacheManager.set(key, value);
    }

    async del(key: string): Promise<void> {
        return await this.cacheManager.del(key);
    }

    async reset(): Promise<void> {
        return await this.cacheManager.reset();
    }
}
