import { ContactAddress } from '../models/contact-address';
import { PhoneNumber } from '../models/phone-number';

export class CreateContactDto {
  civility: Civility;
  firstName: string;
  lastName: string;
  email: string;
  address: ContactAddress;
  phoneNumber: PhoneNumber[];
}
