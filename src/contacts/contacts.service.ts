import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactsService {

  constructor(
    @InjectRepository(Contact)
    private contactsRepository: Repository<Contact>
  ) { }

  create(createContactDto: CreateContactDto) {
    return this.contactsRepository.save(createContactDto);
  }

  findAll() {
    return this.contactsRepository.find();
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
}
