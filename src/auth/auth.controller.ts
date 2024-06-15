import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('logIn')
  singUp() {
    this.authService.logIn();
  }

  @Post('singIn')
  logIn() {
    this.authService.singIn();
  }
  @Post('logOut')
  logOut() {
    this.authService.logOut();
  }
}
