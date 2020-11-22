import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

import { ApiErrorDto } from '../api-error.dto';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

  constructor(private readonly configService: ConfigService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const apiError: ApiErrorDto = {
      status: status,
      title: (exception.getResponse() as any).error,
      message: (exception.getResponse() as any).message,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    if (this.configService.get('ENV') === 'DEV') {
      apiError.stack = (exception as any).stack;
    }

    response.status(status).json(apiError);
  }
}
