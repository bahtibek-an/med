import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Doctor } from '../../doctor/entities/doctor.entity';

@Entity("Appointment")
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Doctor)
  doctor: Doctor;

  @Column()
  date: string;

  @Column()
  time: string;

  @Column({ type: 'decimal' })
  cost: number;
}
