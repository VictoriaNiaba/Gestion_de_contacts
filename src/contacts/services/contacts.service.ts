import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Contact } from '../entities/contact.entity';
import * as _ from 'lodash';
import { CreateContactDto, UpdateContactDto } from "../dto";

@Injectable()
export class ContactsService {
    constructor(
        @Inject('CONTACTS_REPOSITORY')
        private contactsRepository: Repository<Contact>,
    ) {
    }

    create(createContactDto: CreateContactDto) {
        if (_.isEmpty(createContactDto)) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Contact can not be null',
            }, 404);
        }
        return this.contactsRepository.save(createContactDto);
    }


    findAll() {
        return this.contactsRepository.find();
    }

    findOne(id: number) {
        if (this.getContactById(id) == null) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'the contact you are looking for does not exist',
            }, 404);
        }
        return this.contactsRepository.findOne(id);
    }

    update(id: number, updateContactDto: UpdateContactDto) {
        if (this.getContactById(id) == null) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'the contact you want to update does not exist',
            }, 404);
        }
        return this.contactsRepository.update(id, updateContactDto);
    }

    remove(id: number) {
        if (this.getContactById(id) == null) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'the contact you want to delete does not exist',
            }, 404);
        }
        return this.contactsRepository.delete(id);
    }

    getContactById(id: number) {
        return this.contactsRepository.findOne(id);
    }


}
