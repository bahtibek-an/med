import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ type: 'varchar', length: 255 })
  longitude: string;

  @Column({ type: 'varchar', length: 255 })
  latitude: string;

  @Column('simple-json', { nullable: true })
  schedule: { day: string, startTime: string, endTime: string };

  @Column({ type: 'varchar', length: 255 })
  avatar: string;
}
