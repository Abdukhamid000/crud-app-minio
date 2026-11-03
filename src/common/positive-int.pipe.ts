import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class PositiveIntPipe implements PipeTransform {
  transform(value: number, metadata: ArgumentMetadata) {
    if (value < 1) {
      throw new BadRequestException('send positive numbers and larger then 0');
    }
    return value;
  }
}
