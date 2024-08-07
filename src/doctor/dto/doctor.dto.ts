import { DoctorScheduleDays } from '../entities/doctor.entity';
import { ApiProperty } from '@nestjs/swagger';

export class DailySchedule {
  @ApiProperty()
  startTime: string;

  @ApiProperty()
  endTime: string;
}

export class ScheduleDto {
  @ApiProperty({ enum: DoctorScheduleDays })
  day: DoctorScheduleDays;

  @ApiProperty({ type: [DailySchedule] })
  dailySchedule: DailySchedule[];
}

export class DoctorDto {
  @ApiProperty()
  fullName: string;

  @ApiProperty()
  specialization: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  longitude: string;

  @ApiProperty()
  latitude: string;


  @ApiProperty({ type: [ScheduleDto], required: false })
  schedules: ScheduleDto[];

  @ApiProperty({ type: 'string', format: 'binary' })
  avatar: string;

  @ApiProperty()
  cost: number;
}
