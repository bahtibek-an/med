import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getPostgresConfig } from '../configs/postgres.config';
import { UserModule } from './user/user.module';
import { DoctorModule } from './doctor/doctor.module';
import { AppointmentModule } from './appointment/appointment.module';
import { PaymentsModule } from './payments/payments.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './.env',
    }),
    TypeOrmModule.forRootAsync(getPostgresConfig()),
    UserModule,
    DoctorModule,
    AppointmentModule,
    PaymentsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
