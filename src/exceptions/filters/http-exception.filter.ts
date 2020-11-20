import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiError } from '../api-error';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const apiError: ApiError = {
      status: status,
      title: (exception.getResponse() as any).error,
      message: (exception.getResponse() as any).message,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    response.status(status).json(apiError);
  }
}
