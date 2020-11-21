import { Module } from '@nestjs/common';
import { ContactsService } from './services/contacts.service';
import { ContactsController } from './controllers/contacts.controller';
import { DatabaseModule } from 'src/database/database.module';
import { contactsProviders } from './contacts.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ContactsController],
  providers: [ContactsService, ...contactsProviders],
})
export class ContactsModule {}
