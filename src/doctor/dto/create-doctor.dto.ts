import { IsBase64, IsDate, IsEmail, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ScheduleDto {
  @IsOptional()
  @IsString()
  day: string;

  @IsString()
  startDate: string;

  @IsString()
  endDate: string;
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

  @ValidateNested()
  @IsObject()
  @Type(() => ScheduleDto)
  schedule: ScheduleDto;

  @IsOptional()
  @IsString()
  avatar: string;
}
