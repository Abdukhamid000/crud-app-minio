import { Controller, DefaultValuePipe, Get, Post, Query } from '@nestjs/common';
import { JobsService } from './jobs.service.js';
import { PositiveIntPipe } from '../common/positive-int.pipe.js';
import { FindJobsDto } from './find-jobs.dto.js';

@Controller('jobs')
export class JobsController {
  constructor(private jobsService: JobsService) {}
  @Get()
  findAll(@Query() query: FindJobsDto) {
    return this.jobsService.findAll(query);
  }
}
