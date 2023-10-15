import { IsNotEmpty, IsString } from 'class-validator';
export class CreateCrudDto {
  @IsNotEmpty()
  @IsString()
  task: string;
  @IsNotEmpty()
  @IsString()
  description: string;

  status: boolean;

  user_Id: string;
}
