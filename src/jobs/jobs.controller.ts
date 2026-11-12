import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FindJobsDto } from './find-jobs.dto.js';
import { JobsService } from './jobs.service.js';

@ApiTags('jobs')
@Controller('jobs')
export class JobsController {
  constructor(private jobsService: JobsService) {}
  @Get()
  findAll(@Query() query: FindJobsDto) {
    return this.jobsService.findAll(query);
  }
}
