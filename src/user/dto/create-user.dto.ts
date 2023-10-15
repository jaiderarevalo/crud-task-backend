import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
  @IsNotEmpty()
  readonly name: string;
  @IsNotEmpty()
  @Length(8, 20)
  readonly password: string;
  @IsNotEmpty()
  @Length(8, 20)
  readonly confirmPassword: string;
}
