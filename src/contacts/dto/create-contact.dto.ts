import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';

import { Address, Title } from '../entities';

export class CreateContactDto {
  @IsEnum(Title)
  @IsOptional()
  @ApiProperty({
    example: 'MR',
    description: 'Defines gender and whether the contact is married or not',
  })
  title?: Title;

  @MaxLength(50)
  @MinLength(3)
  @ApiProperty({ example: 'Mohamed' })
  firstName: string;

  @IsOptional()
  @MaxLength(50)
  @MinLength(3)
  @ApiProperty({ example: 'Omar' })
  lastName?: string;

  @IsEmail()
  @IsOptional()
  @MinLength(5)
  @MaxLength(320)
  @ApiProperty({ example: 'mohamed.omar@gmail.com' })
  email?: string;

  @MaxLength(25)
  @MinLength(10)
  @ApiProperty({ example: '06-54-34-86-50' })
  phoneNumber: string;

  @IsOptional()
  address?: Address;
}
