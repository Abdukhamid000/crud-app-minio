import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobPosting } from './jobs.entity.js';
import { DataSource, Repository } from 'typeorm';
import { CreateJobPostingDto } from '../companies/dto/create-company-job.dto.js';
import { FindJobsDto } from './find-jobs.dto.js';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(JobPosting)
    private readonly jobsRepo: Repository<JobPosting>,
    private dataSource: DataSource,
  ) {}

  createJobPosting(id: number, dto: CreateJobPostingDto) {
    return this.jobsRepo.save({
      companyId: id,
      ...dto,
    });
  }

  async findAllByCompanyId(id: number, page: number, limit: number) {
    const [items, total] = await this.jobsRepo.findAndCount({
      where: { companyId: id },
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return { items, total, page, limit };
  }

  async findAll({ page, limit, categories }: FindJobsDto) {
    const [items, total] = await this.dataSource
      .getRepository(JobPosting)
      .createQueryBuilder('jobPosting')
      .leftJoin('jobPosting.company', 'c')
      .addSelect(['c.name', 'c.logoUrl'])
      .where('')
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('jobPosting.createdAt', 'DESC')
      .getManyAndCount();

    return { items, total, page, limit };
  }

  async findByCompany(id: number) {
    return this.jobsRepo.find({
      where: {
        companyId: id,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
