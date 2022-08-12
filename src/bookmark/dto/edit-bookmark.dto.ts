import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class editBookmarkDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  link?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
