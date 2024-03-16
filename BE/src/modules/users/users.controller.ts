import { Body, Controller, Get, Param, Put, Query, Req, Res, UseGuards, UsePipes } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Request, Response } from 'express';
import { User } from './models/user.model';
import { UpdateInfomationBodyRequestDto } from './dto/request/body/update-infomation.body.request.dto';
import { JwtService } from '../auth/services/jwt.service';
import { Pagination } from './dto/request/params/pagination.params.request.dto';
import { Roles } from '../roles/decorators/roles.decorator';
import { RolesGuard } from '../roles/guards/roles.guard';;

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    private readonly jwtService: JwtService) { }
  
  @Get('me')
  @UseGuards(AuthGuard)
  async getInfomationMe(@Req() req: Request, @Res() res: Response): Promise<Response> {
    const user: User = req['user'];
    delete user.password;
    return res.status(201).json({user});
  }

  @Put('me')
  @UseGuards(AuthGuard)
  async updateInfomationMe(@Body() myInfomation: UpdateInfomationBodyRequestDto, @Req() req: Request, @Res() res: Response): Promise<Response> {
    const user: User = await this.usersService.updateUserById(req['user'].id, myInfomation);
    const id = req.headers.authorization.split(" ")[1];
    await this.jwtService.updateJwt(id, user);
    return res.sendStatus(200)
  };

  @Get()
  @Roles('admin')
  @UseGuards(AuthGuard, RolesGuard)
  async getUsers(@Req() req: Request, @Query() pagination: Pagination, @Res() res: Response): Promise<Response> {
    try {
      const users: User[] = await this.usersService.getUsers(pagination.page, pagination.limit);
      return res.status(200).json({users});
    } catch (error) {
      return res.status(500).json({ 
        message: 'Internal server error in ...', 
      });
    }
  };
  
  // @Get(':id')
  // @Roles('admin')
  // @UseGuards(AuthGuard, RolesGuard)
  // async getUserById(@Param('id') id: string, @Res() res: Response): Promise<Response> {
  //   try {
  //     return res.status(200).json(await this.usersService.getUserById(id));
  //   }
  //   catch (error) {
  //     return res.status(500).json({ 
  //       message: 'Internal server error in ...', 
  //     });
  //   }
  // }
}
