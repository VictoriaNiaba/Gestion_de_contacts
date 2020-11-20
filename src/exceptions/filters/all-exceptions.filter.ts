import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ApiError } from '../api-error';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly configService: ConfigService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    console.error(exception); // TODO: A remplacer par un service de logs

    // Toutes les exceptions non-gérées sont mappées vers une Internal Server Error (500)
    const obfuscatedException = new InternalServerErrorException();
    const obfuscatedResponse = obfuscatedException.getResponse() as any;

    const apiError: ApiError = {
      status: obfuscatedException.getStatus(),
      title: obfuscatedResponse.message || obfuscatedResponse,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    /* 
      Des informations supplémentaires sont ajoutées à l'exception
      en fonction de l'environnement actuel
    */
    // TODO: Faire de DEV une énumération
    // ? l'énumération peut être implémentée dans un Core Module comme en Angular ?
    if (this.configService.get('ENV') === 'DEV') {
      apiError.message = (exception as any).message;
      apiError.stack = (exception as any).stack;
    }

    response.status(obfuscatedException.getStatus()).json(apiError);
  }
}
