import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Doctor, DoctorScheduleDays } from './doctor.entity';


@Entity('DoctorSchedule')
export class DoctorSchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: DoctorScheduleDays })
  day: string;

  @Column({ type: 'simple-json', default: [] })
  dailySchedule: { startTime: string, endTime: string }[];

  @ManyToOne(() => Doctor, (doctor) => doctor.schedules, { onDelete: 'CASCADE' })
  doctor: Doctor;
}
