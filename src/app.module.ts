import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './api/auth/auth.module';
import { DataSource } from 'typeorm';
import { CouponsModule } from './api/coupons/coupons.module';
import { Coupon } from '@api/coupons/entities/coupon.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      timezone: 'America/Bogota',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Coupon],
      synchronize: true,
    }),
    AuthModule,
    CouponsModule,
  ],
})
export class AppModule {
  constructor(private readonly dataSource: DataSource) {}
}
