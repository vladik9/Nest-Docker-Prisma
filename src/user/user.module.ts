import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { JwtStrategy } from '../auth/strategy';
import { UserController } from './user.controller';
import { UserService } from './user.service';
@Module({
  controllers: [UserController],
  providers: [UserService, AuthService, JwtStrategy, JwtService],
})
export class UserModule {}
