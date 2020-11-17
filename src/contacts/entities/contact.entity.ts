import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
