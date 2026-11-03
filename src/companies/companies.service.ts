import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './companies.entity.js';
import { Repository } from 'typeorm';
import { isUniqueViolation } from '../common/db-errors.js';
import { CreateJobPostingDto } from './dto/create-company-job.dto.js';
import { JobsService } from '../jobs/jobs.service.js';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,
    private readonly jobService: JobsService,
  ) {}

  async createCompany(dto: CreateCompanyDto) {
    try {
      return await this.companyRepo.save(dto);
    } catch (err) {
      if (isUniqueViolation(err)) {
        throw new ConflictException('Company with this name already exists');
      } else {
        throw err;
      }
    }
  }

  async findAllJobsByCompanyId(id: number, page: number, limit: number) {
    const exists = await this.companyRepo.existsBy({ id });
    if (!exists) throw new NotFoundException('Company not found');
    return this.jobService.findAllByCompanyId(id, page, limit);
  }

  createJobForCompany(id: number, dto: CreateJobPostingDto) {
    return this.jobService.createJobPosting(id, dto);
  }
}
