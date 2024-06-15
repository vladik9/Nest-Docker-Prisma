import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CarModule } from './car/car.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, UserModule, CarModule, PrismaModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
