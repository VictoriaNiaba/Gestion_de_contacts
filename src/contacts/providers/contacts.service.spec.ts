import { Test, TestingModule } from '@nestjs/testing';
import { ContactsService } from './contacts.service';
import { Repository } from 'typeorm';
import { Title, Contact } from '../entities';
import { NotFoundException } from '@nestjs/common';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

// @ts-ignore
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    findOne: jest.fn((entity) => entity),
    find: jest.fn((entity) => entity),
    update: jest.fn((entity) => entity),
    save: jest.fn((entity) => entity),
    delete: jest.fn((entity) => entity),
  }),
);

describe('ContactsService', () => {
  let service: ContactsService;
  let repositoryMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactsService,
        { provide: 'CONTACTS_REPOSITORY', useFactory: repositoryMockFactory },
      ],
    }).compile();

    service = module.get<ContactsService>(ContactsService);
    repositoryMock = module.get('CONTACTS_REPOSITORY');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find a list of contact', async () => {
    const expectedListOfContacts = [
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

    repositoryMock.find.mockReturnValue(expectedListOfContacts);
    const actualListOfContacts: Contact[] = await service.findAll();
    expect(actualListOfContacts).toEqual(expectedListOfContacts);
  });

  it('should find a contact', async () => {
    const expectedContact = {
      id: 1,
      firstName: 'test',
      lastName: 'test',
      title: Title.MR,
      phoneNumber: '094393904350',
      email: 'deofke@gmail.com',
      address: null,
    };
    repositoryMock.findOne.mockReturnValue(expectedContact);
    const actualContact: Contact = await service.findOne(expectedContact.id);
    expect(actualContact).toEqual(expectedContact);
    expect(repositoryMock.findOne).toHaveBeenCalledWith(expectedContact.id);
  });

  it('should fail to find a contact', async () => {
    const id = 2;
    repositoryMock.findOne.mockReturnValue(null);
    await expect(service.findOne(id)).rejects.toThrow(NotFoundException);
    expect(repositoryMock.findOne).toHaveBeenCalledWith(id);
  });

  it('should update a contact', async () => {
    const contactToUpdate = {
      id: 1,
      firstName: 'test',
      lastName: 'test',
      title: Title.MR,
      phoneNumber: '094393904350',
      email: 'deofke@gmail.com',
      address: null,
    };
    repositoryMock.update.mockReturnValue(contactToUpdate);
    const UpdateResult = await service.update(
      contactToUpdate.id,
      contactToUpdate,
    );
    expect(UpdateResult).toEqual(contactToUpdate);
    expect(repositoryMock.update).toHaveBeenCalledWith(
      contactToUpdate.id,
      contactToUpdate,
    );
  });

  it('should fail to update a contact', async () => {
    const contactToUpdate = {
      id: 1,
      firstName: 'test',
      lastName: 'test',
      title: Title.MR,
      phoneNumber: '094393904350',
      email: 'deofke@gmail.com',
      address: null,
    };
    repositoryMock.findOne.mockReturnValue(null);
    await expect(
      service.update(contactToUpdate.id, contactToUpdate),
    ).rejects.toThrow(NotFoundException);
    expect(repositoryMock.findOne).toHaveBeenCalledWith(contactToUpdate.id);
  });

  it('should save a contact', async () => {
    const contactToSave = {
      id: 10,
      firstName: 'Jhon',
      lastName: 'DOE',
      title: Title.MR,
      phoneNumber: '094393904350',
      email: 'john.doe@gmail.com',
      address: null,
    };
    repositoryMock.save.mockReturnValue(contactToSave);
    const savedContact = await service.create(contactToSave);
    expect(savedContact).toEqual(contactToSave);
    expect(repositoryMock.save).toHaveBeenCalledWith(contactToSave);
  });

  it('should delete a contact', async () => {
    const contactToDelete = {
      id: 10,
      firstName: 'Jhon',
      lastName: 'DOE',
      title: Title.MR,
      phoneNumber: '094393904350',
      email: 'john.doe@gmail.com',
      address: null,
    };
    repositoryMock.findOne.mockReturnValue(contactToDelete);
    await service.remove(contactToDelete.id);
    expect(repositoryMock.delete).toHaveBeenCalledWith(contactToDelete.id);
  });

  it('should fail to delete a contact', async () => {
    const id = 10;
    repositoryMock.findOne.mockReturnValue(null);
    await expect(service.remove(id)).rejects.toThrow(NotFoundException);
    expect(repositoryMock.findOne).toHaveBeenCalledWith(id);
  });
});
