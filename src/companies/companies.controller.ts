import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaginationDto } from '../common/pagination.dto.js';
import { CompaniesService } from './companies.service.js';
import { CreateJobPostingDto } from './dto/create-company-job.dto.js';
import { CreateCompanyDto } from './dto/create-company.dto.js';

@ApiTags('companies')
@Controller('companies')
export class CompaniesController {
  constructor(private companiesService: CompaniesService) {}
  @Post()
  createCompany(@Body() dto: CreateCompanyDto) {
    return this.companiesService.createCompany(dto);
  }

  @Post(':id/jobs')
  createJobCompany(@Param('id') id: number, @Body() dto: CreateJobPostingDto) {
    return this.companiesService.createJobForCompany(id, dto);
  }

  @Get()
  findAll() {
    return this.companiesService.findAll();
  }

  @Get(':id/jobs')
  findJobs(@Param('id') id: number, @Query() query: PaginationDto) {
    return this.companiesService.findAllJobsByCompanyId(id, query);
  }
}
