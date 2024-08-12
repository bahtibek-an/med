import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface, IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { DoctorScheduleDays } from '../entities/doctor.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsTime } from '../../../custom-validators/file-validator';
import { UploadDto } from '../../upload/dto/upload.dto';

@ValidatorConstraint({ async: false })
class UniqueScheduleDaysConstraint implements ValidatorConstraintInterface {
  validate(schedules: ScheduleDto[], args: ValidationArguments) {
    const days = schedules.map(schedule => schedule.day);
    const uniqueDays = new Set(days);
    return uniqueDays.size === days.length;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Each day in the schedule must be unique';
  }
}

function UniqueScheduleDays(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: UniqueScheduleDaysConstraint,
    });
  };
}

export class DailySchedule {
  @ApiProperty()

  @IsString()
  @IsTime({ message: 'Start time must be in the format HH:MM' })
  startTime: string;

  @ApiProperty()

  @IsString()
  @IsTime({ message: 'End time must be in the format HH:MM' })
  endTime: string;
}

export class ScheduleDto {
  @ApiProperty({ enum: DoctorScheduleDays })
  @IsEnum(DoctorScheduleDays)
  day: DoctorScheduleDays;

  @ApiProperty({ type: [DailySchedule] })

  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => DailySchedule)
  dailySchedule: DailySchedule[];
}

export class CreateDoctorDto {
  @ApiProperty()
  @IsString()
  fullName: string;

  @ApiProperty()
  @IsString()
  specialization: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty({ type: [ScheduleDto], required: false })

  @IsOptional()
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => ScheduleDto)
  @UniqueScheduleDays({ message: 'Each day in the schedule must be unique' })
  schedules: ScheduleDto[];

  @ApiProperty({ type: [UploadDto] })
  avatar: UploadDto[];

  @ApiProperty()
  @IsNumber()
  cost: number;
}
