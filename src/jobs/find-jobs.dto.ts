// dto/find-jobs.dto.ts
import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  Min,
  Max,
  ArrayNotEmpty,
} from 'class-validator';

export class FindJobsDto {
  @IsOptional()
  @Type(() => Number) // "1" -> 1
  @IsInt()
  @Min(1)
  page: number = 1; // default

  @IsOptional()
  @Type(() => Number) // "20" -> 20
  @IsInt()
  @Min(1)
  @Max(100) // cap it — don't let clients ask for 100000
  limit: number = 20; // default

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  categories?: string[];
}
