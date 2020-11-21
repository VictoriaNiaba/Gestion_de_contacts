import { Connection } from 'typeorm';
import { Contact } from './entities/contact.entity';

// TODO: move magic strings to a separated constants.ts file
export const contactsProviders = [
  {
    provide: 'CONTACTS_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Contact),
    inject: ['DATABASE_CONNECTION'],
  },
];
