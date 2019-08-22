import { BaseError } from './BaseError';

export class NotFound extends Error implements BaseError {
  constructor(message: string, public statusCode: number = 404) {
    super(message);

    this.name = 'Not Found';
  }
}
