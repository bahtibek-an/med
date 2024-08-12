import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DoctorSchedule } from './doctor-schedule.entity';

export enum DoctorScheduleDays {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}

@Entity('Doctor')
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  fullName: string;

  @Column({ type: 'varchar', length: 255 })
  specialization: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'decimal', default: 0 })
  rating: number;

  @OneToMany(() => DoctorSchedule, (doctorSchedule) => doctorSchedule.doctor, { cascade: true, onDelete: 'CASCADE' })
  schedules: DoctorSchedule[];

  @Column({ type: 'varchar', length: 255 })
  avatar: string;

  @Column({ type: 'decimal', default: 0 })
  cost: number;
}
