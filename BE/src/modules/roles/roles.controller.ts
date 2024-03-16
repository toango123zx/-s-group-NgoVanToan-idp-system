import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { RolesService } from './services/roles.service';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guards/roles.guard';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  @Get()
  @Roles('admin')
  @UseGuards(AuthGuard, RolesGuard)
  async getRoles(@Res() res: Response): Promise<Response> {
    try {
      return res.status(200).json(await this.rolesService.getRoles());
    } catch (error) {
      return res.status(500).json({
        message: 'Internal server error in ...',
      });
    };
  };

  // @Post(':idUser')
  // @Roles('admin')
  // @UseGuards(AuthGuard, RolesGuard)
  // async updateRole(@Param() param: string, @Body() body: string, @Res() res: Response): Promise<Response> {
  //   try {
  //     await this.rolesService.updateRole(param['idUser'], body['idRole']);
  //     return res.sendStatus(200);
  //   } catch (error) { 
  //     return res.status(500).json({
  //       message: 'Internal server error in ...',
  //     });
  //   }
  // }

}
