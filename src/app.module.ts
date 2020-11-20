import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactsModule } from './contacts/contacts.module';
import { DatabaseModule } from './database/database.module';
import { ExceptionsModule } from './exceptions/exceptions.module';

@Module({
  imports: [
    ContactsModule,
    ConfigModule.forRoot(),
    DatabaseModule,
    ExceptionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
