import { CanActivate, ExecutionContext, Injectable, Next, Res } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Roles } from "../decorators/roles.decorator";
import { User } from "src/modules/users/models/user.model";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private relector: Reflector) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.relector.get(Roles, context.getHandler())
        const user: User = context.switchToHttp().getRequest().user;
        const valid = user.roles.some((role) => {
            if (role.name === roles) {
                return true;
            }
        });

        if (!valid) {
            return context.switchToHttp().getResponse().status(403).json({
                message: "The user does not have permission to access this resource"
            });
        };

        return context.switchToHttp().getNext();
    };
};