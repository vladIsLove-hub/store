import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  BadRequestException,
  CallHandler,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { BooksController } from './books.controller';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<BooksController> {
    return next.handle().pipe(
      catchError(err => {
        if (err instanceof NotFoundException) {
          throw err;
        }

        if (err instanceof BadRequestException) {
          throw err;
        }

        throw err;
      }),
    );
  }
}
