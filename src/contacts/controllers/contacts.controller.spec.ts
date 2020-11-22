import { Test, TestingModule } from '@nestjs/testing';

import { ContactsController } from './contacts.controller';
import { ContactsService } from '../providers/contacts.service';
import { Contact, Title } from '../entities';
import { MockType } from '../providers/contacts.service.spec';
import { Pagination } from 'nestjs-typeorm-paginate';

export const contactsServiceMockFactory: () => MockType<ContactsService> = jest.fn(
  () => ({
    paginate: jest.fn(() => []),
    update: jest.fn((id, entity) => entity),
    remove: jest.fn((id) => true),
    create: jest.fn((entity) => true),
    findOne: jest.fn((entity) => true),
  }),
);

describe('ContactsController', () => {
  let controller: ContactsController;
  let serviceMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactsController],
      providers: [
        {
          provide: ContactsService,
          useFactory: contactsServiceMockFactory,
        },
      ],
    }).compile();

    controller = module.get<ContactsController>(ContactsController);
    serviceMock = module.get<ContactsService>(ContactsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of contacts', async () => {
      const expected = [
        {
          id: 1,
          firstName: 'test',
          lastName: 'test',
          title: Title.MR,
          phoneNumber: '094393904350',
          email: 'deofke@gmail.com',
          address: null,
        },
      ];
      // @ts-ignore
      jest.spyOn(serviceMock, 'paginate');
      serviceMock.paginate.mockReturnValue(new Pagination(expected, null));
      const actual: Pagination<Contact> = await controller.findAll();
      expect(actual.items).toBe(expected);
      expect(serviceMock.paginate).toHaveBeenCalledWith({
        page: Number(1),
        limit: Number(10),
      });
    });
  });

  describe('create', () => {
    it('should create a contact', async () => {
      const contactToCreate = {
        id: 1,
        firstName: 'test',
        lastName: 'test',
        title: Title.MR,
        phoneNumber: '094393904350',
        email: 'deofke@gmail.com',
        address: null,
      };
      // @ts-ignore
      jest.spyOn(serviceMock, 'create');
      serviceMock.create = jest.fn(() => contactToCreate);
      expect(await controller.create(contactToCreate)).toBe(contactToCreate);
    });
  });

  describe('findOne', () => {
    it('should find a contact', async () => {
      const contactToFind = {
        id: 1,
        firstName: 'test',
        lastName: 'test',
        title: Title.MR,
        phoneNumber: '094393904350',
        email: 'deofke@gmail.com',
        address: null,
      };
      jest.spyOn(serviceMock, 'findOne');
      serviceMock.findOne = jest.fn(() => contactToFind);
      expect(await controller.findOne(contactToFind.id.toString())).toBe(
        contactToFind,
      );
    });
  });

  describe('update', () => {
    it('should update a contact', async () => {
      const contactToUpdate: Contact = {
        id: 1,
        firstName: 'test',
        lastName: 'test',
        title: Title.MR,
        phoneNumber: '094393904350',
        email: 'deofke@gmail.com',
        address: null,
      };
      const update = { firstName: 'new firstname' };
      jest.spyOn(serviceMock, 'update');

      const expected = Object.assign(contactToUpdate, update);

      serviceMock.update.mockReturnValue(expected);
      await controller.update('1', update);
      expect(serviceMock.update).toHaveBeenCalledWith(1, update);
    });
  });

  describe('remove', () => {
    it('should delete a contact', async () => {
      const id = '10';
      const contactToDelete = {
        id: 1,
        firstName: 'test',
        lastName: 'test',
        title: Title.MR,
        phoneNumber: '094393904350',
        email: 'deofke@gmail.com',
        address: null,
      };
      jest.spyOn(serviceMock, 'remove');
      serviceMock.remove = jest.fn(() => contactToDelete);
      await controller.remove(id);
      expect(serviceMock.remove).toBeCalledWith(+id);
    });
  });
});
