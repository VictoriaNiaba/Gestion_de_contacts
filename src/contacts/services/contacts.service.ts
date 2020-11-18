import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateContactDto } from '../dto/create-contact.dto';
import { UpdateContactDto } from '../dto/update-contact.dto';
import { Contact } from '../entities/contact.entity';

@Injectable()
export class ContactsService {
  constructor(
    @Inject('CONTACTS_REPOSITORY')
    private contactsRepository: Repository<Contact>,
  ) {}

  create(createContactDto: CreateContactDto) {
    return this.contactsRepository.save(createContactDto);
  }

  addContact(createContactDto: CreateContactDto) {
    return this.contactsRepository.save(createContactDto);
  }

  findAll() {
    return this.contactsRepository.find();
  }

  findContact() {
    return this.contactsRepository.findOne();
  }

  findOne(id: number) {
    return this.contactsRepository.findOne(id);
  }

  update(id: number, updateContactDto: UpdateContactDto) {
    return this.contactsRepository.update(id, updateContactDto);
  }

  remove(id: number) {
    return this.contactsRepository.delete(id);
  }

  updateContact(id: number, updateContactDto: UpdateContactDto) {
    return this.contactsRepository.update(id, updateContactDto);
  }

  removeContact(id: number) {
    return this.contactsRepository.delete(id);
  }
}
