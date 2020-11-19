import { ApiProperty } from '@nestjs/swagger';
import { Address, Civility } from '../entities';

export class CreateContactDto {
  civility: Civility;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  email: string;

  address: Address;
  
  phoneNumber: string;
}
