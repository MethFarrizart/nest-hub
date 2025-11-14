import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleWare implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const header = req.headers.cookie?.split('token=')[1];
    // console.log(header);
    console.log(`Request received: ${req.method} ${req.originalUrl}`);
    next();
  }
}
