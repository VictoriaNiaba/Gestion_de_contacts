import { ConfigService } from '@nestjs/config';
import { TestingModule, Test } from '@nestjs/testing';
import { AllExceptionsFilter } from './all-exceptions.filter';
import { HttpExceptionFilter } from './http-exception.filter';
import { MockType } from '../../contacts/providers/contacts.service.spec';

// @ts-ignore
export const configServiceMockFactory: () => MockType<ConfigService> = jest.fn(
  () => ({
    get: jest.fn((key) => key),
  }),
);

describe('AllExceptionsFilter', () => {
  let configService: ConfigService;
  let httpExceptionFilter: HttpExceptionFilter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HttpExceptionFilter,
        { provide: ConfigService, useFactory: configServiceMockFactory },
      ],
    }).compile();

    httpExceptionFilter = module.get<HttpExceptionFilter>(HttpExceptionFilter);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(AllExceptionsFilter).toBeDefined();
  });
});
