import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { HttpExceptionFilter } from './filters/http-exception.filter';

@Module({
  // ! Attention, l'ordre des providers est important ici !
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  imports: [
    ConfigModule
  ]
})
export class ExceptionsModule {}
