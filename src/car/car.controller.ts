import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard/jwt.guard';
@UseGuards(JwtGuard)
@Controller('car')
export class CarController {
  @Get('')
  getOneCar() {
    return 'a car';
  }
}
