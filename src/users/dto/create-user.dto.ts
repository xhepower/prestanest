import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';
import { UserRole } from '../entities/user.entity';
export class CreateUserDto {
  @ApiProperty({ description: 'Email de usuario' })
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @ApiProperty({ description: 'password de usuerio' })
  @IsString()
  @IsNotEmpty()
  password: string;
  @ApiProperty({ description: 'Rol de usuario' })
  @IsString()
  @IsNotEmpty()
  role: UserRole;
}
