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
import {
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';

import { ContactsService } from '../providers/contacts.service';
import { ApiErrorDto } from '../../exceptions/api-error.dto';
import { CreateContactDto, UpdateContactDto } from '../dto';
import { Contact } from '../entities';

@ApiTags('Contact management')
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @ApiOperation({ summary: 'List contacts' })
  @ApiOkResponse({
    description: 'The list of contacts',
    type: Contact, isArray: true
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: ApiErrorDto,
  })
  @Get()
  findAll() {
    return this.contactsService.findAll();
  }

  @ApiOperation({ summary: 'Create a contact' })
  @ApiCreatedResponse({
    description: 'The contact newly created',
    type: Contact,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: ApiErrorDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid request', type: ApiErrorDto })
  @Post()
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactsService.create(createContactDto);
  }

  @ApiOperation({ summary: 'Get a contact' })
  @ApiOkResponse({ description: 'The requested contact', type: Contact })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: ApiErrorDto,
  })
  @ApiNotFoundResponse({
    description: 'The contact was not found',
    type: ApiErrorDto,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a contact', description: 'Allows partial updates of a contact' })
  @ApiNoContentResponse({ description: 'The contact was sucessfully updated' })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: ApiErrorDto,
  })
  @ApiNotFoundResponse({
    description: 'The contact was not found',
    type: ApiErrorDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid request', type: ApiErrorDto })
  @Put(':id')
  @HttpCode(204)
  async update(
    @Param('id') id: string,
    @Body() updateContactDto: UpdateContactDto,
  ) {
    await this.contactsService.update(+id, updateContactDto);
  }

  @ApiOperation({ summary: 'Delete a contact' })
  @ApiNoContentResponse({ description: 'The contact was successfully deleted' })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: ApiErrorDto,
  })
  @ApiNotFoundResponse({
    description: 'The contact was not found',
    type: ApiErrorDto,
  })
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    await this.contactsService.remove(+id);
  }
}
