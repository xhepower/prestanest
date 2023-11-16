import {
  IsString,
  IsEmail,
  IsDate,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsString()
  @IsNotEmpty()
  role: string;
  @IsString()
  @IsOptional()
  recoveryToken: string;
  @IsDate()
  @IsOptional()
  createdAt: Date;
}
