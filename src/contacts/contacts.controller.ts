import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { from } from 'rxjs';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import {ApiTags,ApiOkResponse, ApiCreatedResponse,ApiNotFoundResponse,ApiInternalServerErrorResponse,ApiForbiddenResponse} from '@nestjs/swagger';

@ApiTags('contacts')
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  
  
  @ApiOkResponse({status: 202,description: 'Contact récupérées par ID avec succès'})
  @ApiForbiddenResponse({description:'Forbidden'})
  @ApiNotFoundResponse({description: 'Aucune tâche trouvée pour l ID'})
  @ApiInternalServerErrorResponse ( {status: 402,description: 'Erreur interne du serveur'})
  @Get()
  findAll() {
    return this.contactsService.findAll();
  }

  @ApiOkResponse({status: 202,description: 'Contact crée avec succès'})
  @ApiForbiddenResponse({description:'Forbidden'})
  @ApiNotFoundResponse({description: 'Aucune contact pour l ID'})
  @ApiInternalServerErrorResponse ( {status: 402,description: 'Erreur interne du serveur'})
  @Post()
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactsService.create(createContactDto);
  }

  @ApiCreatedResponse({status: 202,description: 'Contact est crée avec succès'})
  @ApiForbiddenResponse({description:'Forbidden'})
  @ApiNotFoundResponse({description: 'Aucune contact trouvée pour l ID'})
  @ApiInternalServerErrorResponse ( {status: 403,description: 'Erreur interne du serveur'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactsService.findOne(+id);
  }

  @ApiOkResponse({status: 202,description: 'Contact modifié par ID avec succès'})
  @ApiForbiddenResponse({description:'Forbidden'})
  @ApiNotFoundResponse({description: 'Aucune contact à modifier ' })
  @ApiInternalServerErrorResponse ( {status: 403 , description: 'Erreur interne du serveur'})
  @Put(':id')
  update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactsService.update(+id, updateContactDto);
  }

  @ApiOkResponse({status: 202,description: 'Contact supprimé par ID avec succès'})
  @ApiForbiddenResponse({description:'Forbidden'})
  @ApiNotFoundResponse({description: 'Aucune contact à supprimer ' })
  @ApiInternalServerErrorResponse ( {status: 403 , description: 'Erreur interne du serveur'})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactsService.remove(+id);
  }
}
