import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, MaxLength, MinLength } from 'class-validator';
import { Column } from 'typeorm';

export class Address {
  @ApiProperty({ example: '10 chemin du Bassin' })
  @MaxLength(50)
  @MinLength(5)
  @Column({ nullable: true })
  line1?: string;

  @ApiProperty({ example: 'Résidence Universitaire Claude Delorme' })
  @MaxLength(50)
  @MinLength(5)
  @IsOptional()
  @Column({ nullable: true })
  line2?: string;

  @MaxLength(15)
  @MinLength(3)
  @ApiProperty({ example: '13014' })
  @Column({ nullable: true })
  postalCode?: string;

  @MaxLength(50)
  @MinLength(3)
  @ApiProperty({ example: 'Marseille' })
  @Column({ nullable: true })
  city?: string;

  @MaxLength(50)
  @MinLength(3)
  @ApiProperty({ example: 'France' })
  @Column({ nullable: true })
  country?: string;
}
