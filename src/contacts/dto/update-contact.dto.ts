import { PartialType } from '@nestjs/mapped-types';
import { CreateContactDto } from './create-contact.dto';
import {ApiProperty} from '@nestjs/swagger';

export class UpdateContactDto extends PartialType(CreateContactDto) {
    @ApiProperty()
    firstName: string;
    @ApiProperty()
    lastName: string;
}
