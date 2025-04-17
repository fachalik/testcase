import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { BarangModule } from '@/api/v1/barang/barang.module';
import { AuthModule } from '@/api/v1/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    AuthModule,
    BarangModule,
  ],
})
export class AppModule {}
