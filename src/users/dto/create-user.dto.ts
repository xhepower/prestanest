import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';
import { UserRole } from '../entities/user.entity';
export class CreateUserDto {
  @ApiProperty({ description: 'Email de usuario' })
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  role: UserRole;
}
