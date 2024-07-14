import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CarDto } from '../auth/dto/car.dto';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { CarService } from './car.service';
@UseGuards(JwtGuard)
@Controller('car')
export class CarController {
  constructor(private carService: CarService) {}
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getOneCar(@Param('id') id: number) {
    return this.carService.findCarById(id);
  }
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  createCar(@Body() dto: CarDto) {
    return this.carService.addCar(dto);
  }
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  deleteCar(@Param('id') id: number) {
    return this.carService.deleteCar(id);
  }
  @HttpCode(HttpStatus.OK)
  @Patch('/:id')
  updateCar(@Param('id') id: number, @Body() dto: CarDto) {
    return this.carService.updateCar(id, dto);
  }
}
