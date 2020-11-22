import { Test, TestingModule } from '@nestjs/testing';
import { ContactsController } from './contacts.controller';
import { ContactsService } from '../services/contacts.service';
import { Civility } from "../entities";
import { MockType } from "../services/contacts.service.spec";

export const contactsServiceMockFactory: () => MockType<ContactsService> = jest.fn(() => ({
    findAll: jest.fn(() => []),
    update: jest.fn((id, entity) => entity),
    remove: jest.fn((id) => true),
    create: jest.fn((entity) => true),
    findOne: jest.fn((entity) => true),
}));

describe('ContactsController', () => {
    let controller: ContactsController;
    let service;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ContactsController],
            providers: [
                {
                    provide: ContactsService,
                    useFactory: contactsServiceMockFactory
                }
            ],

        }).compile();

        controller = module.get<ContactsController>(ContactsController);
        service = module.get<ContactsService>(ContactsService);
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
            jest.spyOn(service, 'findAll');
            service.findAll = jest.fn(() => result);
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
            jest.spyOn(service, 'create');
            service.create = jest.fn(() => contactToCreate);
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
            jest.spyOn(service, 'findOne');
            service.findOne = jest.fn(() => contactToFind);
            expect(await controller.findOne(contactToFind.id.toString())).toBe(contactToFind);
        });
    });

    describe('update', () => {
        it('should update a contact', async () => {
            const id = '10';
            const contactToUpdate = {
                firstName: 'test',
                lastName: 'test',
                civility: Civility.M,
                phoneNumber: '094393904350',
                email: 'deofke@gmail.com',
                address: null,
            };
            jest.spyOn(service, 'update');
            service.update = jest.fn(() => contactToUpdate);
            const updatedContact = await controller.update(id, contactToUpdate);
            expect(updatedContact).toBe(contactToUpdate);
        });
    });

    describe('remove', () => {
        it('should delete a contact', async () => {
            const id = '10';
            const contactToDelete = {
                id: 1,
                firstName: 'test',
                lastName: 'test',
                civility: Civility.M,
                phoneNumber: '094393904350',
                email: 'deofke@gmail.com',
                address: null,
            };
            jest.spyOn(service, 'remove');
            service.remove = jest.fn(() => contactToDelete);
            await controller.remove(id);
            expect(service.remove).toBeCalledWith(+id);
        });
    });

});

