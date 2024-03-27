import { CanActivate, ExecutionContext, Injectable, Next, Res } from "@nestjs/common";
import { _jwtService } from "../config/jwt.config";
import { Jwt } from "../models/jwt.model";
import { RedisService } from "src/modules/redis/services/redis.service";
import { User } from "src/modules/users/models/user.model";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly redisService: RedisService) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
            const request = context.switchToHttp().getRequest();
            let token = request.headers.authorization;
            if (!token) {
                return context.switchToHttp().getResponse().status(401).send({
                    message: "You're not authenticated"
                });
            };

            const userID: Jwt = await _jwtService.verifyAsync<Jwt>(token.split(" ")[1]);
            
            const user = await this.redisService.get<User>(userID.id);
            request.user = user;

            return context.switchToHttp().getNext();
    };
};