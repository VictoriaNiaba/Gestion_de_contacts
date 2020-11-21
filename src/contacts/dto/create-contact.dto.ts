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
  IsString,
} from 'class-validator';

export class CreateContactDto {
  @IsEnum(Civility)
  @ApiProperty({
    description: 'description de la propiété de civilité ',
    enum: Civility,
  })
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
  @IsString()
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
  @IsString()
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
  //@ApiExtraModels(Address)
  address: Address;

  @ApiProperty({
    description: 'Saisir votre numéro de téléphone',
  })
  @Length(10, 12)
  @IsNotEmpty()
  @IsDefined()
  phoneNumber: string;
}
