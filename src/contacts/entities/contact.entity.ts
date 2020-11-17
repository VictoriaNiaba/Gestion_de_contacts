import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ContactAddress } from '../models/contact-address';
import { PhoneNumber } from '../models/phone-number';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  civility: Civility;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  address: ContactAddress;

  phoneNumber: PhoneNumber[];
}
