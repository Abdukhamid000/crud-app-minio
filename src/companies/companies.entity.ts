// src/companies/company.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  type Relation,
} from 'typeorm';
import { JobPosting } from '../jobs/jobs.entity.js';

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  // Store the object key / path, NOT the full URL (see note below)
  @Column({ type: 'text', nullable: true })
  logoUrl: string | null;

  @OneToMany(() => JobPosting, (job) => job.company)
  jobPostings: Relation<JobPosting[]>;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
