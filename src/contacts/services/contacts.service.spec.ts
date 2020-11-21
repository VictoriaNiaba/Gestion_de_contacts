import { Test, TestingModule } from '@nestjs/testing';
import { ContactsService } from './contacts.service';
import { Repository } from "typeorm";
import { Contact } from "../entities";
import { getRepositoryToken } from "@nestjs/typeorm";

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

// @ts-ignore
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn(entity => entity),
}));

describe('ContactsService', () => {
  let service: ContactsService;
  let repositoryMock: MockType<Repository<Contact>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
          ContactsService,
         { provide: getRepositoryToken(Contact), useFactory: repositoryMockFactory },
      ],
    }).compile();
    service = module.get<ContactsService>(ContactsService);
    repositoryMock = module.get(getRepositoryToken(Contact));
  });

  it('should find a contact', async () => {
    const contact = {
      id: 10,
      firstName: 'Joe',
      lastName: 'DOE'
    };
    repositoryMock.findOne.mockReturnValue(contact);
    expect(service.findOne(contact.id)).toEqual(contact);
    expect(repositoryMock.findOne).toHaveBeenCalledWith(contact.id);

  });
});
