import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @HttpCode(HttpStatus.OK)
  @Post('logIn')
  singUp(@Body() dto: AuthDto) {
    return this.authService.logIn(dto);
  }
  @Post('singIn')
  logIn(@Body() dto: AuthDto) {
    return this.authService.singIn(dto);
  }
}
