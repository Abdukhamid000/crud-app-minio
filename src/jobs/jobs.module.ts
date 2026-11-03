import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service.js';
import { JobsController } from './jobs.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobPosting } from './jobs.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([JobPosting])],
  providers: [JobsService],
  controllers: [JobsController],
  exports: [JobsService],
})
export class JobsModule {}
