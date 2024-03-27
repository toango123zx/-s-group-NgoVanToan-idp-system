import { Controller, Get, Param, Post, Query, SetMetadata, UseGuards, UsePipes } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { User } from './models/user.model';
import { JwtService } from '../auth/services/jwt.service';
import { Pagination } from './dto/request/params/pagination.params.request.dto';
import { UserValidationPipe } from './pipes/userValidation.pipe';
import { ACCESS_RIGHT_META_DATA_KEY, CanAccessBy } from '../auth/decorators/can-access-by.decorator';
import { EnumPermissions } from '../auth/enums/permissions.enum';
import { SearchUserParamsRequestDto } from './dto/request/params/searchUser.params.request.dto';
import { EnumSearchMode } from 'prisma/enums/query.enum';
import { UserAuth } from '../auth/decorators/userAuth.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    private readonly jwtService: JwtService) { }

  @Get('me')
  @SetMetadata(ACCESS_RIGHT_META_DATA_KEY, [EnumPermissions.VIEW_MY_PROFILE])
  @CanAccessBy()
  async getInfomationMe(@UserAuth() user: User) {
    user.roles.map(role => {
      delete role.permissions
      delete role.id
      delete role.isEditable
      return role;
    });
    delete user.password;
    return {
      user
    };
  };

  @Get('search')
  @SetMetadata(ACCESS_RIGHT_META_DATA_KEY, [EnumPermissions.SEARCH_USER])
  @CanAccessBy()
  async searchUserByNameOrEmail(@Query() query: SearchUserParamsRequestDto) {
    const users: User[] = await this.usersService.getUsersByNameOrEmail(query, EnumSearchMode.LIKE);
    return {
      users
    };
  };

  @Get('filter')
  @SetMetadata(ACCESS_RIGHT_META_DATA_KEY, [EnumPermissions.SEARCH_USER])
  @CanAccessBy()
  async filterUserByNameOrEmail(@Query() query: SearchUserParamsRequestDto) {
    const users: User[] = await this.usersService.getUsersByNameOrEmail(query);
    return { users };
  };

  @Get()
  @SetMetadata(ACCESS_RIGHT_META_DATA_KEY, [EnumPermissions.VIEW_LIST_USER])
  @CanAccessBy()
  async getUsers(@Query() pagination: Pagination) {
    if (pagination) {
      pagination.limit = 20;
      pagination.page = 1;
    };
    const users: User[] = await this.usersService.getUsers(pagination.page, pagination.limit);
    return { users };
  };

  @Get(':id')
  @SetMetadata(ACCESS_RIGHT_META_DATA_KEY, [EnumPermissions.SEARCH_USER])
  @CanAccessBy()
  async getUserById(@Param('id') id: string) {
    return await this.usersService.getUserById(id);
  };
}