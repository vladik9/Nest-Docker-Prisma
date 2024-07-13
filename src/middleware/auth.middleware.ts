import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { UserService } from '../user/user.service';

@Injectable()
export class TokenCheckMiddleware implements NestMiddleware {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'].split(' ')[1];
    console.log(token);
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const decoded = this.jwtService.verify(token);
    if (!decoded) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    console.log(decoded);

    const user = this.userService.findUserByEmail(req.body.email);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
  }
}
