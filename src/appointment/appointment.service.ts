import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { UserService } from '../user/user.service';
import { DoctorService } from '../doctor/doctor.service';
import moment from 'moment';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    private readonly userService: UserService,
    private readonly doctorService: DoctorService,
  ) {
  }


  async create(createAppointmentDto: CreateAppointmentDto) {
    // const user = await this.userService.findOne(createAppointmentDto.userId);
    // const doctor = await this.doctorService.findOne(createAppointmentDto.doctorId);
    // const doctorSchedules = doctor.schedules;
    //
    // const doctorSchedule = doctorSchedules.find(day => day.day === createAppointmentDto.date);
    //
    // if (!doctorSchedule) {
    //   throw new BadRequestException(`Doctor is not available on this day`);
    // }
    //
    // const appointmentTime = moment(createAppointmentDto.time, 'HH:mm');
    // // const startTime = moment(doctorSchedule.startTime, 'HH:mm');
    // // const endTime = moment(doctorSchedule.endTime, 'HH:mm');
    //
    // if (appointmentTime.isBefore(startTime) || appointmentTime.isAfter(endTime)) {
    //   throw new BadRequestException('Doctor is not available at this time');
    // }
    //
    // const overlappingAppointments = await this.appointmentRepository.find({
    //   where: {
    //     doctor: doctor,
    //   },
    // });
    // const isExistOverlappingTime = overlappingAppointments.find((item) => item.date === createAppointmentDto.date && item.time === createAppointmentDto.time);
    // if (isExistOverlappingTime) {
    //   throw new BadRequestException('This time slot is already booked');
    // }
    // const appointment = this.appointmentRepository.create({
    //   ...createAppointmentDto,
    //   user,
    //   doctor,
    //   cost: doctor.cost,
    // });

    return this.appointmentRepository.save({  });
  }

  findAll() {
    return this.appointmentRepository.find({ relations: ['user', 'doctor'] });
  }

  findOne(id: number) {
    return `This action returns a #${id} appointment`;
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return `This action updates a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }
}
