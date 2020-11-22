import { ApiProperty } from '@nestjs/swagger';

// Subset of @nestjs/common/HttpStatus
export enum ErrorStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export class ApiErrorDto {
  @ApiProperty({
    type: Number,
    example: 404,
    description: 'Status given as a number',
  })
  status: ErrorStatus;

  @ApiProperty({
    example: 'Not Found',
    description: 'Summary of the error',
  })
  title: string;

  @ApiProperty({
    type: 'string', // TODO: find a way to define multiple types with OpenApi
    description: 'Details on the error',
    example: "Contact not found with 'id': 123",
  })
  message?: string | string[];

  @ApiProperty({
    type: Date,
    description: 'ISO 8601 timestamp in UTC timezone',
    example: '2020-11-22T01:33:37.413Z',
  })
  timestamp: Date | string;

  @ApiProperty({ example: '/contacts/123' })
  path: string;

  @ApiProperty({
    description: 'Stack trace, enabled only during the development phase',
    example:
      "Error: Contact not found with 'id': 123\n    at ContactsService.findOne...",
  })
  stack?: string;
}
