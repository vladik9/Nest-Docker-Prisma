import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { AuthService } from './../auth/auth.service';
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private authService: AuthService) {}

  @Get('/me')
  getMe(@GetUser() user: User) {
    return user;
  }
  @Patch('/edit')
  editUser() {
    return 'edit';
  }
  @HttpCode(HttpStatus.OK)
  @Post('logOut')
  logOut() {
    return this.authService.logOut();
  }
}
