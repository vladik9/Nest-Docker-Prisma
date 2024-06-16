import { AuthDto } from './dto/auth.dto';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async logIn(dto: AuthDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!existingUser) {
      throw new ForbiddenException("user don't exist");
      // return {
      //   message: "user don't exist",
      //   status: 404,
      // };
    } else {
      const isValid = await argon.verify(
        existingUser.hashPassword,
        dto.password,
      );
      if (!isValid) {
        throw new ForbiddenException('password is not valid');
        // return {
        //   message: 'password is not valid',
        //   status: 401,
        // };
      }
      delete existingUser.hashPassword;
      return existingUser;
    }
  }
  async singIn(dto: AuthDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (existingUser) {
      throw new ForbiddenException('user already exist');
      // return {
      //   message: 'user already exist',
      //   status: 401,
      // };
    }
    const hash = await argon.hash(dto.password);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        hashPassword: hash,
      },
    });
    delete user.hashPassword;
    return user;
  }

  async logOut(dto: AuthDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!existingUser) {
      throw new ForbiddenException("user don't exist");
      // return {
      //   message: "user don't exist",
      //   status: 404,
      // };
    } else {
      const isValid = await argon.verify(
        existingUser.hashPassword,
        dto.password,
      );
      if (!isValid) {
        throw new ForbiddenException('password is not valid');
        // return {
        //   message: 'password is not valid',
        //   status: 401,
        // };
      }
      return {
        message: 'log out success',
        status: 200,
      };
    }
  }
}
