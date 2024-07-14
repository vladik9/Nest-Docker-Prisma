import { Delete, Get, Injectable, Patch, Post } from '@nestjs/common';
import { CarDto } from '../auth/dto/car.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CarService {
  constructor(private prisma: PrismaService) {}
  @Get('/:id')
  findCarById(id: number) {
    id = +id;
    return this.prisma.car.findUnique({ where: { id: id } });
  }
  @Post('')
  addCar(car: CarDto) {
    return this.prisma.car.create({ data: car });
  }
  @Delete('/:id')
  deleteCar(id: number) {
    id = +id;
    return this.prisma.car.delete({ where: { id: id } });
  }

  @Patch('/:id')
  updateCar(id: number, car: CarDto) {
    id = +id;
    try {
      return this.prisma.car.update({ where: { id: id }, data: car });
    } catch (error) {
      return error;
    }
  }
}
