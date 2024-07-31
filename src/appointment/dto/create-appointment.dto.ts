import { DoctorScheduleDays } from '../../doctor/entities/doctor.entity';
import { IsEnum, IsNumber, IsString } from 'class-validator';


export class CreateAppointmentDto {

  @IsNumber()
  userId: number;

  @IsNumber()
  doctorId: number;

  @IsEnum(DoctorScheduleDays)
  date: DoctorScheduleDays;

  @IsString()
  time: string;

}
