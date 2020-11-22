import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { ContactsService} from '../services/contacts.service';
import { CreateContactDto, UpdateContactDto } from '../dto';
import {
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { validate } from 'class-validator';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Contact } from '../entities';

@ApiTags('contacts')
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @ApiOperation({ summary: 'Lister les contacts' })
  @ApiOkResponse({ description: ' Contacts trouvés ' })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Erreur interne du serveur',
  })
  @Get('')
  async index(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<Pagination<Contact>> {
    limit = limit > 100 ? 100 : limit;
    return this.contactsService.paginate({
    page: Number(page),
    limit: Number(limit),
    route: 'http://localhost:3000/contacts',
    })
  }

  @ApiOperation({ summary: 'Créer un contact' })
  @ApiCreatedResponse({ description: 'Contact créé avec succès' })
  @ApiInternalServerErrorResponse({ description: 'Erreur interne du serveur' })
  @Post()
  @UsePipes(new ValidationPipe)
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactsService.create(createContactDto);
  }

  @ApiOperation({ summary: 'Trouver un contact' })
  @ApiOkResponse({ description: 'Contact trouvé' })
  @ApiInternalServerErrorResponse({ description: 'Erreur interne du serveur' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Modifier un contact' })
  @ApiOkResponse({ description: 'Contact mis à jour' })
  @ApiInternalServerErrorResponse({ description: 'Erreur interne du serveur' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    await this.contactsService.update(+id, updateContactDto);
  }

  @ApiOperation({ summary: 'Supprimer un contact' })
  @ApiOkResponse({ description: 'Contact supprimé' })
  @ApiInternalServerErrorResponse({ description: 'Erreur interne du serveur' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.contactsService.remove(+id);
  }
}
