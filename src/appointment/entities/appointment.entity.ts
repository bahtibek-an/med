import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Doctor, DoctorScheduleDays } from '../../doctor/entities/doctor.entity';

@Entity("Appointment")
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Doctor, { onDelete: 'CASCADE' })
  doctor: Doctor;

  @Column({ enum: DoctorScheduleDays })
  date: DoctorScheduleDays;

  @Column()
  time: string;

  @Column({ type: 'decimal' })
  cost: number;
}
