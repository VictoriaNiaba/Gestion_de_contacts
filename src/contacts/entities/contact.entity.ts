import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Civility, ContactAddress, PhoneNumber } from "../models";

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
