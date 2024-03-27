import { Body, Controller, Post, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginBodyRequestDto } from './dto/request/body/login.body.request.dto';
import { AuthService } from './services/auth.service';
import { createJwt } from './strategies/jwt.strategy';
import { comparePassword, passwordHashing } from './strategies/hashPassword.strategy';
import { RegisterBodyRequestDto } from './dto/request/body/register.body.request.dto';
import { TokenBodyResponseDto } from './dto/respone/body/token.body.respone.dto';
import { RedisService } from '../redis/services/redis.service';
import { CanAccessBy } from './decorators/can-access-by.decorator';
import { UserAuth } from './decorators/userAuth.decorator';
import { User } from '../users/models/user.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly redisService: RedisService) { }

  @Post("login")
  @UsePipes(new ValidationPipe({ transform: true }))
  async login(@Body() login: LoginBodyRequestDto) {
    const user = await this.authService.validateUser(login.username);
    if (!user) {
      throw new Error("User does not exist");
    };
    if (!await comparePassword(login.password, user.password)) {
      throw new Error("Invalid password");
    };

    delete user.password;
    await this.redisService.set(user.id, user)
    const token: TokenBodyResponseDto = new TokenBodyResponseDto(await createJwt({ id: user.id }));

    return {
      acessToken: token,
      user: user
    };
  };

  @Post("register")
  async register(@Body() userInformation: RegisterBodyRequestDto) {
      userInformation.password = await passwordHashing(userInformation.password);
      await this.authService.registerUser(userInformation);
      return;
  };

  @Post("logout")
  @CanAccessBy()
  async logout(@UserAuth() user: User) {
    await this.redisService.del(user.id);
    return;
  };
}
