import { Body, Controller, Get, Inject, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoginBodyRequestDto } from './dto/request/body/login.body.request.dto';
import { AuthService } from './services/auth.service';
import { createJwt, verifyJwt } from './strategies/jwt.strategy';
import { comparePassword, passwordHashing } from './strategies/hashPassword.strategy';
import { RegisterBodyRequestDto } from './dto/request/body/register.body.request.dto';
import { TokenBodyResponseDto } from './dto/respone/body/token.body.respone.dto';
import { RedisService } from '../redis/services/redis.service';
import { AuthGuard } from './guards/auth.guard';
import { from } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly redisService: RedisService) { }

  @Post("login")
  async login(@Body() login: LoginBodyRequestDto, @Res() res: Response): Promise<Response> {
    const user = await this.authService.validateUser(login.username);
    if (!user) {
      return res.status(404).json({
        message: "User does not exist"
      });
    }
    try {
      if (!await comparePassword(login.password, user.password)) {
        return res.status(401).json({
          message: "Invalid password"
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Query user auth service failed"
      });
    }

    try {
      const token: TokenBodyResponseDto = new TokenBodyResponseDto(await createJwt(user));
      await this.redisService.set(token.id, token.accessToken)
      delete token.accessToken;
      delete user.password;
      
      return res.status(200).json({
        token: token.id,
        user: user
      });
    } catch (error) {
      return res.status(500).json({
        message: "Create jwt failed"
      });
    }
  }

  @Post("register")
  async register(@Body() userInformation: RegisterBodyRequestDto, @Res() res: Response): Promise<Response> {
    try {
      userInformation.password = await passwordHashing(userInformation.password);
      await this.authService.registerUser(userInformation);

      return res.sendStatus(201);
    } catch (error) {
      return res.status(500).json({ 
        message: 'Internal server error in ...', 
      });
    }
  }
  
  @Post("logout")
  @UseGuards(AuthGuard)
  async logout(@Req() req: Request, @Res() res: Response): Promise<Response> {
    const token = req.headers.authorization.split(" ")[1];
    await this.redisService.del(token);
    return res.sendStatus(200);
  }
}
