import { CanActivate, ExecutionContext, Injectable, Next, Res } from "@nestjs/common";
import { _jwtService } from "../config/jwt.config";
import { Jwt } from "../models/jwt.model";
import { RedisService } from "src/modules/redis/services/redis.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly redisService: RedisService) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request = context.switchToHttp().getRequest();
            let token = request.headers.authorization.split(" ")[1];
            token = await this.redisService.get<string>(token);
            const user: Jwt = await _jwtService.verifyAsync<Jwt>(token);

            delete user.iat; 
            delete user.exp;
            request.user = user;
            return context.switchToHttp().getNext();
        } catch (error) {
            return context.switchToHttp().getResponse().status(401).send({
                message: "You're not authenticated"
            });
        };
    };
};