import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as argon from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jtw: JwtService,
    private config: ConfigService,
  ) {}
  async logIn(dto: AuthDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!existingUser) {
      throw new ForbiddenException("user don't exist");
    } else {
      const isValid = await argon.verify(
        existingUser.hashPassword,
        dto.password,
      );
      if (!isValid) {
        throw new ForbiddenException('password is not valid');
      }
      return this.singToken(existingUser);
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
    }
    const hash = await argon.hash(dto.password);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        hashPassword: hash,
      },
    });
    return this.singToken(user);
  }

  async logOut() {
    return {
      access_token: null,
    };
  }
  async singToken(user: User): Promise<{ access_token: string }> {
    const payload = {
      sub: user.id,
      email: user.email,
    };
    return {
      access_token: await this.jtw.signAsync(payload, {
        expiresIn: '15m',
        secret: this.config.get('JWT_SECRET'),
      }),
    };
  }
}
