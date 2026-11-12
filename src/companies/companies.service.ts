import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isUniqueViolation } from '../common/db-errors.js';
import { PaginationDto } from '../common/pagination.dto.js';
import { JobsService } from '../jobs/jobs.service.js';
import { Company } from './companies.entity.js';
import { CreateJobPostingDto } from './dto/create-company-job.dto.js';
import { CreateCompanyDto } from './dto/create-company.dto.js';

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

  findAll() {
    return this.companyRepo.find();
  }

  async findAllJobsByCompanyId(
    id: number,
    { page = 1, limit = 10 }: PaginationDto,
  ) {
    const exists = await this.companyRepo.existsBy({ id });
    if (!exists) throw new NotFoundException('Company not found');
    return this.jobService.findAllByCompanyId(id, { page, limit });
  }

  createJobForCompany(id: number, dto: CreateJobPostingDto) {
    return this.jobService.createJobPosting(id, dto);
  }
}
