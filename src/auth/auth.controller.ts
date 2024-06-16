import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('logIn')
  singUp(@Body() dto: AuthDto) {
    return this.authService.logIn(dto);
  }

  @Post('singIn')
  logIn(@Body() dto: AuthDto) {
    return this.authService.singIn(dto);
  }
  @Post('logOut')
  logOut(@Body() dto: AuthDto) {
    return this.authService.logOut(dto);
  }
}
