import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { DoctorSchedule } from './entities/doctor-schedule.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Doctor, DoctorSchedule]),
  ],
  controllers: [DoctorController],
  providers: [DoctorService],
  exports: [DoctorService],
})
export class DoctorModule {}
