import { Module } from '@nestjs/common';
import { MinioService } from './minio.service.js';
import { MinioController } from './minio.controller.js';

@Module({
  providers: [MinioService],
  controllers: [MinioController]
})
export class MinioModule {}
