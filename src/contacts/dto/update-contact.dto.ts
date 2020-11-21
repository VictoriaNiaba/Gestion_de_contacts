import { PartialType } from '@nestjs/mapped-types';
import { CreateContactDto } from './create-contact.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Address, Civility } from '../entities';
import {
  IsDefined,
  IsEmail,
  Length,
  IsNotEmpty,
  IsEnum,
  MinLength,
  MaxLength,
} from 'class-validator';
export class UpdateContactDto extends PartialType(CreateContactDto) {
  @IsEnum(Civility)
  @ApiProperty({
    description: 'description de la propiété de civilité ',
    enum: Civility,
  })
  @IsNotEmpty()
  civility: Civility;

  @MinLength(2, {
    message: 'Le prénom est trop court',
  })
  @MaxLength(25, {
    message: 'Le prénom est trop long',
  })
  @ApiProperty()
  @IsNotEmpty()
  @IsDefined()
  firstName: string;

  @MinLength(2, {
    message: 'Le nom est trop court',
  })
  @MaxLength(25, {
    message: 'Le nom est trop long',
  })
  @ApiProperty()
  @IsNotEmpty()
  @IsDefined()
  lastName: string;

  @ApiProperty({
    example: 'username@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsDefined()
  @ApiProperty()
  address: Address;

  @ApiProperty()
  @Length(10, 12)
  @IsNotEmpty()
  @IsDefined()
  phoneNumber: string;
}
