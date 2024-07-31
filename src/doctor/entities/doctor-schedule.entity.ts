import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("DoctorSchedule")
export class DoctorSchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', nullable: true })
  day: string;

  @Column({ type: 'date'})
  startDate: string;

  @Column({ type: 'date' })
  endDate: string;
}
