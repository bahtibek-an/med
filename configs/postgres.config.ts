import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../src/user/entities/user.entity';
import { Appointment } from '../src/appointment/entities/appointment.entity';
import { Doctor } from '../src/doctor/entities/doctor.entity';
import { DoctorSchedule } from '../src/doctor/entities/doctor-schedule.entity';

export const getPostgresConfig = (): TypeOrmModuleAsyncOptions => {
  return {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      port: configService.get('POSTGRES_PORT'),
      host: configService.get('POSTGRES_HOST'),
      username: configService.get('POSTGRES_USER'),
      password: configService.get('POSTGRES_PASSWORD'),
      database: configService.get('POSTGRES_DATABASE'),
      entities: [
        User,
        Doctor,
        DoctorSchedule,
        Appointment
      ],
      synchronize: true,
      logging: true,
    }),
  };
};
