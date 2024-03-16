import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Permissions } from "../decorators/permissions.decorator";
import { User } from "src/modules/users/models/user.model";

@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const permissions = this.reflector.get<string>(Permissions, context.getHandler());
        const user: User = context.switchToHttp().getRequest().user;
        const valid = user.roles.some((role) => {
            return role.permissions.some((permission) => {
                if (permission.name === permissions) {
                    return true;
                };
            });
        });

        if (!valid) {
            return context.switchToHttp().getResponse().status(403).json({
                message: "The user does not have permission to access this resource"
            });
        };

        return context.switchToHttp().getNext();
    };
};