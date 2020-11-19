import { Column } from "typeorm";

export class Address {
  
  @Column()
  street1: string;
  
  @Column()
  street2: string;
  
  @Column()
  postalCode: string;
  
  @Column()
  city: string;
  
  @Column()
  country: string;
}
