import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './entities/doctor.entity';
import { DoctorSchedule } from './entities/doctor-schedule.entity';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    @InjectRepository(DoctorSchedule)
    private readonly doctorScheduleRepository: Repository<DoctorSchedule>,
  ) {
  }

  create(createDoctorDto: CreateDoctorDto) {
    const doctor = this.doctorRepository.create(createDoctorDto);
    return this.doctorRepository.save(doctor);
  }

  async findAll(fullUrl: string) {
    const doctors = await this.doctorRepository.find({ relations: ['schedules'] });
    return doctors.map((doctor) => ({ ...doctor, avatar: fullUrl + doctor.avatar }));
  }

  async findOne(id: number) {
    const doctor = await this.doctorRepository.findOne({
      where: {
        id: id
      },
      relations: ['schedules']
    });
    if(!doctor) {
      throw new NotFoundException("Doctor does not exist");
    }
    return doctor;
  }

  async findScheduleByDoctorId(doctorId: number) {
    return this.doctorScheduleRepository.find({
      where: {
        doctor: {
          id: doctorId,
        },
      },
    });
  }

  update(id: number, updateDoctorDto: UpdateDoctorDto) {
    return `This action updates a #${id} doctor`;
  }

  remove(id: number) {
    return this.doctorRepository.delete(id);
  }
}
