import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';

import { ContactsService } from '../services/contacts.service';
import { CreateContactDto, UpdateContactDto } from '../dto';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactsService.create(createContactDto);
  }

  @Get()
  findAll() {
    return this.contactsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactsService.findOne(+id);
  }

  @HttpCode(204)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    await this.contactsService.update(+id, updateContactDto);
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.contactsService.remove(+id);
  }
}
