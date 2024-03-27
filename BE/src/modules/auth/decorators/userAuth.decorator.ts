import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/modules/users/models/user.model';

// Factory pattern
export const UserAuth = createParamDecorator<
    string,
    ExecutionContext,
    User>((propKey: string, ctx: ExecutionContext): User => {
        const req = ctx.switchToHttp().getRequest();

        return propKey ? req.user[propKey] : req.user;
    });
