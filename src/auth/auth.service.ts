import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable({})
export class AuthService {
  constructor(private prismaService: PrismaService) {}
  logIn() {
    return { mess: 'your logged in' };
  }
  singIn() {
    return { mess: 'your sing in' };
  }

  logOut() {
    return { mess: 'your logged out' };
  }
}
