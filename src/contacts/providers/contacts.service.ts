import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Contact } from '../entities/contact.entity';
import { CreateContactDto, UpdateContactDto } from '../dto';

@Injectable()
export class ContactsService {
  constructor(
    @Inject('CONTACTS_REPOSITORY')
    private contactsRepository: Repository<Contact>,
  ) {}

  create(createContactDto: CreateContactDto) {
    return this.contactsRepository.save(createContactDto);
  }

  findAll() {
    return this.contactsRepository.find();
  }

  async findOne(id: number) {
    const contact = await this.contactsRepository.findOne(id);

    if (!contact) {
      throw new NotFoundException(`Contact not found with 'id': ${id}`);
    }
    return contact;
  }

  async update(id: number, updateContactDto: UpdateContactDto) {
    const contact = await this.contactsRepository.findOne(id);

    if (!contact) {
      throw new NotFoundException(`Contact not found with 'id': ${id}`);
    }
    return await this.contactsRepository.update(id, updateContactDto);
  }

  async remove(id: number) {
    const contact = await this.contactsRepository.findOne(id);

    if (!contact) {
      throw new NotFoundException(`Contact not found with 'id': ${id}`);
    }
    return this.contactsRepository.delete(id);
  }
}
