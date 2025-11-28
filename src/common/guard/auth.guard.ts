import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // console.log(request);

    const cookie = request.headers?.cookie;

    console.log('request', request);
    if (!cookie) throw new UnauthorizedException();

    // const token = cookie.split('token=')[1];

    const token = cookie
      .split('; ')
      .find((c) => c.startsWith('token='))
      ?.split('=')[1];

    console.log('parsed token:', token);

    if (!token) throw new UnauthorizedException();

    try {
      const payload = await this.jwtService.verifyAsync(token);
      console.log('payload', payload);
      request.user = payload;
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
