import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, MaxLength, MinLength } from 'class-validator';
import { Column } from 'typeorm';

export class Address {
  @ApiProperty({ example: '10 chemin du Bassin' })
  @MaxLength(50)
  @MinLength(5)
  @Column()
  line1: string;

  @ApiProperty({ example: 'Résidence Universitaire Claude Delorme' })
  @MaxLength(50)
  @MinLength(5)
  @IsOptional()
  @Column()
  line2?: string;

  @MaxLength(15)
  @MinLength(3)
  @ApiProperty({ example: '13014' })
  @Column()
  postalCode: string;

  @MaxLength(50)
  @MinLength(3)
  @ApiProperty({ example: 'Marseille' })
  @Column()
  city: string;

  @MaxLength(50)
  @MinLength(3)
  @ApiProperty({ example: 'France' })
  @Column()
  country: string;
}
