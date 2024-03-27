import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ACCESS_RIGHT_META_DATA_KEY } from '../decorators/can-access-by.decorator';
import { User } from 'src/modules/users/models/user.model';

@Injectable()
export class AccessRightGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const user: User = context.switchToHttp().getRequest().user;
    const requiredRights = this.reflector.get<string[]>(
      ACCESS_RIGHT_META_DATA_KEY,
      context.getHandler(),
    );
    
    if (!requiredRights) {
      return context.switchToHttp().getNext();
    };

    if (!(requiredRights.some((right) => user.roles.some((role) => role.permissions.some((permission) => permission.name === right))))) {
      return context.switchToHttp().getResponse().status(401).send({
        message: "You're not authenticated"
      });
    };

    return context.switchToHttp().getNext();

  };
};
