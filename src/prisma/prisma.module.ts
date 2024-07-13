import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
// this will tell nestjs that this module is global and all modules will have access to it
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
