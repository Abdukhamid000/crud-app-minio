import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'minio';

@Injectable()
export class MinioService implements OnModuleInit {
  private readonly logger = new Logger(MinioService.name);
  private client: Client;
  private bucket: string;

  constructor(private config: ConfigService) {
    this.client = new Client({
      endPoint: this.config.getOrThrow<string>('MINIO_ENDPOINT', 'localhost'),
      port: parseInt(this.config.getOrThrow<string>('MINIO_PORT', '9000'), 10),
      useSSL: this.config.getOrThrow<string>('MINIO_USE_SSL') === 'true',
      accessKey: this.config.getOrThrow<string>('MINIO_ACCESS_KEY'),
      secretKey: this.config.getOrThrow<string>('MINIO_SECRET_KEY'),
    });
    this.bucket = 'uploads';
  }

  async uploadFile(file: any, objectName?: string) {
    console.log(file, 'file');
    const key = objectName ?? `${Date.now()}-${file.originalname}`;

    await this.client.putObject(this.bucket, key, file.buffer, file.size, {
      'Content-type': file.mimetype,
    });

    return key;
  }

  async deleteFile(key: string) {
    this.client.removeObject(this.bucket, key);
  }

  async onModuleInit() {
    try {
      const exists = await this.client.bucketExists('uploads');
      if (!exists) {
        await this.client.makeBucket(this.bucket);
        const policy = {
          Version: '2012-10-17',
          Statement: [
            {
              Effect: 'Allow',
              Principal: { AWS: ['*'] },
              Action: ['s3:GetObject'], // ← only reads are public
              Resource: [`arn:aws:s3:::${this.bucket}/*`],
            },
          ],
        };
        await this.client.setBucketPolicy(this.bucket, JSON.stringify(policy));
        this.logger.log(`Bucket "${this.bucket}" created`);
      }
    } catch (err) {
      this.logger.error('Failed to ensure bucket', err);
    }
  }
}
