import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Roles, ROLES_KEY } from '../decorator/role.decorator';
import { roleEnum } from 'src/enum/roles';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // const roles = this.reflector.get(Roles, context.getHandler());
    // if (!roles) {
    //   return true;
    // }
    // const request = context.switchToHttp().getRequest();
    // const user = request.user;
    // return matchRoles(roles, user.roles);

    const requiredRole = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
    ]);

    console.log(requiredRole);
    // console.log(roleEnum);

    if (!requiredRole) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // const user_role = roleEnum.forEach(obj => {
    //   if(obj.id === )
    // })
    console.log(user);

    if (!user || !user.role_name) return false;

    return requiredRole.some((role) => console.log(role));
  }
}
