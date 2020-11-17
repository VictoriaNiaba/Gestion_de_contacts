import { ContactAddress } from './contact-address';
import { PhoneNumber } from './phone-number';

export class Contact {
  id: number;
  civility: Civility;
  firstName: string;
  lastName: string;
  email: string;
  address: ContactAddress;
  phoneNumber: PhoneNumber[];
}
