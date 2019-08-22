import { BaseError } from './BaseError';

export class Unauthorized extends Error implements BaseError {
  constructor(
    message: string = 'Error, not authorized',
    public statusCode: number = 401
  ) {
    super(message);
    this.name = 'Not Found';
  }
}
