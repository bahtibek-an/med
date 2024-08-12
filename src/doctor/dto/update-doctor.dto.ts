import { PartialType } from '@nestjs/mapped-types';
import { CreateDoctorDto, ScheduleDto } from './create-doctor.dto';


export class UpdateDoctorDto extends PartialType(CreateDoctorDto) {}

export class UpdateScheduleDoctorDto extends ScheduleDto {}