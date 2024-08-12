import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto, UpdateScheduleDoctorDto } from './dto/update-doctor.dto';
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
    const doctor = this.doctorRepository.create({ ...createDoctorDto, avatar: createDoctorDto.avatar?.[0]?.url });
    return this.doctorRepository.save(doctor);
  }

  async findAll() {
    return await this.doctorRepository.find({ relations: ['schedules'] });
  }

  async findOne(id: number) {
    const doctor = await this.doctorRepository.findOne({
      where: {
        id: id,
      },
      relations: ['schedules'],
    });
    if (!doctor) {
      throw new NotFoundException('Doctor does not exist');
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
    const avatarUrl = updateDoctorDto.avatar ? updateDoctorDto.avatar?.[0]?.url : undefined;
    const doctor = this.doctorRepository.create({
      id: id,
      ...updateDoctorDto,
      avatar: avatarUrl,
    });
    return this.doctorRepository.save(doctor);
  }

  remove(id: number) {
    return this.doctorRepository.delete(id);
  }

  updateScheduleById(id: number, updateScheduleDoctorDto: UpdateScheduleDoctorDto[]) {
    const doctor = this.doctorRepository.create({
      id: id,
      schedules: updateScheduleDoctorDto,
    });
    return this.doctorRepository.save(doctor);
  }
}
