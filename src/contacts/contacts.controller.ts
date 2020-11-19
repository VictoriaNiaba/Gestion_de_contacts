import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { from } from 'rxjs';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import {ApiTags,ApiOkResponse, ApiCreatedResponse,ApiInternalServerErrorResponse,ApiOperation}from '@nestjs/swagger';

@ApiTags('contacts')
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  
  @ApiOperation({summary: 'Lister les contacts'})
  @ApiOkResponse({description: ' Contacts trouvées '})
  @ApiInternalServerErrorResponse ( {status: 500,description: 'Erreur interne du serveur'})
  @Get()
  findAll() {
    return this.contactsService.findAll();
  }

  @ApiOperation({summary: 'Créer un contact'})
  @ApiOkResponse({description: 'Contact crée avec succès'})
  @ApiInternalServerErrorResponse ( {description: 'Erreur interne du serveur'})
  @Post()
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactsService.create(createContactDto);
  }

  @ApiOperation({summary: 'Trouver un contact '})
  @ApiCreatedResponse({description: 'Contact trouvée '})
  @ApiInternalServerErrorResponse ( {description: 'Erreur interne du serveur'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactsService.findOne(+id);
  }

  @ApiOperation({summary: 'Modifier un contact '})
  @ApiOkResponse({description: 'Mise à jour du contact '})
  @ApiInternalServerErrorResponse ( {description: 'Erreur interne du serveur'})
  @Put(':id')
  update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactsService.update(+id, updateContactDto);
  }

  @ApiOperation({summary: 'Suprimer un contact '})
  @ApiOkResponse({description: 'Contact supprimé'})
  @ApiInternalServerErrorResponse ( { description: 'Erreur interne du serveur'})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactsService.remove(+id);
  }
}
