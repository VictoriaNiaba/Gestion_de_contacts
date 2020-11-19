import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as _ from 'lodash';

import { Contact } from '../entities/contact.entity';
import { ApiError, CreateContactDto, UpdateContactDto } from "../dto";

@Injectable()
export class ContactsService {
    constructor(
        @Inject('CONTACTS_REPOSITORY')
        private contactsRepository: Repository<Contact>,
    ) {
    }

    create(createContactDto: CreateContactDto) {
        if (_.isEmpty(createContactDto)) {
            const error: ApiError = {
                status: HttpStatus.BAD_REQUEST,
                title: 'Error while saving contact',
                message: 'Contact cannot be null or empty',
                date: new Date()
            };
            throw new HttpException(error, 404);
        }
        return this.contactsRepository.save(createContactDto);
    }


    findAll() {
        return this.contactsRepository.find();
    }

    async findOne(id: number) {
        const contact: Contact = await this.contactsRepository.findOne(id);
        if (contact == null) {
            const error: ApiError = {
                status: HttpStatus.BAD_REQUEST,
                title: 'Error while looking for contact',
                message: 'Contact cannot be found',
                date: new Date()
            };
            throw new HttpException(error, 404);
        }
        return contact;
    }

    update(id: number, updateContactDto: UpdateContactDto) {
        this.findOne(id);
        return this.contactsRepository.update(id, updateContactDto);
    }

    remove(id: number) {
        return this.contactsRepository.delete(id);
    }


}
