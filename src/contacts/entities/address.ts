import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, MaxLength } from 'class-validator';
import { Column } from 'typeorm';

export class Address {
  @MaxLength(25, {
    message: 'Le prénom est trop long',
  })
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty()
  @Column()
  street1: string;

  @MaxLength(25, {
    message: 'Le prénom est trop long',
  })
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty()
  @Column()
  street2: string;

  @IsNotEmpty()
  @IsDefined()
  @ApiProperty()
  @Column()
  postalCode: string;

  @MaxLength(25, {
    message: 'Le prénom est trop long',
  })
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty()
  @Column()
  city: string;

  @MaxLength(25, {
    message: 'Le prénom est trop long',
  })
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty()
  @Column()
  country: string;
}
