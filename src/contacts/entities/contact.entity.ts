import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Civility, Address } from '.';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  civility: Civility;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column((type) => Address)
  address: Address;
}
