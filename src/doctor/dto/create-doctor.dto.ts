import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Type } from 'class-transformer';
import { DoctorScheduleDays } from '../entities/doctor.entity';
import { ApiProperty } from '@nestjs/swagger';

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
  startTime: string;

  @ApiProperty()

  @IsString()
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

  @ApiProperty()
  @IsString()
  longitude: string;

  @ApiProperty()
  @IsString()
  latitude: string;


  // @ApiProperty({ type: [ScheduleDto], required: false })

  @IsOptional()
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => ScheduleDto)
  @UniqueScheduleDays({ message: 'Each day in the schedule must be unique' })
  schedules: ScheduleDto[];

  @ApiProperty({ type: 'string', format: 'binary' })
  avatar: string;

  @ApiProperty()
  @IsString()
  cost: number;
}
