import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/modules/redis/services/redis.service';
import { TokenBodyResponseDto } from '../dto/respone/body/token.body.respone.dto';
import { createJwt } from '../strategies/jwt.strategy';
import { User } from 'src/modules/users/models/user.model';

@Injectable()
export class JwtService {
    constructor(private readonly redisService: RedisService) { }

    async createJwt(data: any): Promise<void> {
        const token: TokenBodyResponseDto = new TokenBodyResponseDto(await createJwt(data));
        // await this.redisService.set(token.id, token.accessToken);
    }
    
    // async updateJwt(keyRedis: string, data: User): Promise<void> {
    //     const token: TokenBodyResponseDto = new TokenBodyResponseDto(await createJwt(data), keyRedis);
    //     await this.redisService.del(keyRedis);
    //     await this.redisService.set(token.id, token.accessToken);
    // }

}