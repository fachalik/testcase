import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBarangDto {
  @ApiProperty({ description: 'The name of the item', example: 'Laptop' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The description of the item',
    example: 'A high-performance laptop',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'The price of the item',
    example: 100,
  })
  @IsNumber()
  price: number;
}
