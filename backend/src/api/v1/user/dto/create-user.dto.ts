import { IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'email', example: 'john@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'name',
    example: 'John Doe',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'password',
    example: '123',
  })
  @IsString()
  password: string;
}
