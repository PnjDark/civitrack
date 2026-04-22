import { IsEmail, IsString, MinLength, IsEnum, IsOptional } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEnum(['CITIZEN', 'OFFICER', 'ADMIN'])
  role?: 'CITIZEN';

  @IsOptional()
  @IsString()
  department?: string;
}
