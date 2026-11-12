import { IsOptional, IsString, Matches } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  @Matches(/^logos\/[a-f0-9-]{36}\.(png|jpe?g|webp|svg)$/, {
    message: 'logo_key must be a valid logo key',
  })
  logo_key?: string;
}
