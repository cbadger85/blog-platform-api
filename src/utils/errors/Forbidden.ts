import { BaseError } from './BaseError';

export class Forbidden extends Error implements BaseError {
  constructor(message = 'Error, forbidden', public statusCode: number = 403) {
    super(message);
    this.name = 'Forbidden';
  }
}
