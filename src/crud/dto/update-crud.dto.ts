import { Transform, TransformFnParams } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateCrudDto {
  @IsOptional()
  @IsString()
  task?: string;
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }: TransformFnParams) => value == '0')
  status: boolean;
}
