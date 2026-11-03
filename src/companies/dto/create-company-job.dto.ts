// src/jobs/dto/create-job-posting.dto.ts
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ArrayMaxSize,
  MaxLength,
} from 'class-validator';
import { EmploymentType } from '../../jobs/jobs.entity.js';

export class CreateJobPostingDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  location: string;

  @IsOptional()
  @IsEnum(EmploymentType, {
    message: `employmentType must be one of: ${Object.values(EmploymentType).join(', ')}`,
  })
  employmentType?: EmploymentType;

  @IsArray()
  @ArrayMaxSize(20)
  @IsString({ each: true })
  @MaxLength(50, { each: true })
  categories?: string[];

  // ⚠️ Only include if you really want users to control this.
  // Usually this should be admin-only — remove it from the DTO.
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;
}
