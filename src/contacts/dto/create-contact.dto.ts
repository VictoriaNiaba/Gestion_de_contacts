import { Address, Civility } from "../entities";

export class CreateContactDto {
  civility: Civility;
  firstName: string;
  lastName: string;
  email: string;
  address: Address;
  phoneNumber: string;
}
