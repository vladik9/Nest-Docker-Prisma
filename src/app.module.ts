import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CarModule } from './car/car.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    // this will tell nestjs that this module is global and all modules will have access to it (so .env file can be used)
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    CarModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
