import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service.js';
import { CompaniesController } from './companies.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './companies.entity.js';
import { JobsModule } from '../jobs/jobs.module.js';

@Module({
  imports: [TypeOrmModule.forFeature([Company]), JobsModule],
  providers: [CompaniesService],
  controllers: [CompaniesController],
})
export class CompaniesModule {}
