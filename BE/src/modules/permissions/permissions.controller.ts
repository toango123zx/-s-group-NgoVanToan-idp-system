import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { PermissionsService } from './services/permissions.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../roles/guards/roles.guard';
import { PermissionsGuard } from './guards/permissions.guard';
import { Permissions } from './decorators/permissions.decorator';
import { Roles } from '../roles/decorators/roles.decorator';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) { }

};
