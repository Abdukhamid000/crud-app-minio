import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto.js';
import { CompaniesService } from './companies.service.js';
import { CreateJobPostingDto } from './dto/create-company-job.dto.js';

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
  findAll() {}

  @Get(':id/jobs')
  findJobs(
    @Param('id') id: number,
    @Query('page', new DefaultValuePipe(1)) page: number,
    @Query('limit', new DefaultValuePipe(10)) limit: number,
  ) {
    return this.companiesService.findAllJobsByCompanyId(id, page, limit);
  }
}
