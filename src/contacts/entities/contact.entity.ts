import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Title, Address } from '.';

@Entity()
export class Contact {
  @ApiProperty({ example: '1' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'MR',
    description: 'Defines gender and whether the contact is married or not',
  })
  @Column({ type: 'text', nullable: true })
  title?: Title;

  @ApiProperty({ example: 'Mohamed' })
  firstName: string;

  @ApiProperty({ example: 'Omar' })
  @Column({ nullable: true })
  lastName?: string;

  @ApiProperty({ example: 'mohamed.omar@gmail.com' })
  @Column({ nullable: true })
  email?: string;

  @ApiProperty({ example: '06-54-34-86-50' })
  @Column()
  phoneNumber: string;

  @Column((type) => Address)
  address?: Address;
}
