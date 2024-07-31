import { IsArray, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { DoctorScheduleDays } from '../entities/doctor.entity';

export class ScheduleDto {
  @IsEnum(DoctorScheduleDays)
  day: DoctorScheduleDays;

  @IsString()
  startTime: string;

  @IsString()
  endTime: string;
}

export class CreateDoctorDto {
  @IsString()
  fullName: string;

  @IsString()
  specialization: string;

  @IsString()
  description: string;

  @IsString()
  longitude: string;

  @IsString()
  latitude: string;

  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => ScheduleDto)
  schedules: ScheduleDto[];

  @IsOptional()
  @IsString()
  avatar: string;

  @IsString()
  cost: number;
}
