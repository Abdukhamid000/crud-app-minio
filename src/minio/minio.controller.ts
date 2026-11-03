import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MinioService } from './minio.service.js';

@Controller('upload')
export class MinioController {
  constructor(private minioService: MinioService) {}
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
      fileFilter(_, file, cb) {
        cb(null, ['image/png', 'image/jpeg'].includes(file.mimetype));
      },
    }),
  )
  async uploadImg(@UploadedFile() file: any) {
    if (!file) throw new BadRequestException();

    const key = await this.minioService.uploadFile(file);
    return { key };
  }
}
