import { Module } from '@nestjs/common';
import { BarangController } from './barang.controller';
import { BarangService } from './barang.service';
import { PrismaService } from '@/prisma/prisma.service';

@Module({
  controllers: [BarangController],
  providers: [BarangService, PrismaService],
})
export class BarangModule {}
