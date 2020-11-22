import { Test, TestingModule } from '@nestjs/testing';
import { ContactsController } from './contacts.controller';
import { ContactsService } from '../services/contacts.service';
import { Repository } from "typeorm";
import { Civility, Contact } from "../entities";

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

// @ts-ignore
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn(entity => entity),
  find: jest.fn(entity => entity),
  update: jest.fn(entity => entity),
  save: jest.fn(entity => entity),
  delete: jest.fn(entity => entity),

}));

describe('ContactsController', () => {
  let controller: ContactsController;
  let service: ContactsService;
  let repositoryMock: MockType<Repository<Contact>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactsController],
      providers: [ContactsService,
        { provide: 'CONTACTS_REPOSITORY', useFactory: repositoryMockFactory },
      ],

    }).compile();

    controller = module.get<ContactsController>(ContactsController);
    service = module.get<ContactsService>(ContactsService);
    repositoryMock = module.get('CONTACTS_REPOSITORY');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of contacts', async () => {
      const result = [{
          id: 1,
          firstName: 'test',
          lastName: 'test',
          civility: Civility.M,
          phoneNumber: '094393904350',
          email: 'deofke@gmail.com',
          address: null,
        }];
      // @ts-ignore
      jest.spyOn(service, 'findAll').mockImplementation(() => result);
      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a contact', async () => {
      const contactToCreate = {
        id: 1,
        firstName: 'test',
        lastName: 'test',
        civility: Civility.M,
        phoneNumber: '094393904350',
        email: 'deofke@gmail.com',
        address: null,
      };
      // @ts-ignore
      jest.spyOn(service, 'create').mockImplementation(() => contactToCreate);
      expect(await controller.create(contactToCreate)).toBe(contactToCreate);
    });
  });

  describe('findOne', () => {
    it('should find a contact', async () => {
      const contactToFind = {
        id: 1,
        firstName: 'test',
        lastName: 'test',
        civility: Civility.M,
        phoneNumber: '094393904350',
        email: 'deofke@gmail.com',
        address: null,
      };
      // @ts-ignore
      jest.spyOn(service, 'findOne').mockImplementation(() => contactToFind);
      expect(await controller.findOne(contactToFind.id.toString())).toBe(contactToFind);
    });
  });

  describe('update', () => {
    it('should update a contact', async () => {
      const id = 10;
      const contactToUpdate = {
        firstName: 'test',
        lastName: 'test',
        civility: Civility.M,
        phoneNumber: '094393904350',
        email: 'deofke@gmail.com',
        address: null,
      };
      // @ts-ignore
      jest.spyOn(service, 'update').mockImplementation(() => contactToUpdate);
      expect(await controller.update(id.toString(),contactToUpdate)).toBe(contactToUpdate);
    });
  });

  describe('remove', () => {
    it('should delete a contact', async () => {
      const contactToDelete = {
        id: 1,
        firstName: 'test',
        lastName: 'test',
        civility: Civility.M,
        phoneNumber: '094393904350',
        email: 'deofke@gmail.com',
        address: null,
      };
      // @ts-ignore
      jest.spyOn(service, 'remove').mockImplementation(() => contactToDelete);
      expect(await controller.remove(contactToDelete.id.toString())).toBe(contactToDelete);
    });
  });

});

